import { BotMessage } from "src/@components/BotMessage";
import { BotResponseWrapper } from "src/@components/BotMessageWrapper";
import { useChat, useConfigData } from "@react/index";
import React, { ComponentType, useEffect, useRef } from "react";
import { UserMessage } from "@ui/userMessage";
import { Keyboard } from "@ui/keyboard";
import { ChatHeader } from "./ChatHeader";
import { SessionClosedDialog } from "./SessionClosedDialog";
import { usePreludeData } from "@react/providers/usePreludeData";
import { ChatFooter } from "./ChatFooter";
import { useWidgetContentHeight } from "@react/hooks";
import { cn } from "src/utils";
import { Button } from "@ui/button";
import {
  DEFAULT_STYLES,
  WIDGET_CONTENT_MAX_HEIGHT_PX,
} from "src/designs/constants";

function ChatRenderer() {
  const { state, hookState } = useChat();
  const { componentStore, initialMessages, ...config } = useConfigData();

  const LoadingComponent = componentStore.getComponent(
    "loading",
  ) as ComponentType;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  function handleNewMessage() {
    setTimeout(() => {
      const container_ = messagesContainerRef.current;
      if (container_) {
        container_.scrollTop = container_.scrollHeight;
      }
    }, 0);
  }

  useEffect(() => {
    handleNewMessage();
  }, [state.messages]);

  return (
    <div
      data-messages
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto"
    >
      {state.messages.length === 0 &&
        (initialMessages?.map((message, index) => (
          <BotMessage
            key={index}
            message={{
              component: "text",
              data: { message },
              id: `initial-${index}`,
              type: "FROM_BOT",
            }}
            Wrapper={BotResponseWrapper}
            wrapperProps={{ agent: config.bot }}
          />
        )) ?? (
            <BotMessage
              key={"default-welcome"}
              message={{
                component: "text",
                data: { message: "Hello, how can I help?" },
                id: "default-welcome",
                type: "FROM_BOT",
                agent: config.bot,
              }}
              Wrapper={BotResponseWrapper}
              wrapperProps={{ agent: config.bot }}
            />
          ))}
      {state.messages.map((message) => {
        if (message.type === "FROM_USER") {
          return (
            <UserMessage key={message.id} message={message} user={config.user}>
              {message.content}
            </UserMessage>
          );
        } else if (message.type === "FROM_BOT") {
          if (message.component == "CHAT_EVENT") {
            return <BotMessage message={message} key={message.id} />;
          }
          return (
            <BotMessage
              key={message.id}
              message={message}
              Wrapper={BotResponseWrapper}
              wrapperProps={{ agent: message.agent }}
            />
          );
        }
        return null;
      })}
      {hookState.state === "loading" && <LoadingComponent />}
    </div>
  );
}

export function ChatScreen() {
  const { state, sendMessage, noMessages, handleKeyboard } = useChat();
  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.initial_questions;
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  return (
    <div
      ref={observedElementRef}
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0",
      )}
    >
      <div
        className="w-full h-full justify-between flex flex-col relative"
        style={{
          background:
            "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
        }}
      >
        <ChatHeader />
        <div className="flex bg-background shadow-lg flex-col w-full flex-1 overflow-auto">
          <ChatRenderer />
          <footer>
            {state.keyboard && (
              <Keyboard
                options={state.keyboard.options}
                onKeyboardClick={handleKeyboard}
              />
            )}

            {noMessages && initialQuestions && (
              <div className="flex items-center flex-row justify-end gap-2 flex-wrap px-2">
                {initialQuestions?.map((iq, index) => (
                  <Button
                    key={index}
                    dir="auto"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      sendMessage({
                        content: { text: iq },
                      });
                    }}
                  >
                    {iq}
                  </Button>
                ))}
              </div>
            )}

            <ChatFooter />
          </footer>
        </div>
      </div>
      <SessionClosedDialog />
    </div>
  );
}
