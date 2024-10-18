import { motion } from 'framer-motion';
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { SizableScreenContainer } from '../WidgetPopoverContent';
import styled from 'styled-components';
import { size } from 'src/design-helpers';
import { Dialog, DialogContent, DialogTrigger } from '@components/dialog';

const FooterContainer = styled.footer`
    padding: ${props => props.theme.spacing.md};
`;

const TextAreaContainer = styled.div`
    overflow: hidden;
    border-radius: ${props => props.theme.radii.full};
    border: 1px solid ${props => props.theme.colors.border}; /* border-gray-200 */
    transition: outline 0.3s;
    transition: border 0.3s;
    
    &:focus-within {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        outline: ${props => props.theme.colors.primary}; /* outline-blue-500 */
    }

    input {
        width: 100%;
        height: 2.75rem; /* h-11 */
        min-height: 3rem; /* min-h-12 */
        padding: 0; /* p-0 */
        vertical-align: middle;
        border: none;
        font-weight: 500;
        font-size: ${props => props.theme.fs.md}; /* text-sm */
        outline: none;
        box-shadow: none; /* !outline-none !ring-0 */
        padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.lg}`}; /* py-3 pl-4 pr-10 */
        padding-right: 2.5rem; /* pr-10 */
}
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0.5rem; /* right-2 */
    top: 0.5rem; /* top-3 */
    display: flex;
    align-items: center;
`;

const SendButton = styled.button`
    transition: opacity 0.1s;
    border-radius: ${props => props.theme.radii.full}; /* rounded-full */
    background-color: ${props => props.theme.colors.primary}; /* bg-gray-100 */
    color: ${props => props.theme.colors.foreground}; /* text-gray-300 */
    cursor: pointer;
    padding: ${props => props.theme.spacing.md};
    
    &:hover {
        opacity: 0.9; /* enabled:hover:opacity-90 */
    }
    
    &:active {
        opacity: 0.8; /* enabled:active:opacity-80 */
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}; 
    }
    
    &:disabled {
        background-color: ${props => props.theme.colors.destructive}; /* enabled:bg-blue-500 */
        color: white;
    }

    svg {
        ${size("16px")};
    }
`;

const AnimatedChatScreenContainer = styled(SizableScreenContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${props => props.theme.spacing.xs};

    header {

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

export function ChatFooter() {
    const [input, setInput] = useState("");

    return (
        <FooterContainer>
            <TextAreaContainer>
                <div style={{
                    position: "relative",
                    display: "flex",
                }}>
                    <input
                        value={input}
                        onChange={(ev) => setInput(ev.target.value)}
                        autoFocus
                        tabIndex={0}
                        dir="auto"
                        placeholder="chat with us....."
                    />
                    <ButtonContainer>
                        <SendButton>
                            <SendHorizontal className="size-4" />
                        </SendButton>
                    </ButtonContainer>
                </div>
            </TextAreaContainer>
        </FooterContainer>
    );
}


const MainChatContent = styled.main`
    padding: ${props => props.theme.spacing.xs};
    flex: 1;

`

export function ChatScreen() {
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
                <Dialog>
                    <DialogTrigger>
                        Trigger
                    </DialogTrigger>
                    <DialogContent isAlert>
                        Content
                    </DialogContent>
                </Dialog>
            </MainChatContent>
            <ChatFooter />
        </AnimatedChatScreenContainer>
    );
}
