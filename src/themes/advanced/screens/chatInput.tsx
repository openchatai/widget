import { StyledTiptapEditor } from "@components/tiptap";
import { SendHorizontal } from "lucide-react";
import { size } from "src/design-helpers";
import styled from "styled-components";

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
        background-color: ${props => props.theme.colors.destructive}; /* enabled:bg-blue-500 */
        color: white;
    }

`;


function ChatInput() {
    return <InputContainer>
        <div style={{
            position: "relative",
            display: "flex",
        }}>
            <StyledTiptapEditor
                onContentChange={(content) => {
                    // 
                }}
            />
            <ButtonContainer>
                <SendButton>
                    <SendHorizontal data-icon />
                </SendButton>
            </ButtonContainer>
        </div>
    </InputContainer>
}

export {
    ChatInput
}