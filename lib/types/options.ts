import type { ComponentType, HandoffPayloadType } from ".";
import type { LangType } from "@lib/locales";

export type WidgetOptions = {
  token: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  initialMessage: string[];
  triggerSelector?: string;
  apiUrl?: string;
  socketUrl?: string;
  defaultOpen?: boolean;
  debug?: boolean;
  language?: LangType;
  warnBeforeClose?: boolean;
  onClose?: () => void;
  organizationName?: string;
  onHandoff?: (handout: HandoffPayloadType) => void;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, string>;
    avatarUrl?: string;
  };
  bot?: {
    name?: string;
    avatarUrl?: string;
  };
  components?: ComponentType[];
};
