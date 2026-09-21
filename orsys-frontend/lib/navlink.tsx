import {
	CircleHelpIcon,
	DatabaseIcon,
	FileChartColumnIcon,
	FileIcon,
	LayoutDashboardIcon,
	SearchIcon,
	Settings2Icon,
	User2Icon,
} from "lucide-react";

export const navlink = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: <LayoutDashboardIcon />,
		},
		{
			title: "User Accounts",
			url: "/dashboard/user",
			icon: <User2Icon />,
		},
		{
			title: "Employee Management",
			url: "/dashboard/employee",
			icon: <User2Icon />,
		},
	],
	navClouds: [],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: <Settings2Icon />,
		},
		{
			title: "Get Help",
			url: "#",
			icon: <CircleHelpIcon />,
		},
		{
			title: "Search",
			url: "#",
			icon: <SearchIcon />,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: <DatabaseIcon />,
		},
		{
			name: "Reports",
			url: "#",
			icon: <FileChartColumnIcon />,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: <FileIcon />,
		},
	],
};
