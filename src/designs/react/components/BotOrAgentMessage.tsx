import React from "react";
import { useWidget, type WidgetComponentProps } from "../../../headless/react";
import { BotOrAgentTextResponse } from "./BotOrAgentTextResponse";

export function BotOrAgentMessage(props: WidgetComponentProps) {
  const { componentStore } = useWidget();

  // Try to use custom components first
  if (props.data.action) {
    const Component = componentStore.getComponent(props.data.action.name);
    if (Component) {
      return <Component {...props} id={props.id} />;
    }
  }

  const Component = componentStore.getComponent(props.component);

  if (!Component) {
    // Fallback... just in case
    return <BotOrAgentTextResponse {...props} />;
  }

  return <Component {...props} id={props.id} />;
}
