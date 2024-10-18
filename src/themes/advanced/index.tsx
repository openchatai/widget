import { AnimatePresence } from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { ChatScreen } from "./screen/chat-screen";
import { HomeScreen } from "./screen/home-screen";
import { Toaster } from "@components/toaster";
import styled from 'styled-components';

// Define styled components for styling
const WidgetContainer = styled.div`
    border: 1px solid ${props => props.theme.colors.border}; /* border-gray-200 */

    overflow: hidden;
    isolation: isolate;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.secondary};
    
    font-family: Inter, Cairo, system-ui;
    border-radius: ${({ theme }) => theme.radii.lg};
    width: 350px;
`;

const InnerContainer = styled.div`
    height: 100%; 
    position: relative;
`;

const router = memoryLocation({
    record: true,
});

const AdvancedWidget = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
    return (
        <WidgetContainer ref={_ref} {...props}>
            <InnerContainer>
                <AnimatePresence>
                    <Router hook={router.hook}>
                        <Route path={"/"}>
                            <HomeScreen />
                        </Route>
                        <Route path={"/chat"}>
                            <ChatScreen />
                        </Route>
                    </Router>
                </AnimatePresence>
            </InnerContainer>
            <Toaster />
        </WidgetContainer>
    );
});

AdvancedWidget.displayName = "AdvancedWidget";

export {
    AdvancedWidget,
};
