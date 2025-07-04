import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        blue: "border-transparent bg-blue-500 text-white [a&]:hover:bg-blue/90",
        destructive:
          "border border-destructive text-destructive [a&]:hover:bg-destructive/10",
        outline:
          "border border-muted-foreground text-muted-foreground [a&]:hover:bg-muted/10",
        success: "border border-primary text-primary [a&]:hover:bg-primary/10", // green outline
        warning: "border border-warning text-warning [a&]:hover:bg-warning/10", // yellow/orange outline
        processing: "border border-info text-info [a&]:hover:bg-info/10", // blue outline
        failed:
          "border border-destructive text-destructive [a&]:hover:bg-destructive/10", // red outline
        pink: "border border-pink text-pink [a&]:hover:bg-pink/10", // pink outline
        purple: "border border-purple text-purple [a&]:hover:bg-purple/10", // purple outline
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
