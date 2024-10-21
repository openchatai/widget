import { useConfigData } from "@lib/providers/ConfigProvider";
import { ComponentRegistry } from "@lib/providers/componentRegistry";
import { BotMessageType } from "@lib/types";
import { ComponentType, useMemo } from "react";

export function BotMessage({
  message,
}: {
  message: BotMessageType;
}) {
  const config = useConfigData();

  const component = config.components?.getComponent(message.component, config.debug);

  if (!component) {
    return null;
  }

  const Component = component as ComponentType<{
    data: BotMessageType["data"];
    id: string;
  }>;

  return (
    <Component
      {...message}
      data={message.data ?? {}}
      id={message.id}
      key={message.id}
    />
  );
}
