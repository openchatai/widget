import { UserMessageGroup } from "src/components/UserMessageGroup";
import React, { ComponentType, useEffect, useMemo, useRef } from "react";
import { BotOrAgentMessage } from "src/components/BotOrAgentMessage";
import { BotOrAgentMessageGroup } from "src/components/BotOrAgentMessageGroup";
import { BotOrAgentMessageWrapper } from "src/components/BotOrAgentMessageWrapper";
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from "../../utils/group-messages-by-type";
import { useChat, useChatState, useConfig } from "react-web/core-integration";

export function ChatMain() {
  const { chatState, chat } = useChatState();
  const { componentStore } = useChat();
  const config = useConfig();
  const groupedMessages = useMemo(
    () => groupMessagesByType(chatState.messages),
    [chatState.messages.length],
  );

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
  }, [chatState.messages]);

  const noMessages = chatState.messages.length === 0;

  return (
    <div
      data-messages
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 p-2 space-y-2 overflow-auto"
    >
      {noMessages &&
        (config.initialMessages?.map((message, index) => (
          <BotOrAgentMessage
            key={index}
            message={{
              component: "bot_message",
              data: { message },
              id: `initial-${index}`,
              type: "FROM_BOT",
              timestamp: Date.now().toString(),
            }}
            Wrapper={BotOrAgentMessageWrapper}
          />
        )) ?? (
          <BotOrAgentMessage
            key={"default-welcome"}
            message={{
              component: "bot_message",
              data: { message: "Hello, how can I help?" },
              id: "default-welcome",
              type: "FROM_BOT",
              agent: config.bot,
              timestamp: Date.now().toString(),
            }}
            Wrapper={BotOrAgentMessageWrapper}
          />
        ))}
      {groupedMessages.map((group, index) => {
        const type = group?.[0].type;
        if (!type) return null;

        if (isUserMessageGroup(group)) {
          return <UserMessageGroup key={index} messages={group} />;
        }

        if (isBotMessageGroup(group) || isAgentMessageGroup(group)) {
          const agent = group[0]?.agent;
          return (
            <BotOrAgentMessageGroup
              key={index}
              messages={group}
              agent={agent}
            />
          );
        }

        return null;
      })}
      {chatState.loading.isLoading &&
        chatState.loading.reason === "sending_message_to_bot" && (
          <LoadingComponent />
        )}
    </div>
  );
}
