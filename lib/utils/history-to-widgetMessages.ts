import { MessageType } from "@lib/types";
import { genId } from "./genId";
import { ChatMessageHistory } from "./getters";

function historyToWidgetMessages(mgs: ChatMessageHistory[]) {
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
                case "handoff":
                    messages.push({
                        type: "FROM_BOT",
                        component: "HANDOFF",
                        data: {},
                        id: msg.id.toString() ?? genId(),
                        serverId: msg.id ?? genId(),
                    });
                    break;
                case "message":
                    messages.push({
                        type: "FROM_BOT",
                        component: "TEXT",
                        data: {
                            message: msg.message ?? "",
                        },
                        id: msg.id.toString() ?? genId(),
                        serverId: msg.id ?? genId(),
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
                    });
            }
        }
    }
    return messages;
}

export { historyToWidgetMessages };