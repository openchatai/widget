import "./../src/index.css";

export {
  WidgetProvider,
  useWidget,
} from "./core-integration/WidgetProvider";

export {
  useMessages,
  useSession,
  useConfig,
  usePreludeData,
  useLocale,
  useContact,
  type FileWithProgress,
  useUploadFiles,
} from "./core-integration/hooks";

export type { WidgetConfig } from "core/types";
