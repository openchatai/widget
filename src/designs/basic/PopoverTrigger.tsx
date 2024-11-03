import { useConfigData } from "@lib/index";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { MessageSquareDot, XIcon } from "lucide-react";
import { motion } from "framer-motion";

function PopoverTrigger({ isOpen }: { isOpen: boolean }) {
    const { theme } = useConfigData()

    return <PopoverPrimitive.PopoverTrigger
        data-chat-widget
        style={{ ...cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset }), right: theme.triggerOffset, bottom: theme.triggerOffset }}
        className={cn(
            "shadow-lg hover:brightness-110 size-fit z-[200] fixed font-inter rounded-full",
            "bg-gradient-to-tr text-white bg-primary",
            "transition-all duration-300 hover:shadow-xl",
        )}
    >
        <motion.div
            whileTap={{ scale: 0.94 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
            }}
            className={cn(
                "p-3 transition-transform duration-300 relative ease-in-out",
                { "transform scale-110": isOpen },
            )}
        >
            {!isOpen ? (
                <MessageSquareDot className="size-6" />
            ) : (
                <XIcon className="size-6" />
            )}
            <span className="absolute top-0 right-0 size-3 bg-emerald-600 border-2 border-white rounded-full" />
        </motion.div>
    </PopoverPrimitive.PopoverTrigger>
}

export { PopoverTrigger }