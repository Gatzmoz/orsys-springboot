"use client";

import { useParams, useRouter } from "next/navigation";
import ProfileField from "@/components/dashboard/Employee/profile/ProfileField";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/layout/DashboardLayout";
import { useEmployeeData } from "@/lib/api";
import { capitalize } from "@/lib/utils";
import {
	ArrowLeft,
	Briefcase,
	Building,
	Calendar,
	DollarSign,
	Dot,
	Mail,
	MapPin,
	Mars,
	Pencil,
	Phone,
	User,
	UserCheck,
	Users,
	Venus,
} from "lucide-react";

const genderIcons: Record<string, React.ReactNode> = {
	MALE: <Mars className="h-5 w-5 text-primary shrink-0" />,
	FEMALE: <Venus className="h-5 w-5 text-primary shrink-0" />,
	OTHER: <Users className="h-5 w-5 text-primary shrink-0" />,
};

const statusConfig: Record<string, { badgeStyle: string; label: string }> = {
	ACTIVE: {
		badgeStyle: "border-emerald-200 bg-emerald-50 text-emerald-700",
		label: "Active",
	},
	INACTIVE: {
		badgeStyle: "border-slate-200 bg-slate-50 text-slate-700",
		label: "Inactive",
	},
	TERMINATED: {
		badgeStyle: "border-red-200 bg-red-50 text-red-700",
		label: "Terminated",
	},
	LEAVE: {
		badgeStyle: "border-amber-200 bg-amber-50 text-amber-700",
		label: "On Leave",
	},
};

export default function EmployeeDetailPage() {
	const params = useParams();
	const router = useRouter();
	const rawId = params?.id;
	const id = Array.isArray(rawId) ? rawId[0] : rawId;

	const { employee, isLoading, isError } = useEmployeeData(id);

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

	const formatSalary = (amount?: number) => {
		if (!amount && amount !== 0) return "-";
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateStr?: string) => {
		if (!dateStr) return "-";
		try {
			return new Date(dateStr).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		} catch {
			return dateStr;
		}
	};

	const status = employee?.employeeStatus
		? (statusConfig[employee.employeeStatus] ?? {
				badgeStyle: "border-gray-200 bg-gray-50 text-gray-700",
				label: employee.employeeStatus,
			})
		: {
				badgeStyle: "border-gray-200 bg-gray-50 text-gray-700",
				label: "Unknown",
			};

	const fullAddressString = employee?.address
		? [
				employee.address.fullAddress,
				employee.address.village,
				employee.address.district,
				employee.address.city,
				employee.address.province,
				employee.address.country,
			]
				.filter(Boolean)
				.join(", ")
		: "No address recorded";

	return (
		<DashboardLayout>
			<SiteHeader
				title={
					employee?.name ? `${employee.name}'s Profile` : "Employee Profile"
				}
			/>

			<div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">
				{/* Top Action Bar */}
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
					<div className="flex h-64 items-center justify-center rounded-xl border border-dashed p-8">
						<p className="text-muted-foreground animate-pulse text-sm">
							Loading employee profile algorithm data...
						</p>
					</div>
				) : isError || !employee ? (
					<Card className="border-red-200 bg-red-50 text-red-700">
						<CardContent className="p-6 space-y-2">
							<h3 className="font-semibold text-base">
								Unable to load employee profile
							</h3>
							<p className="text-sm">
								Employee ID #{id} was not found or backend server is
								unreachable.
							</p>
							<Button
								variant="outline"
								size="sm"
								onClick={() => router.push("/dashboard/employee")}
								className="mt-2"
							>
								Return to Employees
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="flex flex-col gap-2 w-3/12">
						{/* Sidebar / Summary Card */}
						<div className="w-full lg:w-80 shrink-0 space-y-6">
							<div className="bg-card border border-border rounded-xl shadow-xs p-6 flex flex-col items-center text-center">
								<Avatar className="h-24 w-24 mb-4 ring-4 ring-muted">
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

								<h2 className="text-lg font-bold text-foreground">
									{employee.name}
								</h2>

								<p className="text-sm text-muted-foreground mt-1 flex items-center justify-center flex-wrap">
									{employee.position?.name || "No Position"}
									{employee.position?.division?.name && (
										<>
											<Dot className="h-4 w-4 inline" />
											{employee.position.division.name}
										</>
									)}
								</p>

								<div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
									<Badge
										variant="outline"
										className={status.badgeStyle}
									>
										{status.label}
									</Badge>
									<Badge variant="outline">
										{employee.employeeType || "FULLTIME"}
									</Badge>
								</div>

								<div className="w-full mt-6 pt-4 border-t border-border space-y-3 text-sm">
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground flex items-center gap-2">
											<Briefcase className="h-4 w-4" />
											Base Salary
										</span>
										<span className="text-foreground font-semibold">
											{formatSalary(employee.baseSalary)}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground flex items-center gap-2">
											<Calendar className="h-4 w-4" />
											Created At
										</span>
										<span className="text-foreground font-medium">
											{formatDate(employee.createdAt)}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full lg:w-80 shrink-0 space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg font-bold">
										Personal Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex flex-col gap-3">
										<ProfileField
											icon={<Phone className="h-5 w-5 text-primary shrink-0" />}
											label="Phone Number"
											value={employee.phoneNumber || "Not provided"}
										/>

										<ProfileField
											icon={
												<Calendar className="h-5 w-5 text-primary shrink-0" />
											}
											label="Date of Birth"
											value={formatDate(employee.birthDate)}
										/>
										<ProfileField
											icon={
												<MapPin className="h-5 w-5 text-primary shrink-0" />
											}
											label="Address"
											value={fullAddressString}
										/>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}
