import React, { type ComponentType, useEffect, useMemo, useRef } from "react";
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from "../../utils/group-messages-by-type";
import {
  useConfig,
  useIsAwaitingBotReply,
  useMessages,
  useWidget,
} from "../../../../headless/react";
import { BotOrAgentMessage } from "../../components/BotOrAgentMessage";
import { UserMessageGroup } from "../../components/UserMessageGroup";
import { BotOrAgentMessageGroup } from "../../components/BotOrAgentMessageGroup";

export function ChatMain() {
  const {
    messagesState: { messages },
  } = useMessages();
  const { isAwaitingBotReply } = useIsAwaitingBotReply();
  const { componentStore } = useWidget();
  const config = useConfig();
  const groupedMessages = useMemo(
    () => groupMessagesByType(messages),
    [messages.length],
  );

  const initialMessages =
    !config.initialMessages || config.initialMessages.length === 0
      ? ["Hello, how can I help you?"]
      : config.initialMessages;

  const LoadingComponent = componentStore.getComponent(
    "loading",
  ) as ComponentType;

  /* ------------------------------------------------------ */
  /*                      Auto Scroller                     */
  /* ------------------------------------------------------ */
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

  return (
    <div
      // Do not add `dir` attribute here... contact messages are always on the right, bot and agent are always on the left for all languages
      data-messages
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 p-2 space-y-2 overflow-auto"
    >
      {messages.length === 0 &&
        initialMessages.map((message, index) => (
          <BotOrAgentMessage
            key={`${message}-${index}`}
            component="bot_message"
            data={{ message }}
            id={`initial-${index}`}
            type="FROM_BOT"
            agent={config.bot}
            timestamp={Date.now().toString()}
          />
        ))}
      {groupedMessages.map((group, index) => {
        const type = group?.[0]?.type;
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
