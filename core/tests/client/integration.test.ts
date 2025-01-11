import { ApiCaller, createChat, createConfig } from "@core/client";
import { SendMessageInput } from "@core/client/chat";
import { createLogger, Platform } from "@core/platform";
import { v4 } from "uuid";
import { describe, expect, it, vi } from "vitest";

function initilize() {
    const openToken = "fe8f11971f5de916ab745d9c0408c7ef";
    const mockedStorage = new Map()

    const platform: Platform = {
        env: {
            platform: "test"
        },
        logger: createLogger(),
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
        user: {
            email: "fa7lawy@fa7la.com",
        }
    })

    const apis = new ApiCaller({
        config: config.getConfig()
    })

    const chat = createChat({ api: apis, config: config, platform })

    return {
        apis,
        chat
    }
}

describe("web integration tests", () => {
    it("should get the preluade data correctly", async () => {
        const { apis } = initilize()
        const preludeData = await apis.widgetPrelude();
        expect(preludeData).toBeDefined()
    })

    it("should process the message correctly of a fresh session", async () => {
        const { apis, chat } = initilize()
        const subscriber = vi.fn()
        expect(chat.chatState.getState()).toBeDefined()
        expect(chat.chatState.getState().messages)

        chat.chatState.subscribe(subscriber)

        const userMessage = <SendMessageInput>{
            content: "Hello",
            uuid: v4()
        }

        const resp = await chat.sendMessage(userMessage)

    }, 30000)
})