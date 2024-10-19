import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { SizableScreenContainer } from '../WidgetPopoverContent';
import styled from 'styled-components';
import { size } from 'src/design-helpers';
import { UserMessage } from './messages/user-messages';
import { BotMessage } from "./messages/bot-message";
import { ChatInput } from "./chatInput";
import { CaptureScreenshot } from "@components/capture-screenshot/captureScreenshot";

const AnimatedChatScreenContainer = styled(SizableScreenContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${props => props.theme.spacing.xs};

    & > header {

    padding: ${props => props.theme.spacing.sm};
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    gap: ${props => props.theme.spacing.sm};

    [data-header-lead]{
        padding: ${props => props.theme.spacing.md};
        border-radius: ${props => props.theme.radii.lg};
        color: ${props => props.theme.colors.foreground};
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        flex: 1;
        transition: background-color 0.3s;
        line-height: 1.1;
        &:hover {
            background-color: ${props => props.theme.colors.foreground};
        }
    }

    }
`;

const BackButton = styled.button`
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.radii.lg};
    color: ${props => props.theme.colors.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: ${props => props.theme.colors.foreground};
    }

    &:active {
        background-color: ${props => props.theme.colors.secondary};
    }

    & > svg {
        ${size("26px")};
    }
`;

const HeaderTitle = styled.h2`
    flex: 1;
    font-size: ${props => props.theme.fs.md}; /* text-base */
    font-weight: 600; /* font-semibold */
    color: ${props => props.theme.colors.secondary};
`;

const HeaderParagraph = styled.p`
    font-size: ${props => props.theme.fs.xs}; /* text-sm */
    color: ${props => props.theme.colors.secondary}; /* text-gray-900 */
`
const FooterContainer = styled.footer`
    padding: ${props => props.theme.spacing.md};
`;

const MainChatContent = styled.main`
    padding: ${props => props.theme.spacing.xs};
    flex: 1;
    overflow: auto;
    max-height: 100%;
`
interface ChatScreenProps {
    params: {
        sessionId?: string;
    }
}

export function ChatScreen(props: ChatScreenProps) {
    const [location, navigate] = useLocation();
    return (
        <AnimatedChatScreenContainer
            initial={{
                x: 10,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            exit={{
                x: 10,
                opacity: 0
            }}
        >
            <header>
                <BackButton
                    data-location={location}
                    onClick={() => navigate("/")}>
                    <ArrowLeft />
                </BackButton>
                <div data-header-lead>
                    <HeaderTitle>Bird</HeaderTitle>
                    <HeaderParagraph>
                        a refund for the order I placed last week
                    </HeaderParagraph>
                </div>
            </header>
            <MainChatContent>
                <UserMessage />
                <BotMessage />
            </MainChatContent>
            <FooterContainer>
                <ChatInput />
            </FooterContainer>
        </AnimatedChatScreenContainer>
    );
}
