"use client";

import { columns } from "@/components/dashboard/Column";
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
				const response = await fetch("http://localhost:8080/api/users");
				const jsonData = await response.json();
				console.log("Fetched data:", jsonData);
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
			<SiteHeader title="Users" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col p-5">
						<h1 className="text-2xl font-bold mb-0">Users</h1>
						<DashboardTable
							columns={columns}
							data={data}
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
