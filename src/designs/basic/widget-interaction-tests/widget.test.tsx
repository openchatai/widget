import React from "react";
import { expect, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { Widget, WidgetRoot } from "..";
import type { WidgetOptions } from "react-web/types";
import { userEvent } from "@vitest/browser/context";

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
  collectUserData: true,
};

describe("Widget Component Tests", () => {
  describe("Widget Initialization", () => {
    test("toggle widget", async () => {
      const { getByTestId } = render(
        <WidgetRoot options={mockConfig}>
          <Widget />
        </WidgetRoot>,
      );
      const trigger = getByTestId("widget-popover-trigger");
      await expect.element(trigger).toBeVisible();
      await userEvent.click(trigger);
      await expect
        .element(getByTestId("widget-popover-content"))
        .toHaveAttribute("data-aria-expanded", "true");
      await userEvent.click(trigger);
      await expect
        .element(getByTestId("widget-popover-content"))
        .toHaveAttribute("data-aria-expanded", "false");
    });
    test("widget renders with default state", async () => {
      const { getByTestId } = render(
        <WidgetRoot options={mockConfig}>
          <Widget />
        </WidgetRoot>,
      );

      const trigger = getByTestId("widget-popover-trigger");
      await expect.element(trigger).toBeVisible();
      await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
    });
    test("chat screen shows initial messages", async () => {
      const initialMessages = ["How can I help?", "What's new?"];
      const { getByTestId } = render(
        <WidgetRoot
          options={{
            ...mockConfig,
            collectUserData: false,
            initialMessages,
          }}
        >
          <Widget opened={true} />
        </WidgetRoot>,
      );

      const chatScreen = getByTestId("chat-screen");
      await expect.element(chatScreen).toBeVisible();

      const container = getByTestId("initial-questions-container");
      await expect.element(container).toBeVisible();
      initialMessages.forEach(async (message, index) => {
        const button = getByTestId(`initial-question-${index}`);
        await expect.element(button).toBeVisible();
        await expect.element(button).toHaveTextContent(message);
      });
    });
  });
});
