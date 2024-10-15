import { cn } from "@lib/utils/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageCircleMoreIcon, XIcon } from "lucide-react";
import { ComponentProps, ComponentRef, forwardRef } from "react";

const WidgetPopoverTrigger = forwardRef<ComponentRef<typeof PopoverPrimitive.PopoverTrigger>, ComponentProps<typeof PopoverPrimitive.PopoverTrigger>>(({ className, ...props }, _ref) => {
    return <PopoverPrimitive.PopoverTrigger
        style={{
            display: "none"
        }}
        ref={_ref}
        className={cn("!flex transition-all bg-white group bottom-8 border end-8 fixed font-bold size-14 cursor-pointer items-center justify-center rounded-full leading-6 shadow-xl group hover:scale-105 active:scale-90", className)}
        {...props}
    >
        <div className="size-full text-black transition duration-500">
            <XIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 size-7 group-data-[state=closed]:scale-0 group-data-[state=open]:scale-100" />
            <MessageCircleMoreIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 size-7 group-data-[state=open]:scale-0 group-data-[state=closed]:scale-100" />
        </div>
        <span className="sr-only">
            open the widget
        </span>
    </PopoverPrimitive.PopoverTrigger>
})

export {
    WidgetPopoverTrigger,
}