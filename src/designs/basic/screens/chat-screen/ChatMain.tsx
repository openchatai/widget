import { useChat, useConfigData } from "@react/index";
import { UserMessage } from "@ui/userMessage";
import React, { ComponentType, useEffect, useRef } from "react";
import { BotMessage } from "src/@components/BotMessage";
import { BotResponseWrapper } from "src/@components/BotMessageWrapper";

export function ChatMain() {
  const { state, hookState, session } = useChat();
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
              wrapperProps={{
                agent: message.agent,
                messageId: message.id,
                sessionId: session?.id,
              }}
            />
          );
        }
        return null;
      })}
      {hookState.state === "loading" && <LoadingComponent />}
    </div>
  );
}
