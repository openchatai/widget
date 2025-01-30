import React, { type ComponentType } from "react";
import type { AgentMessageType, BotMessageType } from "../../../headless/core";
import { useWidget } from "../../../headless/react";
import { BotOrAgentTextResponse } from "./BotOrAgentTextResponse";

interface Props {
  message: BotMessageType | AgentMessageType;
}

export function BotOrAgentMessage({ message }: Props) {
  const { componentStore } = useWidget();

  // Try to use custom components first
  if (message.data.action) {
    const Component = componentStore.getComponent(message.data.action.name);
    if (Component) {
      return <Component {...message} id={message.id} />;
    }
  }

  const Component = componentStore.getComponent(message.component);

  if (!Component) {
    // Fallback... just in case
    return <BotOrAgentTextResponse {...message} />;
  }

  return <Component {...message} id={message.id} />;
}
