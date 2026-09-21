"use client";

import { columns } from "@/components/dashboard/Employee/EmployeeColumn";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import DashboardLayout from "@/layout/DashboardLayout";

import { useEffect, useState } from "react";

export default function page() {
	const [data, setData] = useState<any[]>([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:8080/api/employee");
				const jsonData = await response.json();
				console.log(jsonData.length);
				setData(jsonData);
			} catch (error: any) {
				if (error.name !== "AbortError") {
					console.error("Error fetching data:", error);
				}
			}
		}

		fetchData();
	}, []);

	return (
		<DashboardLayout>
			<SiteHeader title="Employees" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col m-5 gap-1 py-4 md:gap-4 md:py-6">
						<h1 className="text-2xl font-bold mb-0">Employees</h1>
						<DashboardTable
							columns={columns}
							data={data} // Replace with actual data fetched from the API
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
