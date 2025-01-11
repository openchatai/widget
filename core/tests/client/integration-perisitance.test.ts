import { ApiCaller, createChat, createConfig } from "@core/client";
import { Platform } from "@core/platform";
import { LoadingState } from "@core/types";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { getTestUser } from "../test-utils";

describe("integration testing with storage and persistence", () => {
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
                return true
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

    function initilize() {
        const chat = createChat({ api: apis, config: config, platform })
        return {
            chat,
            config
        }
    }

    describe("loading states during persistence operations", () => {
        it("should set correct loading states during session creation", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

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
        }, 30000)

        it("should maintain loading state during message persistence", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Send first message to create session and wait for it to complete
            const initialResp = await chat.sendMessage({ content: "create session" })
            expect(initialResp.success).toBe(true)
            await new Promise(resolve => setTimeout(resolve, 500))
            loadingStates.length = 0 // Clear previous states

            // Send another message to test persistence
            const resp = await chat.sendMessage({ content: "test persistence" })
            expect(resp.success).toBe(true)
            await new Promise(resolve => setTimeout(resolve, 500))

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
        }, 30000)

        it("should handle loading states during cleanup", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Create session and send message
            const resp = await chat.sendMessage({ content: "test cleanup" })
            expect(resp.success).toBe(true)
            await new Promise(resolve => setTimeout(resolve, 500))
            loadingStates.length = 0 // Clear previous states

            // Perform cleanup and wait for it to complete
            await chat.cleanup(true)
            await new Promise(resolve => setTimeout(resolve, 500))

            // Verify final state
            const finalState = chat.chatState.getState()
            expect(finalState.loading).toEqual({
                isLoading: false,
                reason: null
            })
            expect(finalState.messages).toHaveLength(0)

            // Verify session was cleaned up
            expect(chat.sessionState.getState()).toBeNull()
        }, 30000)

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
        }, 30000)

        it("should maintain correct loading states during error scenarios", async () => {
            const { chat } = initilize()
            const loadingStates: LoadingState[] = []

            chat.chatState.subscribe((state) => {
                loadingStates.push({ ...state.loading })
            })

            // Force an error by sending an invalid message
            try {
                await chat.sendMessage({ content: "" })
            } catch {
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
        }, 30000)
    })
})