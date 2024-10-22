import { useConfigData } from "@lib/providers/ConfigDataProvider";
import { BotMessageType } from "@lib/types";
import React, { ComponentType } from "react";

interface BotMessageProps<W extends React.ElementType> {
  message: BotMessageType;
  Wrapper?: W;
  wrapperProps?: Omit<React.ComponentProps<W>, "children">;
}

export function BotMessage<W extends React.ElementType>({
  message,
  Wrapper,
  wrapperProps,
}: BotMessageProps<W>) {
  const config = useConfigData();

  const component = config.componentStore.getComponent(
    message.component,
    config.debug
  );

  if (!component) {
    return null;
  }

  const Component = component as ComponentType<{
    data: BotMessageType["data"];
    id: string;
  }>;

  if (!Wrapper) {
    return <Component data={message.data} id={message.id} key={message.id} />;
  }

  return (
    // @ts-ignore
    <Wrapper {...wrapperProps}>
      <Component data={message.data} id={message.id} key={message.id} />
    </Wrapper>
  );
}
