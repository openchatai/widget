import "./../src/index.css";

export { ChatProvider, useChat } from "./core-integration/ChatProvider";

export {
  useChatState,
  useSession as useChatSession,
  useConfig,
  usePreludeData,
  useLocale,
  useContact,
  type FileWithProgress,
  useUploadFiles,
} from "./core-integration/hooks";

export type { WidgetConfig } from "core/types";
