import { useConfigData } from "@lib/index";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { MessageSquareDot, XIcon } from "lucide-react";
import { motion } from "framer-motion";

function PopoverTrigger({ isOpen }: { isOpen: boolean }) {
    const { theme } = useConfigData();

    return (
        <PopoverPrimitive.PopoverTrigger
            data-chat-widget
            style={{ ...cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset }), right: theme.triggerOffset, bottom: theme.triggerOffset }}
            className={cn(
                "shadow-lg hover:brightness-110 size-fit z-[200] fixed font-inter rounded-full",
                "bg-gradient-to-tr bg-primary text-white",
                "transition-all duration-300 hover:shadow-xl",
                "ring-4 ring-black/5"
            )}
        >
            <motion.div
                whileTap={{ scale: 0.94 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                }}
                className="p-3.5 relative"
            >
                <motion.div
                    initial={false}
                    animate={{
                        scale: isOpen ? 0 : 1,
                        opacity: isOpen ? 0 : 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                >
                    <MessageSquareDot className="size-7" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        scale: isOpen ? 1 : 0,
                        opacity: isOpen ? 1 : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <XIcon className="size-7" />
                </motion.div>

                <span className="absolute top-0 right-0 size-3 bg-emerald-600 border-2 border-white rounded-full" />
            </motion.div>
        </PopoverPrimitive.PopoverTrigger>
    );
}

export { PopoverTrigger }