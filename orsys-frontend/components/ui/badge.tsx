import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-[0.75rem] font-semibold whitespace-nowrap transition-all focus-visible:outline-none [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-[#007AFF] text-white dark:bg-[#0A84FF]",
        secondary:
          "bg-black/5 text-foreground dark:bg-white/10",
        destructive:
          "bg-[#FF3B30]/10 text-[#FF3B30] dark:bg-[#FF453A]/20 dark:text-[#FF453A]",
        outline:
          "border border-black/10 dark:border-white/15 text-muted-foreground bg-black/[0.02] dark:bg-white/[0.04]",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10",
        link: "text-[#007AFF] dark:text-[#0A84FF] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
