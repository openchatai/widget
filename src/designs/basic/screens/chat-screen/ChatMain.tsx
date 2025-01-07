import { useChat, useConfigData } from "@react/index";
import { UserMessageGroup } from "@ui/UserMessageGroup";
import React, { ComponentType, useEffect, useMemo, useRef } from "react";
import { BotOrAgentMessage } from "src/@components/BotOrAgentMessage";
import { BotOrAgentMessageGroup } from "src/@components/BotOrAgentMessageGroup";
import { BotOrAgentMessageWrapper } from "src/@components/BotOrAgentMessageWrapper";
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from "../../utils/group-messages-by-type";

export function ChatMain() {
  const { state, hookState, session } = useChat();
  const { componentStore, initialMessages, ...config } = useConfigData();

  const groupedMessages = useMemo(
    () => groupMessagesByType(state.messages),
    [state.messages.length],
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
  }, [state.messages]);

  return (
    <div
      data-messages
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 p-2 space-y-2 overflow-auto"
    >
      {state.messages.length === 0 &&
        (initialMessages?.map((message, index) => (
          <BotOrAgentMessage
            key={index}
            message={{
              component: "text",
              data: { message },
              id: `initial-${index}`,
              type: "FROM_BOT",
              timestamp: Date.now().toString(),
            }}
            Wrapper={BotOrAgentMessageWrapper}
            wrapperProps={{ agent: config.bot }}
          />
        )) ?? (
          <BotOrAgentMessage
            key={"default-welcome"}
            message={{
              component: "text",
              data: { message: "Hello, how can I help?" },
              id: "default-welcome",
              type: "FROM_BOT",
              agent: config.bot,
              timestamp: Date.now().toString(),
            }}
            Wrapper={BotOrAgentMessageWrapper}
            wrapperProps={{ agent: config.bot }}
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
      {hookState.state === "loading" && <LoadingComponent />}
    </div>
  );
}
