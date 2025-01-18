import { SendMessageInput } from "@core/client/chat";
import { UserMessageType } from "@core/types";
import { v4 } from "uuid";
import { describe, expect, it, vi } from "vitest";
import { initilize } from "../test-utils";

describe.concurrent("web integration tests", () => {
  it("should get the preluade data correctly", async () => {
    const { apis } = initilize();
    const preludeData = await apis.widgetPrelude();
    expect(preludeData).toBeDefined();
  });

  it("should process the message correctly of a fresh session", async () => {
    const { chat } = initilize();
    const subscriber = vi.fn();
    expect(chat.chatState.getState()).toBeDefined();
    expect(chat.chatState.getState().messages).toHaveLength(0);

    chat.chatState.subscribe(subscriber);

    const userMessage: SendMessageInput = {
      content: "Hello",
    };

    const resp = await chat.sendMessage(userMessage);
    expect(resp).toBeDefined();

    // Verify message was added to state
    const state = chat.chatState.getState();
    expect(state.messages.length).toBeGreaterThan(0);
    const lastMessage = state.messages[0] as UserMessageType;
    expect(lastMessage.type).toBe("FROM_USER");
    expect(lastMessage.content).toBe("Hello");

    // Verify subscriber was called
    expect(subscriber).toHaveBeenCalled();
  }, 120000);

  it("should handle message with attachments", async () => {
    const { chat } = initilize();
    const attachment = {
      id: v4(),
      name: "test.jpg",
      size: 1024,
      type: "image/jpeg",
      url: "test.jpg",
    };

    const userMessage: SendMessageInput = {
      content: "Here's an image",
      attachments: [attachment],
    };

    await chat.sendMessage(userMessage);
    const state = chat.chatState.getState();
    const lastMessage = state.messages[0] as UserMessageType;
    expect(lastMessage.attachments).toBeDefined();
    expect(lastMessage.attachments![0]).toEqual(attachment);
  }, 120000);

  it("should handle error states correctly", async () => {
    const { chat } = initilize();
    const invalidMessage: SendMessageInput = {
      content: "", // Empty content should trigger error
    };

    try {
      await chat.sendMessage(invalidMessage);
    } catch {
      const state = chat.chatState.getState();
      expect(state.error.hasError).toBe(true);
      expect(state.error.message).toBeDefined();
    }
  }, 120000);

  it("should maintain loading state during message processing", async () => {
    const { chat } = initilize();
    const subscriber = vi.fn();
    chat.chatState.subscribe(subscriber);

    const sendPromise = chat.sendMessage({
      content: "Test loading",
    });

    // Check loading state immediately after sending
    expect(chat.chatState.getState().loading.isLoading).toBe(true);

    await sendPromise;

    // Check loading state after completion
    expect(chat.chatState.getState().loading.isLoading).toBe(false);
  }, 120000);

  it("should handle bot responses correctly", async () => {
    const { chat } = initilize();

    await chat.sendMessage({
      content: "Hello bot",
    });

    // Wait for bot response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const state = chat.chatState.getState();
    const botMessages = state.messages.filter((m) => m.type === "FROM_BOT");
    expect(botMessages.length).toBeGreaterThan(0);
    expect(botMessages[0].data).toBeDefined();
  }, 120000);

  describe("polling functionality", () => {
    it("should track session polling state", async () => {
      const { chat } = initilize();

      // Send a message to create a session
      await chat.sendMessage({
        content: "Start polling test",
      });

      // Wait for polling to start
      await new Promise((resolve) => setTimeout(resolve, 100));

      const state = chat.chatState.getState();
      expect(state.polling.session).toBeDefined();
      expect(state.polling.session.isPolling).toBeDefined();
      expect(state.polling.session.lastPollTime).toBeDefined();
      expect(state.polling.session.nextPollTime).toBeDefined();
    }, 120000);

    it("should track message polling state", async () => {
      const { chat } = initilize();

      await chat.sendMessage({
        content: "Test message polling",
      });

      // Wait for polling to start
      await new Promise((resolve) => setTimeout(resolve, 100));

      const state = chat.chatState.getState();
      expect(state.polling.messages).toBeDefined();
      expect(state.polling.messages.isPolling).toBeDefined();
      expect(state.polling.messages.lastPollTime).toBeDefined();
      expect(state.polling.messages.nextPollTime).toBeDefined();
    }, 120000);
  });

  describe("session management", () => {
    it("should cleanup session state properly", async () => {
      const { chat } = initilize();

      // Create a session with some messages
      await chat.sendMessage({
        content: "Test cleanup",
      });

      // Cleanup
      chat.cleanup();

      const state = chat.chatState.getState();
      expect(state.messages).toHaveLength(0);
      expect(state.polling.session.isPolling).toBe(false);
      expect(state.polling.messages.isPolling).toBe(false);
      expect(state.error.hasError).toBe(false);
    }, 120000);
  });
});
