import React from "react";
import type { BotMessageType, StringOrLiteral } from "../../core";

export type WidgetComponentProps<TData> = BotMessageType<TData>;
export type WidgetLiteralComponentKey =
  | "bot_message"
  | "agent_message"
  | "loading"
  | "fallback";
export type WidgetComponentKey = StringOrLiteral<WidgetLiteralComponentKey>;
export type WidgetComponentType = {
  key: WidgetComponentKey;
  component: React.ElementType;
};

export type DefaultTextComponentBaseProps = {
  message: string;
  variant?: "default" | "error";
};

export type DefaultTextComponentProps =
  WidgetComponentProps<DefaultTextComponentBaseProps>;
