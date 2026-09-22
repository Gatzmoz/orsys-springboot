"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/layout/DashboardLayout";
import { useDashboardData, useEmployeeData, usePositionsData } from "@/lib/api";
import { ArrowLeftIcon, CameraIcon, SaveIcon, Trash2Icon, UserIcon, UserCheckIcon } from "lucide-react";

export default function EditEmployeePage() {
	const params = useParams();
	const router = useRouter();
	const rawId = params?.id;
	const id = Array.isArray(rawId) ? rawId[0] : rawId;

	const { employee, isLoading: empDataLoading, isError: empDataError } = useEmployeeData(id);
	const { employees, isLoading: allEmpLoading } = useDashboardData();
	const { positions, isLoading: posLoading } = usePositionsData();

	const [formData, setFormData] = useState({
		name: "",
		phoneNumber: "",
		birthDate: "",
		baseSalary: "",
		photoURL: "",
		employeeType: "FULLTIME",
		employeeStatus: "ACTIVE",
		positionId: "",
		managerId: "",
		fullAddress: "",
		village: "",
		district: "",
		city: "",
		province: "",
		country: "Indonesia",
	});

	const [submitting, setSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// Pre-populate form data when employee details load
	useEffect(() => {
		if (employee) {
			setFormData({
				name: employee.name || "",
				phoneNumber: employee.phoneNumber || "",
				birthDate: employee.birthDate || "",
				baseSalary: employee.baseSalary ? String(employee.baseSalary) : "",
				photoURL: employee.photoURL || "",
				employeeType: employee.employeeType || "FULLTIME",
				employeeStatus: employee.employeeStatus || "ACTIVE",
				positionId: employee.position?.id ? String(employee.position.id) : "",
				managerId: employee.manager?.id ? String(employee.manager.id) : "",
				fullAddress: employee.address?.fullAddress || "",
				village: employee.address?.village || "",
				district: employee.address?.district || "",
				city: employee.address?.city || "",
				province: employee.address?.province || "",
				country: employee.address?.country || "Indonesia",
			});
		}
	}, [employee]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			setErrorMsg("Photo file size must be less than 5MB.");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				setFormData((prev) => ({ ...prev, photoURL: reader.result as string }));
				setErrorMsg(null);
			}
		};
		reader.readAsDataURL(file);
	};

	const handleClearPhoto = () => {
		setFormData((prev) => ({ ...prev, photoURL: "" }));
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			setErrorMsg("Employee name is required.");
			return;
		}

		setSubmitting(true);
		setErrorMsg(null);

		const payload = {
			name: formData.name,
			phoneNumber: formData.phoneNumber || null,
			birthDate: formData.birthDate || null,
			baseSalary: formData.baseSalary ? parseInt(formData.baseSalary, 10) : null,
			photoURL: formData.photoURL || null,
			employeeType: formData.employeeType,
			employeeStatus: formData.employeeStatus,
			positionId: formData.positionId ? parseInt(formData.positionId, 10) : null,
			managerId: formData.managerId ? parseInt(formData.managerId, 10) : null,
			fullAddress: formData.fullAddress || null,
			village: formData.village || null,
			district: formData.district || null,
			city: formData.city || null,
			province: formData.province || null,
			country: formData.country || null,
		};

		try {
			const res = await fetch(`http://localhost:8080/api/employee/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				throw new Error(`Failed to update employee (Status ${res.status})`);
			}

			router.push(`/dashboard/employee/${id}`);
		} catch (err: any) {
			setErrorMsg(err.message || "An error occurred while updating the employee.");
		} finally {
			setSubmitting(false);
		}
	};

	const selectClassName =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

	if (empDataLoading) {
		return (
			<DashboardLayout>
				<SiteHeader title="Edit Employee Profile" />
				<div className="p-6 max-w-5xl mx-auto flex h-64 items-center justify-center rounded-xl border border-dashed">
					<p className="text-muted-foreground animate-pulse">Loading employee data...</p>
				</div>
			</DashboardLayout>
		);
	}

	if (empDataError || !employee) {
		return (
			<DashboardLayout>
				<SiteHeader title="Edit Employee Profile" />
				<div className="p-6 max-w-5xl mx-auto space-y-4">
					<Card className="border-destructive/20 bg-destructive/10 text-destructive">
						<CardHeader>
							<CardTitle>Error Loading Employee</CardTitle>
							<CardDescription className="text-destructive/80">
								Employee ID #{id} was not found or backend server is unreachable.
							</CardDescription>
						</CardHeader>
					</Card>
					<Button variant="outline" onClick={() => router.push("/dashboard/employee")}>
						<ArrowLeftIcon className="w-4 h-4 mr-2" />
						Back to Employee List
					</Button>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<SiteHeader title={`Edit Profile: ${employee.name}`} />

			<div className="p-6 max-w-5xl mx-auto space-y-6">
				{/* Top Header Actions */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Button
							variant="outline"
							size="sm"
							onClick={() => router.push(`/dashboard/employee/${id}`)}
						>
							<ArrowLeftIcon className="w-4 h-4 mr-2" />
							Back to Profile
						</Button>
						<h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
							<UserCheckIcon className="w-5 h-5 text-primary" />
							Edit Employee #{id}
						</h1>
					</div>
				</div>

				{errorMsg && (
					<div className="p-4 rounded-md bg-destructive/15 text-destructive text-sm font-medium border border-destructive/20">
						{errorMsg}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Photo Upload & Preview Card */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Photo <span className="text-xs text-muted-foreground font-normal">(Optional)</span></CardTitle>
							<CardDescription>
								Upload a profile image file from your device or specify an image URL.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col sm:flex-row items-center gap-6">
								{/* Live Preview Avatar */}
								<div className="relative group">
									<Avatar className="h-24 w-24 border-2 border-border shadow-sm">
										{formData.photoURL ? (
											<AvatarImage src={formData.photoURL} alt={formData.name || "Preview"} className="object-cover" />
										) : null}
										<AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
											{formData.name ? getInitials(formData.name) : <UserIcon className="w-8 h-8 text-muted-foreground" />}
										</AvatarFallback>
									</Avatar>
								</div>

								{/* Controls */}
								<div className="space-y-3 flex-1 w-full">
									<div className="flex flex-wrap items-center gap-3">
										<label className="cursor-pointer">
											<span className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 shadow-sm">
												<CameraIcon className="w-4 h-4 mr-2" />
												Upload Photo File
											</span>
											<input
												type="file"
												accept="image/*"
												onChange={handleFileUpload}
												className="hidden"
											/>
										</label>

										{formData.photoURL && (
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={handleClearPhoto}
												className="text-destructive hover:text-destructive hover:bg-destructive/10"
											>
												<Trash2Icon className="w-4 h-4 mr-1.5" />
												Remove Photo
											</Button>
										)}
									</div>

									<div className="space-y-1">
										<label className="text-xs text-muted-foreground font-medium">
											Or enter Direct Photo URL:
										</label>
										<Input
											name="photoURL"
											value={formData.photoURL}
											onChange={handleChange}
											placeholder="e.g. https://images.unsplash.com/photo-1534528741775-53994a69daeb"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Personal Information */}
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								Update basic personal details for the employee.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Full Name <span className="text-red-500">*</span>
								</label>
								<Input
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="e.g. Jane Doe"
									required
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Phone Number
								</label>
								<Input
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder="e.g. +62 812-3456-7890"
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Birth Date
								</label>
								<Input
									type="date"
									name="birthDate"
									value={formData.birthDate}
									onChange={handleChange}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Base Salary (IDR)
								</label>
								<Input
									type="number"
									name="baseSalary"
									value={formData.baseSalary}
									onChange={handleChange}
									placeholder="e.g. 15000000"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Employment Details */}
					<Card>
						<CardHeader>
							<CardTitle>Employment & Organization</CardTitle>
							<CardDescription>
								Configure position, manager, and employment status.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Employee Type
								</label>
								<select
									name="employeeType"
									value={formData.employeeType}
									onChange={handleChange}
									className={selectClassName}
								>
									<option value="FULLTIME">Full Time</option>
									<option value="CONTRACT">Contract</option>
									<option value="INTERN">Intern</option>
									<option value="PROBATION">Probation</option>
								</select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Employee Status
								</label>
								<select
									name="employeeStatus"
									value={formData.employeeStatus}
									onChange={handleChange}
									className={selectClassName}
								>
									<option value="ACTIVE">Active</option>
									<option value="INACTIVE">Inactive</option>
									<option value="LEAVE">On Leave</option>
									<option value="TERMINATED">Terminated</option>
								</select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Position
								</label>
								<select
									name="positionId"
									value={formData.positionId}
									onChange={handleChange}
									className={selectClassName}
									disabled={posLoading}
								>
									<option value="">Select Position...</option>
									{positions &&
										positions.map((pos: any) => (
											<option key={pos.id} value={pos.id}>
												{pos.name}
											</option>
										))}
								</select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Direct Manager
								</label>
								<select
									name="managerId"
									value={formData.managerId}
									onChange={handleChange}
									className={selectClassName}
									disabled={allEmpLoading}
								>
									<option value="">None (Top Level / No Manager)</option>
									{employees &&
										employees
											.filter((emp: any) => String(emp.id) !== String(id))
											.map((emp: any) => (
												<option key={emp.id} value={emp.id}>
													{emp.name} ({emp.position?.name || "No position"})
												</option>
											))}
								</select>
							</div>
						</CardContent>
					</Card>

					{/* Address Information */}
					<Card>
						<CardHeader>
							<CardTitle>Address Information</CardTitle>
							<CardDescription>
								Residential address details for employee records.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium leading-none">
									Full Address Street / Building
								</label>
								<textarea
									name="fullAddress"
									value={formData.fullAddress}
									onChange={handleChange}
									placeholder="e.g. Jl. Jendral Sudirman No. 123"
									className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										Village / Kelurahan
									</label>
									<Input
										name="village"
										value={formData.village}
										onChange={handleChange}
										placeholder="e.g. Senayan"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										District / Kecamatan
									</label>
									<Input
										name="district"
										value={formData.district}
										onChange={handleChange}
										placeholder="e.g. Kebayoran Baru"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										City / Regency
									</label>
									<Input
										name="city"
										value={formData.city}
										onChange={handleChange}
										placeholder="e.g. Jakarta Selatan"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										Province
									</label>
									<Input
										name="province"
										value={formData.province}
										onChange={handleChange}
										placeholder="e.g. DKI Jakarta"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										Country
									</label>
									<Input
										name="country"
										value={formData.country}
										onChange={handleChange}
										placeholder="e.g. Indonesia"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Form Submit Footer */}
					<div className="flex items-center justify-end space-x-4 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push(`/dashboard/employee/${id}`)}
							disabled={submitting}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={submitting}>
							<SaveIcon className="w-4 h-4 mr-2" />
							{submitting ? "Updating..." : "Update Employee"}
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
