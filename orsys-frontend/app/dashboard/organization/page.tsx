"use client";

import { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogModal } from "@/components/ui/dialog-modal";
import { DeleteConfirmModal } from "@/components/ui/delete-confirm-modal";
import { useDepartmentsData, useDivisionsData, usePositionsData } from "@/lib/api";
import { BuildingIcon, PlusIcon, PencilIcon, Trash2Icon, BriefcaseIcon, LayersIcon } from "lucide-react";

export default function OrganizationPage() {
	const { departments, isLoading: deptLoading, mutateDepartments } = useDepartmentsData();
	const { divisions, isLoading: divLoading, mutateDivisions } = useDivisionsData();
	const { positions, isLoading: posLoading, mutatePositions } = usePositionsData();

	// Active tab state ("all", "department", "division", "position")
	const [activeTab, setActiveTab] = useState("all");

	// Department Modal States
	const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
	const [editingDept, setEditingDept] = useState<any | null>(null);
	const [deptName, setDeptName] = useState("");
	const [deptSubmitting, setDeptSubmitting] = useState(false);

	// Division Modal States
	const [isDivModalOpen, setIsDivModalOpen] = useState(false);
	const [editingDiv, setEditingDiv] = useState<any | null>(null);
	const [divForm, setDivForm] = useState({ name: "", departmentId: "" });
	const [divSubmitting, setDivSubmitting] = useState(false);

	// Position Modal States
	const [isPosModalOpen, setIsPosModalOpen] = useState(false);
	const [editingPos, setEditingPos] = useState<any | null>(null);
	const [posForm, setPosForm] = useState({ name: "", divisionId: "" });
	const [posSubmitting, setPosSubmitting] = useState(false);

	// Delete Modal States
	const [deleteTarget, setDeleteTarget] = useState<{ type: "department" | "division" | "position"; item: any } | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	// --- Department Actions ---
	const handleOpenAddDept = () => {
		setEditingDept(null);
		setDeptName("");
		setIsDeptModalOpen(true);
	};

	const handleOpenEditDept = (dept: any) => {
		setEditingDept(dept);
		setDeptName(dept.name || "");
		setIsDeptModalOpen(true);
	};

	const handleSaveDept = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!deptName.trim()) return;
		setDeptSubmitting(true);

		const url = editingDept
			? `http://localhost:8080/api/organization/department/${editingDept.id}`
			: "http://localhost:8080/api/organization/department";
		const method = editingDept ? "PUT" : "POST";

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: deptName }),
			});
			if (!res.ok) throw new Error("Failed to save department");
			await mutateDepartments();
			setIsDeptModalOpen(false);
		} catch (err: any) {
			alert(err.message);
		} finally {
			setDeptSubmitting(false);
		}
	};

	// --- Division Actions ---
	const handleOpenAddDiv = () => {
		setEditingDiv(null);
		setDivForm({ name: "", departmentId: departments?.[0]?.id ? String(departments[0].id) : "" });
		setIsDivModalOpen(true);
	};

	const handleOpenEditDiv = (div: any) => {
		setEditingDiv(div);
		setDivForm({
			name: div.name || "",
			departmentId: div.department?.id ? String(div.department.id) : "",
		});
		setIsDivModalOpen(true);
	};

	const handleSaveDiv = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!divForm.name.trim()) return;
		setDivSubmitting(true);

		const url = editingDiv
			? `http://localhost:8080/api/organization/division/${editingDiv.id}`
			: "http://localhost:8080/api/organization/division";
		const method = editingDiv ? "PUT" : "POST";

		const payload = {
			name: divForm.name,
			department: divForm.departmentId ? { id: parseInt(divForm.departmentId, 10) } : null,
		};

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error("Failed to save division");
			await mutateDivisions();
			setIsDivModalOpen(false);
		} catch (err: any) {
			alert(err.message);
		} finally {
			setDivSubmitting(false);
		}
	};

	// --- Position Actions ---
	const handleOpenAddPos = () => {
		setEditingPos(null);
		setPosForm({ name: "", divisionId: divisions?.[0]?.id ? String(divisions[0].id) : "" });
		setIsPosModalOpen(true);
	};

	const handleOpenEditPos = (pos: any) => {
		setEditingPos(pos);
		setPosForm({
			name: pos.name || "",
			divisionId: pos.division?.id ? String(pos.division.id) : "",
		});
		setIsPosModalOpen(true);
	};

	const handleSavePos = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!posForm.name.trim()) return;
		setPosSubmitting(true);

		const url = editingPos
			? `http://localhost:8080/api/organization/position/${editingPos.id}`
			: "http://localhost:8080/api/organization/position";
		const method = editingPos ? "PUT" : "POST";

		const payload = {
			name: posForm.name,
			division: posForm.divisionId ? { id: parseInt(posForm.divisionId, 10) } : null,
		};

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error("Failed to save position");
			await mutatePositions();
			setIsPosModalOpen(false);
		} catch (err: any) {
			alert(err.message);
		} finally {
			setPosSubmitting(false);
		}
	};

	// --- Generic Delete Confirmation Handler ---
	const handleConfirmDelete = async () => {
		if (!deleteTarget) return;
		setDeleteLoading(true);

		const { type, item } = deleteTarget;
		const endpointMap = {
			department: `http://localhost:8080/api/organization/department/${item.id}`,
			division: `http://localhost:8080/api/organization/division/${item.id}`,
			position: `http://localhost:8080/api/organization/position/${item.id}`,
		};

		try {
			const res = await fetch(endpointMap[type], { method: "DELETE" });
			if (!res.ok && res.status !== 204) {
				throw new Error(`Failed to delete ${type} (Status ${res.status})`);
			}

			if (type === "department") await mutateDepartments();
			if (type === "division") await mutateDivisions();
			if (type === "position") await mutatePositions();

			setDeleteTarget(null);
		} catch (err: any) {
			alert(err.message || `Failed to delete ${type}.`);
		} finally {
			setDeleteLoading(false);
		}
	};

	const selectClassName =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

	return (
		<DashboardLayout>
			<SiteHeader title="Organization Structure" />

			<div className="p-6 max-w-7xl mx-auto space-y-8">
				{/* Top Header */}
				<div>
					<h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
						<BuildingIcon className="w-6 h-6 text-primary" />
						Organization Hierarchy
					</h1>
					<p className="text-sm text-muted-foreground">
						Manage Departments, Divisions, and Positions in distinct tables.
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="bg-muted p-1">
						<TabsTrigger value="all" className="gap-2">
							<BuildingIcon className="w-4 h-4" /> All Tables
						</TabsTrigger>
						<TabsTrigger value="department" className="gap-2">
							<BuildingIcon className="w-4 h-4" /> Departments ({departments?.length || 0})
						</TabsTrigger>
						<TabsTrigger value="division" className="gap-2">
							<LayersIcon className="w-4 h-4" /> Divisions ({divisions?.length || 0})
						</TabsTrigger>
						<TabsTrigger value="position" className="gap-2">
							<BriefcaseIcon className="w-4 h-4" /> Positions ({positions?.length || 0})
						</TabsTrigger>
					</TabsList>

					{/* 1. DEPARTMENTS TABLE */}
					{(activeTab === "all" || activeTab === "department") && (
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<div>
									<CardTitle className="text-lg font-bold flex items-center gap-2">
										<BuildingIcon className="w-5 h-5 text-primary" />
										Departments Table
									</CardTitle>
									<CardDescription>Top-level organizational departments</CardDescription>
								</div>
								<Button size="sm" onClick={handleOpenAddDept} className="gap-1.5">
									<PlusIcon className="w-4 h-4" /> Add Department
								</Button>
							</CardHeader>
							<CardContent className="p-0 overflow-x-auto">
								{deptLoading ? (
									<div className="p-6 text-center text-muted-foreground animate-pulse">Loading departments...</div>
								) : !departments || departments.length === 0 ? (
									<div className="p-6 text-center text-muted-foreground">No departments configured.</div>
								) : (
									<table className="w-full text-sm text-left border-collapse">
										<thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
											<tr>
												<th className="px-4 py-3">ID</th>
												<th className="px-4 py-3">Department Name</th>
												<th className="px-4 py-3 text-right">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border">
											{departments.map((dept: any) => (
												<tr key={dept.id} className="hover:bg-muted/30 transition-colors">
													<td className="px-4 py-3 font-medium">#{dept.id}</td>
													<td className="px-4 py-3 font-semibold">{dept.name}</td>
													<td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleOpenEditDept(dept)}
															className="h-8 w-8 p-0"
														>
															<PencilIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => setDeleteTarget({ type: "department", item: dept })}
															className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
														>
															<Trash2Icon className="h-4 w-4" />
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</CardContent>
						</Card>
					)}

					{/* 2. DIVISIONS TABLE */}
					{(activeTab === "all" || activeTab === "division") && (
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<div>
									<CardTitle className="text-lg font-bold flex items-center gap-2">
										<LayersIcon className="w-5 h-5 text-primary" />
										Divisions Table
									</CardTitle>
									<CardDescription>Mid-level operational divisions linked to departments</CardDescription>
								</div>
								<Button size="sm" onClick={handleOpenAddDiv} className="gap-1.5">
									<PlusIcon className="w-4 h-4" /> Add Division
								</Button>
							</CardHeader>
							<CardContent className="p-0 overflow-x-auto">
								{divLoading ? (
									<div className="p-6 text-center text-muted-foreground animate-pulse">Loading divisions...</div>
								) : !divisions || divisions.length === 0 ? (
									<div className="p-6 text-center text-muted-foreground">No divisions configured.</div>
								) : (
									<table className="w-full text-sm text-left border-collapse">
										<thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
											<tr>
												<th className="px-4 py-3">ID</th>
												<th className="px-4 py-3">Division Name</th>
												<th className="px-4 py-3">Parent Department</th>
												<th className="px-4 py-3 text-right">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border">
											{divisions.map((div: any) => (
												<tr key={div.id} className="hover:bg-muted/30 transition-colors">
													<td className="px-4 py-3 font-medium">#{div.id}</td>
													<td className="px-4 py-3 font-semibold">{div.name}</td>
													<td className="px-4 py-3">{div.department?.name || "-"}</td>
													<td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleOpenEditDiv(div)}
															className="h-8 w-8 p-0"
														>
															<PencilIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => setDeleteTarget({ type: "division", item: div })}
															className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
														>
															<Trash2Icon className="h-4 w-4" />
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</CardContent>
						</Card>
					)}

					{/* 3. POSITIONS TABLE */}
					{(activeTab === "all" || activeTab === "position") && (
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<div>
									<CardTitle className="text-lg font-bold flex items-center gap-2">
										<BriefcaseIcon className="w-5 h-5 text-primary" />
										Positions Table
									</CardTitle>
									<CardDescription>Job roles and positions linked to divisions</CardDescription>
								</div>
								<Button size="sm" onClick={handleOpenAddPos} className="gap-1.5">
									<PlusIcon className="w-4 h-4" /> Add Position
								</Button>
							</CardHeader>
							<CardContent className="p-0 overflow-x-auto">
								{posLoading ? (
									<div className="p-6 text-center text-muted-foreground animate-pulse">Loading positions...</div>
								) : !positions || positions.length === 0 ? (
									<div className="p-6 text-center text-muted-foreground">No positions configured.</div>
								) : (
									<table className="w-full text-sm text-left border-collapse">
										<thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
											<tr>
												<th className="px-4 py-3">ID</th>
												<th className="px-4 py-3">Position Title</th>
												<th className="px-4 py-3">Parent Division</th>
												<th className="px-4 py-3">Department</th>
												<th className="px-4 py-3 text-right">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border">
											{positions.map((pos: any) => (
												<tr key={pos.id} className="hover:bg-muted/30 transition-colors">
													<td className="px-4 py-3 font-medium">#{pos.id}</td>
													<td className="px-4 py-3 font-semibold">{pos.name}</td>
													<td className="px-4 py-3">{pos.division?.name || "-"}</td>
													<td className="px-4 py-3">{pos.division?.department?.name || "-"}</td>
													<td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleOpenEditPos(pos)}
															className="h-8 w-8 p-0"
														>
															<PencilIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => setDeleteTarget({ type: "position", item: pos })}
															className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
														>
															<Trash2Icon className="h-4 w-4" />
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</CardContent>
						</Card>
					)}
				</Tabs>

				{/* Department Add/Edit Modal */}
				<DialogModal
					isOpen={isDeptModalOpen}
					onClose={() => setIsDeptModalOpen(false)}
					title={editingDept ? `Edit Department #${editingDept.id}` : "Add New Department"}
				>
					<form onSubmit={handleSaveDept} className="space-y-4">
						<div className="space-y-1 font-medium text-sm">
							<label>Department Name</label>
							<Input
								value={deptName}
								onChange={(e) => setDeptName(e.target.value)}
								placeholder="e.g. Human Resources"
								required
							/>
						</div>
						<div className="flex justify-end space-x-3 pt-2">
							<Button type="button" variant="outline" size="sm" onClick={() => setIsDeptModalOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" size="sm" disabled={deptSubmitting}>
								{deptSubmitting ? "Saving..." : editingDept ? "Update Department" : "Create Department"}
							</Button>
						</div>
					</form>
				</DialogModal>

				{/* Division Add/Edit Modal */}
				<DialogModal
					isOpen={isDivModalOpen}
					onClose={() => setIsDivModalOpen(false)}
					title={editingDiv ? `Edit Division #${editingDiv.id}` : "Add New Division"}
				>
					<form onSubmit={handleSaveDiv} className="space-y-4">
						<div className="space-y-1 font-medium text-sm">
							<label>Division Name</label>
							<Input
								value={divForm.name}
								onChange={(e) => setDivForm((prev) => ({ ...prev, name: e.target.value }))}
								placeholder="e.g. Talent Acquisition"
								required
							/>
						</div>
						<div className="space-y-1 font-medium text-sm">
							<label>Parent Department</label>
							<select
								value={divForm.departmentId}
								onChange={(e) => setDivForm((prev) => ({ ...prev, departmentId: e.target.value }))}
								className={selectClassName}
							>
								<option value="">None</option>
								{departments &&
									departments.map((dept: any) => (
										<option key={dept.id} value={dept.id}>
											{dept.name}
										</option>
									))}
							</select>
						</div>
						<div className="flex justify-end space-x-3 pt-2">
							<Button type="button" variant="outline" size="sm" onClick={() => setIsDivModalOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" size="sm" disabled={divSubmitting}>
								{divSubmitting ? "Saving..." : editingDiv ? "Update Division" : "Create Division"}
							</Button>
						</div>
					</form>
				</DialogModal>

				{/* Position Add/Edit Modal */}
				<DialogModal
					isOpen={isPosModalOpen}
					onClose={() => setIsPosModalOpen(false)}
					title={editingPos ? `Edit Position #${editingPos.id}` : "Add New Position"}
				>
					<form onSubmit={handleSavePos} className="space-y-4">
						<div className="space-y-1 font-medium text-sm">
							<label>Position Title</label>
							<Input
								value={posForm.name}
								onChange={(e) => setPosForm((prev) => ({ ...prev, name: e.target.value }))}
								placeholder="e.g. Senior Recruiter"
								required
							/>
						</div>
						<div className="space-y-1 font-medium text-sm">
							<label>Parent Division</label>
							<select
								value={posForm.divisionId}
								onChange={(e) => setPosForm((prev) => ({ ...prev, divisionId: e.target.value }))}
								className={selectClassName}
							>
								<option value="">None</option>
								{divisions &&
									divisions.map((div: any) => (
										<option key={div.id} value={div.id}>
											{div.name} ({div.department?.name || "No Dept"})
										</option>
									))}
							</select>
						</div>
						<div className="flex justify-end space-x-3 pt-2">
							<Button type="button" variant="outline" size="sm" onClick={() => setIsPosModalOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" size="sm" disabled={posSubmitting}>
								{posSubmitting ? "Saving..." : editingPos ? "Update Position" : "Create Position"}
							</Button>
						</div>
					</form>
				</DialogModal>

				{/* Delete Confirm Modal */}
				<DeleteConfirmModal
					isOpen={!!deleteTarget}
					onClose={() => setDeleteTarget(null)}
					onConfirm={handleConfirmDelete}
					title={`Delete ${deleteTarget?.type || "Item"}`}
					itemName={deleteTarget ? `${deleteTarget.type} "${deleteTarget.item.name}"` : "item"}
					loading={deleteLoading}
				/>
			</div>
		</DashboardLayout>
	);
}
