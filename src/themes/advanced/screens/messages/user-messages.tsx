import { UserMessageType } from "@lib/types";
import { MessageContainer } from "./message-container";

export function UserMessage({ message }: { message: UserMessageType }) {
    return (
        <MessageContainer direction="right">
            <div className="message-body">
                <div data-messages-stack>
                    <p data-message-text>{message.content}</p>
                </div>
            </div>
        </MessageContainer>
    );
}