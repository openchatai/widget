import { MessageType } from "@lib/types";
import { ChatHistoryMessageType } from "../types/schemas";
import { genId } from "./genId";
import { NormalizedWidgetOptions } from "@lib/providers/ConfigDataProvider";

function historyToWidgetMessages(mgs: ChatHistoryMessageType[],
    { bot }: Pick<NormalizedWidgetOptions, "bot">
) {
    const messages: MessageType[] = [];
    for (let i = 0; i < mgs.length; i++) {
        const msg = mgs[i];

        if (msg.from_user === true) {
            if (msg.message && msg.message.length > 0) {
                messages.push({
                    type: "FROM_USER",
                    content: msg.message,
                    id: msg.publicId || genId(),
                    deliveredAt: msg.created_at || "",
                    attachments: msg.attachments
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
                        id: msg.publicId || genId(),
                        timestamp: msg.created_at || "",
                        original: msg,
                        attachments: msg.attachments,
                        agent: {
                            id: msg.agent_id?.toString() ?? null,
                            is_ai: true,
                            profile_picture: msg.agent_avatar || bot.profile_picture,
                            name: msg.agent_name || bot.name,
                        },
                    });
                    break;
                case "agent_message":
                    messages.push({
                        type: "FROM_BOT",
                        component: "TEXT",
                        data: {
                            message: msg.message ?? "",
                        },
                        id: msg.publicId || genId(),
                        timestamp: msg.created_at || "",
                        original: msg,
                        attachments: msg.attachments,
                        agent: {
                            id: msg.agent_id?.toString() ?? null,
                            is_ai: false,
                            name: msg.agent_name || "",
                            profile_picture: msg.agent_avatar || "",
                        },
                    });
                    break;
                default:
                    messages.push({
                        type: "FROM_BOT",
                        component: "CHAT_EVENT",
                        data: {
                            event: msg.type,
                            message: msg.message ?? "",
                        },
                        id: msg.publicId || genId(),
                        original: msg,
                        attachments: msg.attachments,
                        timestamp: msg.created_at || "",
                        agent: {
                            is_ai: true,
                            id: msg.agent_id?.toString() ?? null,
                            name: msg.agent_name || "",
                            profile_picture: msg.agent_avatar || "",
                        },
                    });
            }
        }
    }
    return messages;
}

export { historyToWidgetMessages };