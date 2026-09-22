"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import DashboardLayout from "@/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteConfirmModal } from "@/components/ui/delete-confirm-modal";
import { useDashboardData } from "@/lib/api";
import { PlusIcon, SearchIcon, PencilIcon, Trash2Icon, UserIcon, ArrowUpDown } from "lucide-react";

export default function EmployeeListPage() {
	const router = useRouter();
	const { employees, isLoading, isError, mutateAll } = useDashboardData();

	// Search & Filtering state
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("ALL");

	// Delete Modal state
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletingEmployee, setDeletingEmployee] = useState<any | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleOpenDelete = (emp: any) => {
		setDeletingEmployee(emp);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!deletingEmployee) return;
		setDeleteLoading(true);

		try {
			const res = await fetch(`http://localhost:8080/api/employee/${deletingEmployee.id}`, {
				method: "DELETE",
			});

			if (!res.ok && res.status !== 204) {
				throw new Error(`Failed to delete employee (Status ${res.status})`);
			}

			await mutateAll();
			setIsDeleteModalOpen(false);
			setDeletingEmployee(null);
		} catch (err: any) {
			alert(err.message || "Error deleting employee record.");
		} finally {
			setDeleteLoading(false);
		}
	};

	const getInitials = (name?: string) => {
		if (!name) return "E";
		return name
			.split(" ")
			.filter(Boolean)
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const filteredEmployees = Array.isArray(employees)
		? employees.filter((emp: any) => {
				const matchesSearch =
					(emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
					(emp.position?.name && emp.position.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
					(emp.position?.division?.name && emp.position.division.name.toLowerCase().includes(searchTerm.toLowerCase()));
				const matchesStatus =
					statusFilter === "ALL" || emp.employeeStatus === statusFilter;
				return matchesSearch && matchesStatus;
		  })
		: [];

	const selectClassName =
		"flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

	return (
		<DashboardLayout>
			<SiteHeader title="Employees" />

			<div className="p-6 max-w-7xl mx-auto space-y-6">
				{/* Top Header Card */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Employee Directory</h1>
						<p className="text-sm text-muted-foreground">
							Manage employee profiles, position assignments, and organizational status.
						</p>
					</div>

					<Button onClick={() => router.push("/dashboard/employee/new")} className="gap-2">
						<PlusIcon className="w-4 h-4" />
						Add Employee
					</Button>
				</div>

				{/* Search & Status Filter Controls */}
				<Card className="p-4">
					<div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
						<div className="relative w-full sm:w-80">
							<SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search employee, position, division..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>

						<div className="flex items-center gap-2 w-full sm:w-auto">
							<span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Filter Status:</span>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className={selectClassName}
							>
								<option value="ALL">All Statuses</option>
								<option value="ACTIVE">Active</option>
								<option value="INACTIVE">Inactive</option>
								<option value="LEAVE">On Leave</option>
								<option value="TERMINATED">Terminated</option>
							</select>
						</div>
					</div>
				</Card>

				{/* Data Table */}
				<Card>
					<CardContent className="p-0 overflow-x-auto">
						{isLoading ? (
							<div className="p-8 text-center text-muted-foreground animate-pulse">
								Loading employee directory...
							</div>
						) : isError ? (
							<div className="p-8 text-center text-destructive">
								Failed to load employee records from backend.
							</div>
						) : filteredEmployees.length === 0 ? (
							<div className="p-8 text-center text-muted-foreground">
								No matching employees found.
							</div>
						) : (
							<table className="w-full text-sm text-left border-collapse">
								<thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
									<tr>
										<th className="px-4 py-3">Employee</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Type</th>
										<th className="px-4 py-3">Position</th>
										<th className="px-4 py-3">Division</th>
										<th className="px-4 py-3">Department</th>
										<th className="px-4 py-3">Manager</th>
										<th className="px-4 py-3 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border">
									{filteredEmployees.map((emp: any) => (
										<tr key={emp.id} className="hover:bg-muted/30 transition-colors">
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<Avatar className="h-8 w-8 border border-border">
														{emp.photoURL ? (
															<AvatarImage src={emp.photoURL} alt={emp.name} className="object-cover" />
														) : null}
														<AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
															{getInitials(emp.name)}
														</AvatarFallback>
													</Avatar>
													<div>
														<Link
															href={`/dashboard/employee/${emp.id}`}
															className="font-semibold text-foreground hover:text-primary transition-colors"
														>
															{emp.name}
														</Link>
														{emp.phoneNumber && (
															<div className="text-xs text-muted-foreground">{emp.phoneNumber}</div>
														)}
													</div>
												</div>
											</td>
											<td className="px-4 py-3">
												<Badge
													variant="outline"
													className={
														emp.employeeStatus === "ACTIVE"
															? "border-emerald-200 bg-emerald-50 text-emerald-700"
															: emp.employeeStatus === "LEAVE"
															? "border-amber-200 bg-amber-50 text-amber-700"
															: emp.employeeStatus === "TERMINATED"
															? "border-red-200 bg-red-50 text-red-700"
															: ""
													}
												>
													{emp.employeeStatus || "ACTIVE"}
												</Badge>
											</td>
											<td className="px-4 py-3">
												<Badge variant="outline">{emp.employeeType || "FULLTIME"}</Badge>
											</td>
											<td className="px-4 py-3 font-medium">{emp.position?.name || "-"}</td>
											<td className="px-4 py-3">{emp.position?.division?.name || "-"}</td>
											<td className="px-4 py-3">{emp.position?.division?.department?.name || "-"}</td>
											<td className="px-4 py-3">{emp.manager?.name || "-"}</td>
											<td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => router.push(`/dashboard/employee/${emp.id}/edit`)}
													className="h-8 w-8 p-0"
												>
													<PencilIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleOpenDelete(emp)}
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

				{/* Delete Confirm Modal */}
				<DeleteConfirmModal
					isOpen={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					onConfirm={handleConfirmDelete}
					title="Delete Employee Record"
					itemName={deletingEmployee ? `employee "${deletingEmployee.name}"` : "employee"}
					loading={deleteLoading}
				/>
			</div>
		</DashboardLayout>
	);
}
