import React from "react";
import type { BotMessageType } from "@core/types/messages";

export type ComponentProps<TData> = BotMessageType<TData>;

export type ComponentType = {
  key: string;
  component: React.ElementType;
};

export type OptionsType = {
  components?: ComponentType[];
};
