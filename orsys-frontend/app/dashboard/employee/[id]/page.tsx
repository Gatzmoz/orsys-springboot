"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Employee } from "@/lib/datatypes";
import DashboardLayout from "@/layout/DashboardLayout";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProfileField from "@/components/dashboard/profile/ProfileField";
import {
	ArrowLeft,
	Briefcase,
	Building,
	Calendar,
	DollarSign,
	MapPin,
	Pencil,
	Phone,
	User,
	UserCheck,
} from "lucide-react";
import { useEmployeeData } from "@/lib/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EmployeeProfilePage() {
	const params = useParams();
	const router = useRouter();
	const rawId = params?.id;
	const id = Array.isArray(rawId) ? rawId[0] : rawId;
	const { employee, isError, isLoading } = useEmployeeData(id);

	const getInitials = (name?: string) => {
		if (!name) return "E";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const formatSalary = (amount?: number) => {
		if (!amount && amount !== 0) return "-";
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<DashboardLayout>
			<SiteHeader
				title={
					employee?.name ? `${employee.name}'s Profile` : "Employee Profile"
				}
			/>
			<div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
				{/* Top Actions */}
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/dashboard/employee")}
						className="gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Employees
					</Button>

					{employee && (
						<Button
							size="sm"
							onClick={() => router.push(`/dashboard/employee/${id}/edit`)}
							className="gap-2"
						>
							<Pencil className="h-4 w-4" />
							Edit Profile
						</Button>
					)}
				</div>

				{isLoading ? (
					<div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
						<p className="text-muted-foreground animate-pulse">
							Loading employee profile...
						</p>
					</div>
				) : isError || !employee ? (
					<Card className="border-red-200 bg-red-50 text-red-700">
						<CardContent className="p-6">
							<p className="font-semibold">Unable to load employee profile.</p>
							<p className="text-sm">
								Employee ID #{id} was not found or the backend server is
								unreachable.
							</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{/* Left Column: Summary Card */}
						<Card className="lg:col-span-1">
							<CardHeader className="flex flex-col items-center text-center">
								<Avatar
									size="default"
									className="h-50  w-50 border-2 border-primary/20"
								>
									{employee.photoURL ? (
										<AvatarImage
											src={employee.photoURL}
											alt={employee.name}
											className="object-cover"
										/>
									) : null}
									<AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
										{getInitials(employee.name)}
									</AvatarFallback>
								</Avatar>
								<CardTitle className="mt-4 text-xl font-bold">
									{employee.name}
								</CardTitle>
								<p className="text-sm text-muted-foreground">
									{employee.position?.name || "No Position Assigned"}
								</p>
								<div className="mt-3 flex flex-wrap justify-center gap-2">
									<Badge
										variant="outline"
										className={
											employee.employeeStatus === "ACTIVE"
												? "border-emerald-200 bg-emerald-50 text-emerald-700"
												: "border-amber-200 bg-amber-50 text-amber-700"
										}
									>
										{employee.employeeStatus || "ACTIVE"}
									</Badge>
									<Badge
										variant="outline"
										className="border-blue-200 bg-blue-50 text-blue-700"
									>
										{employee.employeeType || "PERMANENT"}
									</Badge>
								</div>
							</CardHeader>
							<Separator />
							<CardContent className="space-y-4 pt-4">
								<div className="flex items-center gap-3 text-sm">
									<Building className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">Department:</span>
									<span className="ml-auto text-muted-foreground">
										{employee.position?.division?.department?.name || "-"}
									</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Briefcase className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">Division:</span>
									<span className="ml-auto text-muted-foreground">
										{employee.position?.division?.name || "-"}
									</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<UserCheck className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">Manager:</span>
									<span className="ml-auto text-muted-foreground">
										{employee.manager?.name || "-"}
									</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<DollarSign className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">Base Salary:</span>
									<span className="ml-auto font-semibold text-emerald-600">
										{formatSalary(employee.baseSalary)}
									</span>
								</div>
							</CardContent>
						</Card>

						{/* Right Column: Detailed Sections */}
						<div className="flex flex-col gap-6 lg:col-span-2">
							{/* Personal & Contact Information */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base font-semibold">
										<User className="h-4 w-4 text-primary" />
										Personal & Contact Information
									</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<ProfileField
										title="Full Name"
										data={employee.name}
									/>
									<ProfileField
										title="Phone Number"
										data={employee.phoneNumber}
									/>
									<ProfileField
										title="Birth Date"
										data={employee.birthDate}
										type="date"
									/>
									<ProfileField
										title="Employment Status"
										data={employee.employeeStatus || "ACTIVE"}
									/>
								</CardContent>
							</Card>

							{/* Address Information */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base font-semibold">
										<MapPin className="h-4 w-4 text-primary" />
										Address Details
									</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="md:col-span-2">
										<ProfileField
											title="Full Address"
											data={employee.address?.fullAddress || "-"}
										/>
									</div>
									<ProfileField
										title="Village"
										data={employee.address?.village || "-"}
									/>
									<ProfileField
										title="District"
										data={employee.address?.district || "-"}
									/>
									<ProfileField
										title="City"
										data={employee.address?.city || "-"}
									/>
									<ProfileField
										title="Province"
										data={employee.address?.province || "-"}
									/>
									<ProfileField
										title="Country"
										data={employee.address?.country || "Indonesia"}
									/>
								</CardContent>
							</Card>
						</div>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}
