import { ComponentProps } from "./components";
export * from "./options";
export * from "./components";

export type DefaultTextComponentProps = ComponentProps<{
  message: string;
  variant?: "default" | "error";
}>;
