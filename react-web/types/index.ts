import { ComponentProps } from "./components";
export * from "./options";
export * from "./components";

export type DefaultTextComponentBaseProps = {
  message: string;
  variant?: "default" | "error";
}

export type DefaultTextComponentProps = ComponentProps<DefaultTextComponentBaseProps>;
