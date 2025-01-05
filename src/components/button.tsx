import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/utils";
import { Wobble } from "./wobble";

const buttonVariants = cva(
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2",
    "text-sm font-medium whitespace-nowrap",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "shadow-sm active:shadow-none active:scale-95 hover:active:scale-95",
    "rounded-xl",
    // Add border to make transitions between variants smoother... because border takes 1 pixel of space in each direction
    "border",
    "transition",
  ),
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground",
        outline: "bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        link: "border-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        fit: "size-fit p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Wobble ref={ref}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      </Wobble>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
