import React, { type ComponentType } from "react";
import type { AgentMessageType, BotMessageType } from "../../../headless/core";
import { useWidget } from "../../../headless/react";

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

  if (!Wrapper) {
    return (
      <div data-test={`message-${message.id}`}>
        <Component {...message} id={message.id} key={message.id} />
      </div>
    );
  }

  return (
    // @ts-ignore
    <Wrapper
      {...wrapperProps}
      key={message.id}
      data-test={`message-wrapper-${message.id}`}
    >
      <Component {...message} id={message.id} />
    </Wrapper>
  );
}
