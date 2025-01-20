import { UserMessageGroup } from "src/designs/react/components/UserMessageGroup";
import React, { ComponentType, useEffect, useMemo, useRef } from "react";
import { BotOrAgentMessage } from "src/designs/react/components/BotOrAgentMessage";
import { BotOrAgentMessageGroup } from "src/designs/react/components/BotOrAgentMessageGroup";
import { BotOrAgentMessageWrapper } from "src/designs/react/components/BotOrAgentMessageWrapper";
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from "../../utils/group-messages-by-type";
import {
  useWidget,
  useMessages,
  useConfig,
  useIsAwaitingBotReply,
} from "src/headless/react";

export function ChatMain() {
  const {
    messages: { messages },
  } = useMessages();
  const { isAwaitingBotReply } = useIsAwaitingBotReply();
  const { componentStore } = useWidget();
  const config = useConfig();
  const groupedMessages = useMemo(
    () => groupMessagesByType(messages),
    [messages.length],
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
  }, [messages]);

  const noMessages = messages.length === 0;

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
      {isAwaitingBotReply && <LoadingComponent />}
    </div>
  );
}
