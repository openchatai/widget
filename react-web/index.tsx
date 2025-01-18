import "./../src/index.css";

// Core exports
export { ChatProvider, useChat } from "./core-integration/ChatProvider";

// Hooks exports
export {
  useChatState,
  useChatSession,
  useConfig,
  usePreludeData,
  useLocale,
  useContact,
  type FileWithProgress,
  useUploadFiles,
} from "./core-integration/hooks";

// Types exports
export type { CoreOptions } from "core/types";
export type { WidgetOptions } from "./types/options";
