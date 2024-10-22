import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { MessageCircleMoreIcon, XIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useMemo, useState } from "react";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { ChatScreen } from "./screen/chat-screen";
import { HomeScreen } from "./screen/home-screen";


// persist the user instead of the session
// to allow the session to change to chat accross multible sessions
// for now use a singleton session and recreate new ones on demand

const MinimalWidget = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
    const { hook } = useMemo(() => {
        return memoryLocation({
            record: true,
        });
    }, [])

    return <div ref={_ref} {...props} className="bg-white border shadow-xl rounded-xl font-inter overflow-hidden h-full w-full">
        <div className="h-full relative">
            <AnimatePresence>
                <Router hook={hook}>
                    <Route path={"/"}>
                        <HomeScreen />
                    </Route>
                    <Route path={"/chat"}>
                        <ChatScreen />
                    </Route>
                </Router>
            </AnimatePresence>
        </div>
    </div>
});

MinimalWidget.displayName = "MinimalWidget";

export function MinimalWidgetPopover() {
    const [isOpen, setIsOpened] = useState(false);
    return (
        <LazyMotion features={domAnimation}>
            <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
                <PopoverPrimitive.PopoverTrigger
                    style={{
                        display: "none"
                    }}
                    className="!flex transition-all bg-white group z-max bottom-8 border end-8 fixed font-bold size-14 cursor-pointer items-center justify-center rounded-full leading-6 shadow-xl group hover:scale-105 active:scale-90">
                    <div className="size-full text-black transition duration-500">
                        <XIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 size-7 group-data-[state=closed]:scale-0 group-data-[state=open]:scale-100" />
                        <MessageCircleMoreIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 size-7 group-data-[state=open]:scale-0 group-data-[state=closed]:scale-100" />
                    </div>
                    <span className="sr-only">
                        open the widget
                    </span>
                </PopoverPrimitive.PopoverTrigger>
                <AnimatePresence>
                    {isOpen && (
                        <PopoverPrimitive.PopoverContent
                            forceMount
                            asChild
                            onInteractOutside={(ev) => ev.preventDefault()}
                            align="end"
                            side="top"
                            alignOffset={0}
                            updatePositionStrategy="optimized"
                            sticky="always"
                            sideOffset={10}
                            className="z-max isolate origin-bottom-right max-w-[var(--radix-popover-content-available-width)-30px] max-h-[calc(var(--radix-popper-available-height)-30px)] w-[350px] h-[450px] min-h-0">
                            <m.div
                                initial={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                                animate={{ opacity: 1, y: 0, rotate: "0deg", scale: 1, pointerEvents: "initial" }}
                                exit={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                <MinimalWidget />
                            </m.div>
                        </PopoverPrimitive.PopoverContent>
                    )}
                </AnimatePresence>
            </PopoverPrimitive.Root>
        </LazyMotion>

    )
}