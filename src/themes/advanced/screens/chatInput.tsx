import { StyledTiptapEditor } from "@components/tiptap";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { useChat } from "@lib/index";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { size } from "src/design-helpers";
import styled from "styled-components";
import { useContainer } from "../ContainerProvider";

const InputContainer = styled.div`
    --min-input-height: 40px; /* h-12 */
    --max-input-height: 100px; /* h-20 */
    --btn-size: 30px; /* h-12 */

    transform-origin: bottom;

    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid ${props => props.theme.colors.border}; /* border-gray-200 */
    transition: outline 0.3s;
    transition: border 0.3s;
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0.3rem; 
    
    bottom: calc(var(--min-input-height) / 2);
    transform: translateY(50%);

    display: flex;
    align-items: center;
`;

const SendButton = styled.button`
    transition: opacity 0.1s;
    cursor: pointer;
    ${size("var(--btn-size)")};
    
    [data-icon] {
        width: calc(var(--btn-size) / 1.5) !important;
        height: calc(var(--btn-size) / 1.5) !important;
    }

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: ${props => props.theme.radii.full}; /* rounded-full */
    background-color: ${props => props.theme.colors.primary}; /* bg-gray-100 */
    color: ${props => props.theme.colors.foreground}; /* text-gray-300 */
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
        opacity: 0.5; /* disabled:opacity-50 */
        cursor: not-allowed; /* disabled:cursor-not-allowed */
    }

`;


function ChatInput() {
    const [content, setContent] = useState("");
    const { sendMessage, canSend } = useChat()

    const handleSend = () => {
        sendMessage({ content: { text: content } })
    }
    const Tooltip__Content = () => {
        if (!canSend.canSend) {
            return <div>{canSend.reason}</div>
        }
        if (!content) {
            return <div>can't send empty message</div>
        }

        return <div>send</div>
    }
    const container = useContainer()
    return <InputContainer>
        <div style={{
            position: "relative",
            display: "flex",
        }}>
            <StyledTiptapEditor
                defaultContent={content}
                onContentChange={(_content) => {
                    setContent(_content)
                }}
            />
            <ButtonContainer>
                <Tooltip>
                    <TooltipPortal container={container.containerElement}>
                        <TooltipContent>
                            <Tooltip__Content />
                        </TooltipContent>
                    </TooltipPortal>
                    <TooltipTrigger asChild>
                        <SendButton onClick={handleSend} disabled={!canSend.canSend || !content}>
                            <SendHorizontal data-icon />
                        </SendButton>
                    </TooltipTrigger>
                </Tooltip>
            </ButtonContainer>
        </div>
    </InputContainer>
}

export {
    ChatInput
}