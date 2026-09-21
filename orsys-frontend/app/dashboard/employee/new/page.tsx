import { SiteHeader } from "@/components/site-header";
import DashboardLayout from "@/layout/DashboardLayout";

function page() {
	return (
		<DashboardLayout>
			<SiteHeader title="Add New Employee" />
		</DashboardLayout>
	);
}

export default page;
