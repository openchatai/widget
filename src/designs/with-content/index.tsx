import { useSyncedState } from "@lib/hooks";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { PopoverTrigger } from "../_shared/PopoverTrigger";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { TooltipProvider } from "@ui/tooltip";
import { cssVars } from "../constants";
import { useChat, useConfigData } from "@lib/index";
import { cn } from "src/utils";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { ChatScreen } from "./screens/ChatScreen";
import { HelpCenter } from "./screens/HelpCenter";
import { router } from "./router";

const WidgetWithContent = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
    const chat = useChat();
    const { theme } = useConfigData()
    return (
        <TooltipProvider>
            <div style={{ display: "contents" }} data-chat-widget>
                <div
                    {...props}
                    ref={_ref}
                    data-version={chat.version}
                    data-chat-widget
                    style={cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset })}
                    className={cn(
                        "rounded-xl border overflow-hidden isolate relative text-secondary-foreground",
                        className,
                    )}
                >
                    <Router hook={router.hook}>
                        <Route path={"/"} component={WelcomeScreen} />
                        <Route path={"/chat"} component={ChatScreen} />
                        <Route path={"/help-center"} component={HelpCenter} nest />
                    </Router>
                </div>
            </div>
        </TooltipProvider>
    );
});

function WidgetWithContentPopover() {
    const [isOpen, setIsOpened] = useSyncedState<boolean>("[widget-opened]", false, "session");

    return (
        <PopoverPrimitive.Root open={isOpen ?? false} onOpenChange={setIsOpened}>
            <AnimatePresence
                mode="wait"
            >
                {
                    isOpen && (<PopoverPrimitive.Content
                        forceMount
                        onInteractOutside={(ev) => ev.preventDefault()}
                        side="top"
                        sideOffset={10}
                        data-chat-widget
                        asChild
                        align="end"
                    >
                        <motion.div
                            style={{ transformOrigin: "bottom right", zIndex: 10000000 }}
                            initial={{ opacity: 0, scale: 0.3, y: 20 }}
                            className="max-h-[85dvh] w-[350px] shadow-xl rounded-xl overflow-hidden"
                            variants={{
                                hidden: {
                                    rotate: "-10deg",
                                    opacity: 0,
                                },
                                visible: {
                                    rotate: 0,
                                    opacity: 1,
                                },
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.3,
                                y: 20,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <WidgetWithContent className="overflow-hidden w-full h-[600px]  shadow-lg font-inter" />
                        </motion.div>
                    </PopoverPrimitive.Content>)
                }
            </AnimatePresence>
            <PopoverTrigger isOpen={isOpen ?? false} />
        </PopoverPrimitive.Root>
    )
}

export { WidgetWithContentPopover }