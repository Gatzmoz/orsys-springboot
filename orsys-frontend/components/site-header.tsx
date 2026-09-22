import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({ title }: { title: string }) {
	return (
		<header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-xl transition-all">
			<div className="flex w-full items-center gap-2 px-4 lg:px-6">
				<SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
				<Separator
					orientation="vertical"
					className="mx-1.5 h-4 bg-black/10 dark:bg-white/10"
				/>
				<h1 className="text-sm font-semibold tracking-tight text-foreground">{title}</h1>
			</div>
		</header>
	);
}
