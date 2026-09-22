import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] px-3 py-1.5 text-sm transition-all duration-200 outline-none placeholder:text-muted-foreground/70 focus:border-[#007AFF] focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-[#007AFF]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 shadow-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
