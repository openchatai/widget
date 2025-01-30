import React, { type ComponentType } from "react";
import type { AgentMessageType, BotMessageType } from "../../../headless/core";
import { useWidget } from "../../../headless/react";
import { useDocumentDir } from "../../../headless/react/hooks/useDocumentDir";

interface BotMessageProps {
  message: BotMessageType | AgentMessageType;
}

export function BotOrAgentMessage({ message }: BotMessageProps) {
  const { componentStore } = useWidget();
  const Component = componentStore.getComponent(
    message.component,
    false,
  ) as ComponentType<{
    data: BotMessageType["data"] | AgentMessageType["data"];
    id: string;
  }>;

  if (!Component) {
    return null;
  }

  return <Component {...message} id={message.id} />;
}
