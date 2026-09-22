import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-150 outline-none select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-[0_2px_8px_rgba(0,122,255,0.25)] active:shadow-none dark:bg-[#0A84FF] dark:hover:bg-[#0071E3]",
        outline:
          "border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-foreground hover:bg-black/5 dark:hover:bg-white/10 shadow-xs",
        secondary:
          "bg-black/5 dark:bg-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/15",
        ghost:
          "text-foreground hover:bg-black/5 dark:hover:bg-white/10",
        destructive:
          "bg-[#FF3B30]/10 text-[#FF3B30] hover:bg-[#FF3B30]/20 dark:bg-[#FF453A]/20 dark:text-[#FF453A] dark:hover:bg-[#FF453A]/30",
        link: "text-[#007AFF] dark:text-[#0A84FF] underline-offset-4 hover:underline font-normal",
      },
      size: {
        default: "h-9 gap-2 px-3.5 py-1.5",
        xs: "h-6 gap-1 rounded-lg px-2 text-xs",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
        lg: "h-11 gap-2.5 rounded-2xl px-5 text-base font-semibold shadow-md",
        icon: "size-9 rounded-xl",
        "icon-xs": "size-6 rounded-lg",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
