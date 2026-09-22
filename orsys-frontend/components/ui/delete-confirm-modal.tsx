"use client";

import React from "react";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => Promise<void> | void;
	title?: string;
	itemName?: string;
	loading?: boolean;
}

export function DeleteConfirmModal({
	isOpen,
	onClose,
	onConfirm,
	title = "Delete Record",
	itemName = "this record",
	loading = false,
}: DeleteConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in-0 duration-200">
			<div
				className="relative w-full max-w-md rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start gap-4">
					<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF3B30]/10 text-[#FF3B30] dark:bg-[#FF453A]/20 dark:text-[#FF453A]">
						<AlertTriangleIcon className="h-6 w-6" />
					</div>
					<div className="space-y-1">
						<h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Are you sure you want to delete <span className="font-semibold text-foreground">{itemName}</span>? This action cannot be undone.
						</p>
					</div>
				</div>

				<div className="flex items-center justify-end space-x-3 pt-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onClose}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={onConfirm}
						disabled={loading}
					>
						<Trash2Icon className="h-4 w-4 mr-1.5" />
						{loading ? "Deleting..." : "Delete"}
					</Button>
				</div>
			</div>
		</div>
	);
}
