import React from "react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat, useConfigData, WidgetOptions } from "@react/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { TooltipProvider } from "@ui/tooltip";
import { Toaster } from "react-hot-toast";
import { InfoIcon, BadgeInfo, CheckCircle2Icon } from "lucide-react";
import { WidgetRoot as OriginalRoot } from "@react/index";
import {
  BotTextResponse,
  BotMessage,
  FallbackComponent,
  BotLoadingComponent,
} from "src/@components";

function WidgetToaster() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        position: "absolute",
        top: "0",
        maxHeight: "50%",
        overflow: "hidden",
      }}
      toastOptions={{
        position: "top-center",
        blank: {
          className:
            "text-primary-foreground bg-background text-xs max-w-[200px] p-2 font-medium rounded-lg border flex items-center gap-1 w-full",
          icon: (
            <BadgeInfo className="size-5 shrink-0 text-primary-foreground" />
          ),
        },
        success: {
          icon: (
            <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600" />
          ),
          className:
            "text-emerald-700 bg-background text-xs p-2 max-w-[200px] font-medium rounded-lg border flex items-center gap-1 w-full",
        },
        error: {
          icon: <InfoIcon className="size-5 shrink-0 text-rose-600" />,
          className:
            "text-red-700 bg-background text-xs max-w-[200px] p-2 font-medium rounded-lg border flex items-center gap-1 w-full",
        },
      }}
    />
  );
}

const Widget = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, _ref) => {
    const chat = useChat();
    const { theme } = useConfigData();

    return (
      <TooltipProvider>
        <div
          style={{
            display: "contents",
            ...cssVars(
              { primary: theme.primaryColor },
              { triggerOffset: theme.triggerOffset },
            ),
          }}
          data-chat-widget
        >
          <div
            {...props}
            ref={_ref}
            data-version={chat.version}
            data-chat-widget
            className={cn(
              "rounded-xl size-full overflow-hidden isolate relative text-secondary-foreground",
              className,
            )}
          >
            <div className="size-full absolute antialiased font-inter">
              <ChatScreen />
            </div>
            <WidgetToaster />
          </div>
        </div>
      </TooltipProvider>
    );
  },
);

function WidgetRoot({
  children,
  options,
}: { children?: React.ReactNode; options: WidgetOptions }) {
  return (
    <OriginalRoot
      options={{
        ...options,
        components: [
          {
            key: "LOADING",
            component: BotLoadingComponent,
          },
          {
            key: "FALLBACK",
            component: FallbackComponent,
          },
          {
            key: "TEXT",
            component: BotTextResponse,
          },
        ],
      }}
    >
      {children}
    </OriginalRoot>
  );
}

Widget.displayName = "Widget";

export { Widget, WidgetRoot, BotTextResponse, BotMessage };
