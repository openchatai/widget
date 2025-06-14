import React, { useEffect, useMemo, useRef } from 'react';
import {
  OpenCxComponentName,
  type LiteralWidgetComponentKey,
  type SafeExtract,
} from '../../../../headless/core';
import {
  useConfig,
  useIsAwaitingBotReply,
  useMessages,
  useWidget,
} from '../../../../headless/react';
import { BotOrAgentMessage } from '../../components/BotOrAgentMessage';
import { BotOrAgentMessageGroup } from '../../components/BotOrAgentMessageGroup';
import { UserMessageGroup } from '../../components/UserMessageGroup';
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from '../../utils/group-messages-by-type';

export function ChatMain() {
  const {
    messagesState: { messages },
  } = useMessages();
  const { isAwaitingBotReply } = useIsAwaitingBotReply();
  const { componentStore } = useWidget();
  const config = useConfig();

  const groupedMessages = useMemo(
    () => groupMessagesByType(messages),
    [messages],
  );

  const initialMessages =
    !config.initialMessages || config.initialMessages.length === 0
      ? ['Hello, how can I help you?']
      : config.initialMessages;

  const LoadingComponent = componentStore.getComponent(
    'loading' satisfies SafeExtract<LiteralWidgetComponentKey, 'loading'>,
  );

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
      data-component={OpenCxComponentName['chat-screen__messages-container']}
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 p-2 space-y-2 overflow-auto"
    >
      {messages.length === 0 &&
        initialMessages.map((message) => (
          <BotOrAgentMessage
            key={message}
            component="bot_message"
            data={{ message }}
            id={message}
            type="FROM_BOT"
            agent={
              config.bot
                ? {
                    ...config.bot,
                    isAi: true,
                    id: null,
                  }
                : undefined
            }
            timestamp={Date.now().toString()}
          />
        ))}
      {groupedMessages.map((group) => {
        const type = group?.[0]?.type;
        const firstIdInGroup = group[0]?.id;
        if (!type || !firstIdInGroup) return null;

        if (isUserMessageGroup(group)) {
          return <UserMessageGroup key={firstIdInGroup} messages={group} />;
        }

        if (isBotMessageGroup(group) || isAgentMessageGroup(group)) {
          const agent = group[0]?.agent;
          return (
            <BotOrAgentMessageGroup
              key={firstIdInGroup}
              messages={group}
              agent={agent}
            />
          );
        }

        return null;
      })}
      {isAwaitingBotReply && LoadingComponent && (
        <LoadingComponent agent={config.bot} />
      )}
    </div>
  );
}
