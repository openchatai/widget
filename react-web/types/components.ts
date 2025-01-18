import React from "react";
import type { BotMessageType } from "core/types/messages";
import { StringOrLiteral } from "core/types";

export type ComponentProps<TData> = BotMessageType<TData>;
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
  ComponentProps<DefaultTextComponentBaseProps>;