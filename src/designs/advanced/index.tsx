import { Toaster } from "@lib/components/toaster";
import { AnimatePresence } from "framer-motion"
import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { ChatScreen } from "./screen/chat-screen";
import { HomeScreen } from "./screen/home-screen";


// persist the user instead of the session
// to allow the session to change to chat accross multible sessions
// for now use a singleton session and recreate new ones on demand

const AdvancedWidget = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
    const { hook } = useMemo(() => {
        return memoryLocation({
            record: true,
        });
    }, [])

    return <div
        ref={_ref}
        {...props}
        className="bg-white border shadow-xl rounded-xl font-inter overflow-hidden size-full">
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
        <Toaster />
    </div>
});

AdvancedWidget.displayName = "AdvancedWidget";

// TODO
function AdvancedWidgetPopover() {
    return (
        <AdvancedWidget />
    )
}

export {
    AdvancedWidgetPopover,
    AdvancedWidget
}