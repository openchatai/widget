import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "src/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-lg bg-black text-foreground p-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type Side = React.ComponentProps<typeof TooltipContent>['side'];
type Align = React.ComponentProps<typeof TooltipContent>['align'];

function Tooltippy({ children, content,position }: {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: `${NonNullable<Side>}-${NonNullable<Align>}`;
}) {
  const [
    side = "top",
    align = "center",
  ] = (position ?? "top-center").split("-");
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent hideWhenDetached collisionPadding={10} avoidCollisions align={align as Align} side={side as Side}>{content}</TooltipContent>
    </Tooltip>
  );
}

export { TooltipProvider, Tooltippy };
