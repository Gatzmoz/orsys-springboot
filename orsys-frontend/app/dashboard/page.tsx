"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import DashboardLayout from "@/layout/DashboardLayout";

export default function Page() {
	return (
		<DashboardLayout>
			<SiteHeader title="Dashboard" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards />
						<div className="px-4 lg:px-6">
							<ChartAreaInteractive />
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
