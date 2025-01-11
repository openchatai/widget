import { ApiCaller, createChat, createConfig } from "@core/client";
import { Platform } from "@core/platform";
import { LoadingState } from "@core/types";
import { describe, expect, it, beforeEach } from "vitest";
import { getTestUser } from "../test-utils";

function initilize() {
    const openToken = "fe8f11971f5de916ab745d9c0408c7ef";
    const mockedStorage = new Map()

    const platform: Platform = {
        env: {
            platform: "test"
        },
        storage: {
            async getItem(key) {
                return mockedStorage.get(key)
            },
            async removeItem(key) {
                mockedStorage.delete(key)
            },
            async setItem(key, value) {
                mockedStorage.set(key, value)
            },
            isAvailable() {
                const testKey = "test-key"
                try {
                    mockedStorage.set(testKey, {})
                    mockedStorage.delete(testKey)
                    return true
                } catch {
                    return false
                }
            },
        }
    }

    const config = createConfig({
        token: openToken,
        user: getTestUser(),
        settings: {
            persistSession: true
        }
    })

    const apis = new ApiCaller({
        config: config.getConfig()
    })

    const chat = createChat({ api: apis, config: config, platform })

    return {
        chat,
        mockedStorage,
        config
    }
}

describe("integration testing with storage and persistence", () => {
    describe("loading states during persistence operations", () => {
        it("should set correct loading states during session creation", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            // Subscribe to loading state changes
            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            expect(chat.sessionState.getState()).toBe(null)
            const resp = await chat.sendMessage({ content: "hello world" })

            // Wait for all state updates to complete
            await new Promise(resolve => setTimeout(resolve, 100))

            // Verify loading states sequence
            const createSessionState = loadingStates.find(state =>
                state.isLoading && state.reason === 'creating_session'
            )
            expect(createSessionState).toBeDefined()

            const sendMessageState = loadingStates.find(state =>
                state.isLoading && state.reason === 'sending_message_to_bot'
            )
            expect(sendMessageState).toBeDefined()

            const finalState = loadingStates[loadingStates.length - 1]
            expect(finalState).toEqual({
                isLoading: false,
                reason: null
            })

            expect(resp.success).toBe(true)
            expect(resp.createdSession).toBe(true)
        }, 15000)

        it("should maintain loading state during message persistence", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Send first message to create session
            await chat.sendMessage({ content: "create session" })
            await new Promise(resolve => setTimeout(resolve, 100))
            loadingStates.length = 0 // Clear previous states

            // Send another message to test persistence
            await chat.sendMessage({ content: "test persistence" })
            await new Promise(resolve => setTimeout(resolve, 100))

            // Verify loading states for subsequent messages
            const sendMessageState = loadingStates.find(state =>
                state.isLoading && state.reason === 'sending_message_to_bot'
            )
            expect(sendMessageState).toBeDefined()

            const finalState = loadingStates[loadingStates.length - 1]
            expect(finalState).toEqual({
                isLoading: false,
                reason: null
            })
        }, 15000)

        it("should handle loading states during session restoration", async () => {
            const { chat, mockedStorage, config } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Create initial session
            await chat.sendMessage({ content: "create session" })
            await new Promise(resolve => setTimeout(resolve, 100))

            // Get the session storage key
            const sessionKey = `${config.getConfig().user.external_id}:${config.getConfig().token}:session`
            expect(mockedStorage.has(sessionKey)).toBe(true)

            // Clear chat state but keep storage
            await chat.clearSession()
            loadingStates.length = 0 // Clear previous states

            // Create new chat instance to test restoration
            const { chat: newChat } = initilize()

            // Wait for potential session restoration
            await new Promise(resolve => setTimeout(resolve, 100))

            // Send message to trigger potential session restoration
            const resp = await newChat.sendMessage({ content: "after restoration" })
            await new Promise(resolve => setTimeout(resolve, 100))

            expect(resp.createdSession).toBe(false) // Should use restored session
            const createSessionState = loadingStates.find(state =>
                state.isLoading && state.reason === 'creating_session'
            )
            expect(createSessionState).toBeUndefined()
        }, 15000)

        it("should handle loading states during cleanup", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Create session and send message
            await chat.sendMessage({ content: "test cleanup" })
            await new Promise(resolve => setTimeout(resolve, 100))
            loadingStates.length = 0 // Clear previous states

            // Perform cleanup
            await chat.cleanup(true)
            await new Promise(resolve => setTimeout(resolve, 100))

            // Verify final state
            const finalState = chat.chatState.getState().loading
            expect(finalState).toEqual({
                isLoading: false,
                reason: null
            })

            // Verify state was properly cleaned
            expect(chat.sessionState.getState()).toBeNull()
            expect(chat.chatState.getState().messages).toHaveLength(0)
        }, 15000)

        it("should handle loading states during concurrent operations", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Send multiple messages concurrently
            const messages = ["msg1", "msg2", "msg3"]
            await Promise.all(messages.map(content =>
                chat.sendMessage({ content })
            ))
            await new Promise(resolve => setTimeout(resolve, 100))

            // Verify loading states maintained consistency
            const finalLoadingState = chat.chatState.getState().loading
            expect(finalLoadingState.isLoading).toBe(false)
            expect(finalLoadingState.reason).toBe(null)

            // Verify no conflicting loading states
            const loadingConflicts = loadingStates.filter((state, index) =>
                index > 0 &&
                state.isLoading &&
                loadingStates[index - 1].isLoading &&
                state.reason !== loadingStates[index - 1].reason
            )
            expect(loadingConflicts).toHaveLength(0)
        }, 15000)

        it("should maintain correct loading states during error scenarios", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Force an error by sending an invalid message
            try {
                await chat.sendMessage({ content: "" })
            } catch (error) {
                // Verify loading state was reset after error
                expect(chat.chatState.getState().loading).toEqual({
                    isLoading: false,
                    reason: null
                })
            }

            // Verify no loading state was left hanging
            expect(loadingStates[loadingStates.length - 1]).toEqual({
                isLoading: false,
                reason: null
            })
        }, 15000)
    })
})