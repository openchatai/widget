import { beforeEach, describe, expect, it, vi } from "vitest";
import { MessageTypeEnum, StructuredSocketMessageType } from "../types/schemas";
import { handleSocketMessages } from "./handle-socket-messages";

describe("handle-socket-messages", () => {
    const onBotMessage = vi.fn();
    const onSessionUpdate = vi.fn();
    const onOptions = vi.fn();
    const onChatEvent = vi.fn();
    const onUi = vi.fn();
    const onForm = vi.fn();
    const onVote = vi.fn();
    const onInfo = vi.fn();
    const onAny = vi.fn();

    beforeEach(() => {
        onBotMessage.mockReset();
        onSessionUpdate.mockReset();
        onOptions.mockReset();
        onChatEvent.mockReset();
        onUi.mockReset();
        onForm.mockReset();
        onVote.mockReset();
        onInfo.mockReset();
        onAny.mockReset();
    });

    const createContext = (message: StructuredSocketMessageType) => ({
        _message: message,
        _config: { bot: { name: "Bot", is_ai: true, id: null, profile_picture: "" } },
            onBotMessage,
            onSessionUpdate,
            onOptions,
            onChatEvent,
            onUi,
            onForm,
            onVote,
        onInfo,
        onAny
    });

    it("should process a message", () => {
        const _message = <StructuredSocketMessageType>{
            type: "message",
            value: "hello back!",
            agent: {
                is_ai: true,
                name: "Open"
            },
            client_message_id: "123",
            server_session_id: "123",
            timestamp: "2024-09-30T17:28:21.000Z",
            is_stream_chunk: false,
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process vote", () => {
        const _message = <StructuredSocketMessageType>{
            type: "vote",
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
});

    it("should process info", () => {
        const _message = <StructuredSocketMessageType>{
            type: "info",
            value: "hello back!"
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process ui", () => {
        const _message = <StructuredSocketMessageType>{
            type: "ui",
            agent: {
                is_ai: true,
                name: "Open",
                id: null
            },
            server_session_id: "123",
            timestamp: "2024-09-30T17:28:21.000Z",
            value: {
                type: "form",
                request_response: {
                    inferredArgs: {},
                    parametersSchema: {
                        pathParams: {},
                        queryParams: {},
                        bodyParams: {},
                    },
                },
                name: "test",
                message_id: "123",
                content: "hello back!",
                incoming_message_id: "123",
            }
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onUi).toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process form", () => {
        const _message = <StructuredSocketMessageType>{
            type: "form",
            value: {
                inferredArgs: {},
                parametersSchema: {
                    pathParams: {},
                    queryParams: {},
                    bodyParams: {},
                },
            },
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process session update", () => {
        const _message = <StructuredSocketMessageType>{
            type: "session_update",
            value: {},
            server_session_id: "123",
            timestamp: "2024-09-30T17:28:21.000Z",
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onSessionUpdate).toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process options", () => {
        const _message = <StructuredSocketMessageType>{
            type: "options",
            value: {
                options: [
                    "Yes",
                    "No"
                ]
            },
            server_session_id: "123",
            timestamp: "2024-09-30T17:28:21.000Z",
        };

        handleSocketMessages(createContext(_message));

        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onChatEvent).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });

    it("should process chat event", () => {
        const baseAgent = {
            is_ai: true,
            name: "Open",
            id: null
        };

        const _message: StructuredSocketMessageType = {
            type: "chat_event",
            agent: baseAgent,
            timestamp: "2024-09-30T17:28:21.000Z",
            value: {
                message: "Agent Ahmad Falta took over the chat from the AI agent",
                event: MessageTypeEnum.AGENT_JOINED
            },
        };

        handleSocketMessages(createContext(_message));

        expect(onChatEvent).toHaveBeenCalled();
        expect(onBotMessage).not.toHaveBeenCalled();
        expect(onUi).not.toHaveBeenCalled();
        expect(onForm).not.toHaveBeenCalled();
        expect(onVote).not.toHaveBeenCalled();
        expect(onInfo).not.toHaveBeenCalled();
        expect(onSessionUpdate).not.toHaveBeenCalled();
        expect(onOptions).not.toHaveBeenCalled();
        expect(onAny).toHaveBeenCalled();
    });
});