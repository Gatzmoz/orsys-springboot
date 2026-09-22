"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "@/components/dashboard/DashboardTableFeatures";

import { Employee } from "@/lib/datatypes";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Employee>();

export const columns = columnHelper.columns([
	columnHelper.accessor("name", {
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="p-0 hover:bg-transparent"
			>
				Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: (info) => {
			return (
				<Link
					href={`/dashboard/employee/${info.row.original.id}`}
					className="text-blue-500 hover:underline"
				>
					{info.getValue()}
				</Link>
			);
		},
	}),
	columnHelper.accessor("employeeStatus", {
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="p-0 hover:bg-transparent"
			>
				Status
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: (info) => {
			const status = info.getValue();
			if (!status) return "-";

			if (status === "ACTIVE") {
				return (
					<Badge
						variant="outline"
						className="border-emerald-200 bg-emerald-50 text-emerald-700"
					>
						{status}
					</Badge>
				);
			}

			if (status === "LEAVE") {
				return (
					<Badge
						variant="outline"
						className="border-amber-200 bg-amber-50 text-amber-700"
					>
						{status}
					</Badge>
				);
			}

			if (status === "TERMINATED") {
				return (
					<Badge
						variant="outline"
						className="border-red-200 bg-red-50 text-red-700"
					>
						{status}
					</Badge>
				);
			}

			return <Badge variant="outline">{status}</Badge>;
		},
	}),
	columnHelper.accessor("employeeType", {
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="p-0 hover:bg-transparent"
			>
				Type
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: (info) => {
			const status = info.getValue();
			if (!status) return "-";

			if (status === "FULLTIME") {
				return (
					<Badge
						variant="outline"
						className="border-emerald-200 bg-emerald-50 text-emerald-700"
					>
						{status}
					</Badge>
				);
			}

			if (status === "CONTRACT") {
				return (
					<Badge
						variant="outline"
						className="border-purple-200 bg-purple-50 text-purple-700"
					>
						{status}
					</Badge>
				);
			}

			if (status === "INTERN") {
				return (
					<Badge
						variant="outline"
						className="border-blue-200 bg-blue-50 text-blue-700"
					>
						{status}
					</Badge>
				);
			}

			return <Badge variant="outline">{status}</Badge>;
		},
	}),
	columnHelper.accessor(
		(row) => row.address?.city || row.address?.fullAddress || "-",
		{
			id: "city",
			header: "City",
		},
	),
	columnHelper.accessor((row) => row.manager?.name || "-", {
		id: "manager",
		header: "Manager",
	}),
	columnHelper.accessor((row) => row.position?.name || "-", {
		id: "position",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="p-0 hover:bg-transparent"
			>
				Position
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	}),
	columnHelper.accessor((row) => row.position?.division?.name || "-", {
		id: "division",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="p-0 hover:bg-transparent"
			>
				Division
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	}),
	columnHelper.accessor(
		(row) => row.position?.division?.department?.name || "-",
		{
			id: "department",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="p-0 hover:bg-transparent"
				>
					Department
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
		},
	),

	columnHelper.display({
		id: "actions",
		cell: ({ row }) => {
			const employee = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="ghost"
								className="h-8 w-8 p-0"
							/>
						}
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<Link href={`/dashboard/employee/${employee.id}/edit`}>
								<a>
									<DropdownMenuItem>Edit</DropdownMenuItem>
								</a>
							</Link>
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	}),
]);
