import type { AgentMessageType, BotMessageType } from "@core/types";
import { useChat } from "@react/core-integration";
import React, { type ComponentType } from "react";

interface BotMessageProps<W extends React.ElementType> {
  message: BotMessageType | AgentMessageType;
  Wrapper?: W;
  wrapperProps?: Omit<React.ComponentProps<W>, "children">;
}

export function BotOrAgentMessage<W extends React.ElementType>({
  message,
  Wrapper,
  wrapperProps,
}: BotMessageProps<W>) {
  const { componentStore, config } = useChat();
  const debug = config.getDebugMode();
  const Component = componentStore.getComponent(
    message.component,
    debug,
  ) as ComponentType<{
    data: BotMessageType["data"] | AgentMessageType["data"];
    id: string;
  }>;

  if (!Component) {
    return null;
  }

  if (!Wrapper) {
    return <Component {...message} id={message.id} key={message.id} />;
  }

  return (
    // @ts-ignore
    <Wrapper {...wrapperProps} key={message.id}>
      <Component {...message} id={message.id} />
    </Wrapper>
  );
}
