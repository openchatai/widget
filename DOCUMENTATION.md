# Chat Widget Library Documentation

## Overview

This library provides a customizable chat widget that can be embedded into web applications. It includes components for displaying messages, handling user input, and managing chat sessions. The library is designed to be flexible and easy to integrate, with support for various customization options.

## Installation

To install the library, use the following command:

```bash
pnpm add @opencopilot/widget
```

## Usage

### Basic Setup

To use the chat widget, import the necessary components and include them in your application:

```javascript
import { Widget, WidgetRoot, WidgetPopover } from "@opencopilot/widget";
import "@opencopilot/widget/index.css";

<div data-chat-widget>
  <WidgetRoot options={widgetOptions}>
    <Widget />
  </WidgetRoot>
</div>
```

### Widget Options

The `WidgetRoot` component accepts a `options` prop that allows you to customize the widget. The available options are defined in the `WidgetOptions` type:

```typescript
type WidgetOptions = {
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
```

### Customizing the Widget

You can customize the appearance and behavior of the widget by modifying the CSS variables and passing custom components.

#### CSS Variables

To change the colors of the widget, you can define CSS variables in the parent container:

```css
[data-chat-widget] {
  --primary: 211_65%_59%;
  --foreground: 0_0%_0%;
  --background: 0_0%_100%;
  --secondary: 0_0%_96%;
  --primary-foreground: 217_72%_18%;
  --accent: 0_0_22%;
}
```

#### Custom Components

You can provide custom components for different parts of the widget by passing them in the `components` option. For example, to use a custom text component:

```typescript
import { DefaultTextComponentProps } from "@lib/@components";

const customComponents = [
  {
    key: "TEXT",
    component: CustomTextComponent,
  },
];

const widgetOptions = {
  token: "your-token",
  initialMessage: ["Hello! How can I help you?"],
  components: customComponents,
};
```

### Example: ChatScreen Component

The `ChatScreen` component is a key part of the widget, responsible for rendering the chat interface. Here is an example of how it is implemented:

