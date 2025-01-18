import React from "react";
import { expect, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { Widget, WidgetRoot } from "..";
import type { WidgetOptions } from "@react/types";
import styles from "../../../index.css?inline";

const mockConfig: WidgetOptions = {
    token: "test",
    theme: {
        primaryColor: "#1883FF",
        triggerOffset: "20px",
    },
    assets: {
        organizationLogo: "https://example.com/logo.png",
    },
    language: "en",
    collectUserData: true
};

describe('Widget Component Tests', () => {
    describe('Widget Initialization', () => {
        test("widget renders with default state", async () => {
            const { getByTestId } = render(
                <WidgetRoot options={mockConfig}>
                    <Widget />
                </WidgetRoot>
            );

            const trigger = getByTestId("widget-popover-trigger");
            await expect.element(trigger).toBeVisible();
            await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        test("chat screen shows initial messages", async () => {
            const initialMessages = ["How can I help?", "What's new?"];
            const { getByTestId } = render(
                <WidgetRoot options={{
                    ...mockConfig,
                    collectUserData: false,
                    initialMessages
                }}>
                    <Widget opened={true} />
                </WidgetRoot>
            );

            const messages = getByTestId("initial-messages");
            await expect.element(messages).toBeVisible();
            initialMessages.forEach(async (message) => {
                await expect.element(messages).toHaveTextContent(message);
            });
        });

        test("chat handles keyboard shortcuts", async () => {
            const { getByTestId } = render(
                <WidgetRoot options={{
                    ...mockConfig,
                    collectUserData: false,
                }}>
                    <Widget opened={true} />
                </WidgetRoot>
            );

            const input = getByTestId("chat-input");
            await expect.element(input).toBeVisible();

            // Test Enter to send
            await input.fill("Hello");
            input.element().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            // Test Esc to close
            input.element().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            await expect.element(input).not.toBeVisible();
        });

        test("handles session persistence", async () => {
            const { getByTestId } = render(
                <WidgetRoot options={{
                    ...mockConfig,
                    collectUserData: false,
                    user: {
                        email: "test@example.com",
                        external_id: "123"
                    },
                    settings: {
                        persistSession: true
                    }
                }}>
                    <Widget opened={true} />
                </WidgetRoot>
            );

            const chatContainer = getByTestId("chat-container");
            await expect.element(chatContainer).toBeVisible();
        });
    });
});


