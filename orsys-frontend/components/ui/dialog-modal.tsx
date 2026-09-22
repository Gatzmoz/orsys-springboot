"use client";

import React from "react";
import { XIcon } from "lucide-react";

interface DialogModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function DialogModal({
	isOpen,
	onClose,
	title,
	description,
	children,
}: DialogModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in-0 duration-200">
			<div
				className="relative w-full max-w-lg rounded-3xl bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95"
				>
					<XIcon className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</button>

				{/* Header */}
				<div className="space-y-1 pr-6">
					<h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
					{description && (
						<p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
					)}
				</div>

				{/* Body Content */}
				<div className="pt-2">{children}</div>
			</div>
		</div>
	);
}
