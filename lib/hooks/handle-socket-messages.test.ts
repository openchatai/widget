import { BotMessageType } from "@lib/types";
import { describe, expect, test } from "vitest";
import { handleSocketMessages } from "./handle-socket-messages";

describe("handle-socket-messages", () => {
    test("should return and parse a message", () => {
        const message = handleSocketMessages({
            _message: {
                type: "message",
                value: "hello",
                agent: {
                    is_ai: true,
                    name: "Open"
                },
                client_message_id: "123",
                server_message_id: 123,
                server_session_id: "123"
            },
        });
        expect(message).toEqual<BotMessageType<{ message: string }>>({
            id: "123",
            component: "TEXT",
            type: "FROM_BOT",
            serverId: 123,
            data: {
                message: "hello"
            },
            agent: {
                is_ai: true,
                name: "Open"
            },
        });
    })

    test("should return and parse a handoff message", () => {
        const message = handleSocketMessages({
            _message: {
                type: "handoff",
                value: {
                    summary: "hello",
                    sentiment: "happy"
                },
                agent: {
                    is_ai: true,
                    name: "Open"
                },
                client_message_id: "123",
                server_message_id: 123,
                server_session_id: "123"
            },
        });
        expect(message).toEqual<BotMessageType>({
            id: "123",
            component: "HANDOFF",
            type: "FROM_BOT",
            serverId: 123,
            data: {
                summary: "hello",
                sentiment: "happy"
            },
            agent: {
                is_ai: true,
                name: "Open"
            },
        });
    })
});