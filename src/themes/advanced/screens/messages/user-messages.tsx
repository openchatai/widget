import { MessageContainer } from "./message-container";

export function UserMessage() {
    return (
        <MessageContainer direction="right">
            <div className="message-body">
                <div data-messages-stack>
                    <p data-message-text>Hi there can u help me?, Hi there can u help me?</p>
                    <p data-message-text>Hi there can u help me?</p>
                    <p data-message-text>Hi there can u help me?</p>
                </div>
            </div>
        </MessageContainer>
    );
}