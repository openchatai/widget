import { useConfigData } from "@lib/index";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { MessageSquareDot, XIcon } from "lucide-react";

function PopoverTrigger({ isOpen }: { isOpen: boolean }) {
    const { theme } = useConfigData()

    return <PopoverPrimitive.PopoverTrigger
        data-chat-widget
        style={cssVars({ primary: theme.primaryColor },{triggerOffset: theme.triggerOffset})}
        className="shadow-lg hover:brightness-110 size-fit bottom-[var(--opn-trigger-offset)] right-[var(--opn-trigger-offset)] transition-all z-[200] fixed font-inter rounded-full text-white bg-primary duration-300 ease-in-out transform active:scale-90"
    >
        <div
            className={cn(
                "p-3.5 transition-transform duration-300 relative ease-in-out",
                { "transform scale-110": isOpen },
            )}
        >
            {!isOpen ? (
                <MessageSquareDot className="size-7" />
            ) : (
                <XIcon className="size-7" />
            )}
            <span className="absolute top-0 right-0 size-3 bg-emerald-600 border-2 border-white rounded-full" />
        </div>
    </PopoverPrimitive.PopoverTrigger>
}

export { PopoverTrigger }