```typescript
import { UserMessage } from "../components/messages";
import { useChat } from "../providers/ChatProvider";
import { useConfigData } from "../providers/ConfigDataProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleDashed,
  RotateCcw,
  SendHorizonal,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import {
  ComponentType,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import { BotMessage } from "@lib/@components/BotMessage";
import { ComponentRegistry } from "@lib/providers/componentRegistry";
import { Switch } from "@lib/components/switch";
import {
  TooltipProvider,
} from "@lib/components/tooltip";
import { DefaultTextComponentProps } from "@lib/@components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@lib/components/dialog";

import HeroImage from "../static/hero-image.png";

function ChatFooter() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, info, hookState } = useChat();
  const layoutId = useId();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  function handleInputSubmit() {
    if (input.trim() === "") {
      return;
    }
    sendMessage({
      content: {
        text: input,
      },
    });
    setInput("");
  }

  return (
    <div className="p2 rounded-lg relative">
      <div className="relative w-full top-0 overflow-hidden h5 px-1">
        <AnimatePresence>
          {info && (
            <motion.div
              key={info.toString()}
              className="absolute w-full text-xs text-accent/60"
              layoutId={layoutId}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: "-100%" }}
              initial={{ opacity: 0, translateY: "-100%" }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              style={{ top: 0 }}
            >
              {info}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 border px2 py1.5 rounded-lg" style={{
        background: "#FFFFFF",
        border: "1px solid rgba(19, 34, 68, 0.08)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.04)",
        borderRadius: "8px"
      }}>
        <input
          ref={inputRef}
          disabled={hookState === "loading"}
          value={input}
          className="flex-1 outline-none p1 text-accent text-sm bg-transparent !placeholder-text-sm placeholder-font-100 placeholder:text-primary-foreground/50"
          onChange={handleInputChange}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleInputSubmit();
            }
          }}
          placeholder="Write a message..."
        />
        <div>
          <button
            onClick={handleInputSubmit}
            disabled={hookState === "loading"}
            className="rounded-lg p1.5 text-white bg-primary shrink-0 disabled:opacity-50"
            style={{
              background: "#1883FF",
              border: "1px solid rgba(19, 34, 68, 0.08)"
            }}
          >
            {hookState === "loading" ? (
              <CircleDashed className="size-3.5 animate-spin animate-iteration-infinite" />
            ) : (
              <SendHorizonal className="size-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatScreen() {
  const {
    initialData,
    state,
    sendMessage,
    noMessages,
    hookState,
    events: chatEvents,
  } = useChat();
  const config = useConfigData();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const loading = hookState === "loading";

  function handleNewMessage() {
    setTimeout(() => {
      const container_ = messagesContainerRef.current;
      if (container_) {
        container_.scrollTop = container_.scrollHeight;
      }
    }, 0);
  }

  useEffect(() => {
    chatEvents.addEventListener("message", handleNewMessage);
    chatEvents.addEventListener("new_message", handleNewMessage);
    return () => {
      chatEvents.removeEventListener("new_message", handleNewMessage);
      chatEvents.removeEventListener("message", handleNewMessage);
    };
  }, [chatEvents]);

  const components = useMemo(
    () =>
      new ComponentRegistry({
        components: config.components,
      }),
    [config]
  );

  const LoadingComponent = components.getComponent(
    "loading",
    config.debug
  ) as ComponentType;

  const DefaultTextComponent = components.getComponent(
    "TEXT",
    config.debug
  ) as React.ComponentType<DefaultTextComponentProps>;

  return (
    <TooltipProvider>
      <div className="size-full flex flex-col overflow-hidden bg-background z-10 origin-b absolute bottom-0 inset-x-0">
        <div className="w-full overflow-hidden mesh-gradient h-full justify-between rounded-t-xl flex flex-col relative overflow-auto" style={{
          background: "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.12)",
          borderRadius: "16px"
        }}>

          {noMessages ? <HeaderChatDidNotStart /> : <HeaderChatRunning />}



          <div className="flex flex-col w-full flex-1 bg-background rounded-t-xl shadow" style={{
            background: "#FAFBFB",
            boxShadow: "0px -8px 20px rgba(0, 0, 0, 0.12)",
            borderRadius: " 16px 16px 0px 0px"
          }}>
            <div
              data-messages
              ref={messagesContainerRef}
              className="max-h-full scroll-smooth relative flex-1 py4 px3 space-y-3 overflow-auto"
            >
              {config.initialMessage?.map((message, index) => (
                <BotResponseWrapper bot={config.bot} key={index}>
                  <DefaultTextComponent
                    component="TEXT"
                    data={{ message }}
                    id={`${index}`}
                    responseFor={null}
                    type="FROM_BOT"
                    serverId={null}
                  />
                </BotResponseWrapper>
              )) ?? <BotResponseWrapper bot={config.bot}>
                  <DefaultTextComponent
                    component="TEXT"
                    data={{ message: "Hello, how can I help?" }}
                    id="123"
                    responseFor={null}
                    type="FROM_BOT"
                    serverId={null}
                  />
                </BotResponseWrapper>}
              {state.messages.map((message, i) => {
                if (message.type === "FROM_USER") {
                  return (
                    <UserMessage key={i} user={config.user}>
                      {message.content}
                    </UserMessage>
                  );
                } else if (message.type === "FROM_BOT") {
                  return (
                    <BotResponseWrapper bot={message.bot}>
                      <BotMessage message={message} index={i} key={i} />
                    </BotResponseWrapper>
                  );
                }
                return null;
              })}

              {loading && <LoadingComponent />}
            </div>

            <footer>
              {noMessages && (
                <div className="items-center justify-end mb3 gap-1 flex-wrap">
                  {initialData.data?.initial_questions?.map((iq) => (
                    <button
                      className="px2 py1.5 border whitespace-nowrap rounded-lg text-sm font-300"
                      onClick={() => {
                        sendMessage({
                          content: { text: iq },
                          headers: config.headers,
                          query_params: config.queryParams,
                          user: config.user,
                        });
                      }}
                    >
                      {iq}
                    </button>
                  ))}
                </div>
              )}
              <ChatFooter />
            </footer>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Conclusion

This documentation provides an overview of the chat widget library, including installation instructions, usage examples, and customization options. For more detailed information, refer to the source code and comments within the library.
