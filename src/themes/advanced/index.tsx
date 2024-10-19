import { AnimatePresence, motion } from "framer-motion";
import { ComponentPropsWithoutRef, ElementType, forwardRef, useRef, useState } from "react";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { ChatScreen } from "./screens/chat-screen";
import { HomeScreen } from "./screens/home-screen";
import { Toaster } from "@components/toaster";
import styled from 'styled-components';
import { WidgetProvider } from "src/providers/WidgetProvider";
import { mergeRefs } from "@lib/utils/merge-refs";
import { useLifecycle } from "@lib/hooks/useLifecycle";

// Define styled components for styling
const WidgetContainer = styled(motion.div)`
    border: 1px solid ${props => props.theme.colors.border}; /* border-gray-200 */

    overflow: hidden;
    isolation: isolate;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.secondary};
    
    font-family: Inter, Cairo, system-ui;
    border-radius: ${({ theme }) => theme.radii.lg};
    width: 350px;
    max-width: 100%;
`

const InnerContainer = styled.div`
    position: relative;
`;

const router = memoryLocation({
    record: true,
});

const AdvancedWidget = forwardRef<
    ElementType<typeof WidgetContainer>,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
    const widgetContainerRef = useRef<ElementType<typeof WidgetContainer>>(null);
    const ref = mergeRefs(_ref, widgetContainerRef);


    const innerContainerRef = useRef<HTMLDivElement>(null);
    const [widgetHeight, setWidgetHeight] = useState<number | 'auto'>('auto');

    useLifecycle(() => {
        if (innerContainerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                const observedHeight = entries[0].contentRect.height
                setWidgetHeight(observedHeight)
            })

            resizeObserver.observe(innerContainerRef.current)

            return () => {
                resizeObserver.disconnect()
            }
        }
    })

    return (
        // @ts-expect-error
        <WidgetContainer ref={ref} {...props} layout style={{ height: widgetHeight, overflow: 'hidden' }} animate={{ height: widgetHeight }} transition={{ duration: 0.1, type: "spring" }}>
            <InnerContainer ref={innerContainerRef}>
                <WidgetProvider value={{ widgetRoot: widgetContainerRef.current }}>
                    <AnimatePresence>
                        <Router hook={router.hook}>
                            <Route path={"/"} component={HomeScreen} />
                            <Route path={"/chat"} component={ChatScreen} />
                            <Route path={"/chat/:sessionId"} component={ChatScreen} />
                        </Router>
                    </AnimatePresence>
                </WidgetProvider>
                <Toaster />
            </InnerContainer>
        </WidgetContainer>
    );
});

AdvancedWidget.displayName = "AdvancedWidget";

export {
    AdvancedWidget,
};
