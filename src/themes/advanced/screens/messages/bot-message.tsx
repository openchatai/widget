import { AvatarComponent } from "@components/avatar";
import { MessageContainer } from "./message-container";

export function BotMessage() {
    return (
        <MessageContainer direction="left">
            <div data-avatar-container>
                <AvatarComponent fallback="Bot" />
            </div>
            <div className="message-body">
                <div data-messages-header>
                    <div data-author-name>Bot</div>
                </div>
                <div data-messages-stack>
                    <div data-message-text>I am a bot, how can I help you today?</div>
                </div>
            </div>
        </MessageContainer>
    );
}
