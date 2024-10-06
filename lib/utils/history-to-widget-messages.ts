import { MessageType } from "@lib/types";
import { ChatHistoryMessageType } from "@lib/types/schemas.backend";
import { genId } from "./genId";

function historyToWidgetMessages(mgs: ChatHistoryMessageType[]) {
    const messages: MessageType[] = [];
    for (let i = 0; i < mgs.length; i++) {
        const msg = mgs[i];
        if (msg.from_user === true) {
            if (msg.message && msg.message.length > 0) {
                messages.push({
                    type: "FROM_USER",
                    content: msg.message,
                    id: msg.id.toString(),
                    session_id: msg.session_id ?? "",
                    timestamp: msg.created_at ?? "",
                    serverId: msg.id.toString(),
                });
            }
        }
        else {
            switch (msg.type) {
                case "message":
                    messages.push({
                        type: "FROM_BOT",
                        component: "TEXT",
                        data: {
                            message: msg.message ?? "",
                        },
                        id: msg.id.toString() ?? genId(),
                        serverId: msg.id ?? genId(),
                        timestamp: msg.created_at ?? "",
                        original: msg,
                    });
                    break;
                case "agent_message":
                    messages.push({
                        type: "FROM_BOT",
                        component: "TEXT",
                        data: {
                            message: msg.message ?? "",
                        },
                        id: msg.id.toString() ?? genId(),
                        serverId: msg.id ?? genId(),
                        timestamp: msg.created_at ?? "",
                        original: msg,
                    });
                    break;
                default:
                    messages.push({
                        type: "FROM_BOT",
                        component: "CHAT_EVENT",
                        data: {
                            event: msg.type,
                            message: msg.message
                        },
                        id: msg.id.toString() ?? genId(),
                        serverId: msg.id ?? genId(),
                        original: msg,
                        timestamp: msg.created_at ?? "",
                    });
            }
        }
    }
    return messages;
}

export { historyToWidgetMessages };