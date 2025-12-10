import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-[#3a2d22] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        outline:
          "border border-input bg-background shadow-sm hover:bg-muted hover:border-primary hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-[#c4b0a3] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-[#b56a4a] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
