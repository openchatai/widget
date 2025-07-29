import React, { useEffect, useMemo, useRef } from 'react';
import {
  type BotMessageType,
  type LiteralWidgetComponentKey,
  type SafeExtract,
} from '../../../../headless/core';
import {
  useConfig,
  useIsAwaitingBotReply,
  useMessages,
  useWidget,
} from '../../../../headless/react';
import { BotOrAgentMessageGroup } from '../../components/BotOrAgentMessageGroup';
import { UserMessageGroup } from '../../components/UserMessageGroup';
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from '../../utils/group-messages-by-type';
import { BotOrAgentResponse } from '../../components/custom-components/BotOrAgentTextResponse.component';
import { cn } from '../../components/lib/utils/cn';
import { dc } from '../../utils/data-component';
import { run } from '../../../../headless/core/utils/run-catching';

export function ChatMain() {
  const {
    messagesState: { messages },
  } = useMessages();
  const { isAwaitingBotReply } = useIsAwaitingBotReply();
  const { componentStore } = useWidget();
  const config = useConfig();
  const { initialQuestions, initialQuestionsPosition } = config;

  const groupedMessages = useMemo(
    () => groupMessagesByType(messages),
    [messages],
  );

  const persistentInitialMessages = config.persistentInitialMessages || [];

  const advancedInitialMessages = run(() => {
    if (!messages.length) return config.advancedInitialMessages || [];
    return config.advancedInitialMessages?.filter((m) => !!m.persistent) || [];
  });

  const initialMessages = run(() => {
    if (advancedInitialMessages.length) return [];
    if (messages.length) return [];
    // TODO translate default welcome message
    if (!config.initialMessages?.length) return ['Hello, how can I help you?'];
    return config.initialMessages;
  });

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
      {...dc('chat/msgs/root')}
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 py-2 px-4 flex flex-col gap-2 overflow-auto"
    >
      <div {...dc('chat/persistent_initial_msgs/root')}>
        {persistentInitialMessages.map((message, index, array) => (
          <BotOrAgentResponse
            key={`${message}-${index}`}
            component="bot_message"
            data={{ message }}
            id={message}
            type="FROM_BOT"
            timestamp={Date.now().toString()}
            dataComponentNames={{
              messageContainer: 'chat/persistent_initial_msg/root',
              message: 'chat/persistent_initial_msg/msg',
            }}
            classNames={{
              messageContainer: cn(
                'w-full flex flex-col items-center text-center',
              ),
              message: 'w-full bg-transparent border-none shadow-none text-xs',
            }}
            isFirstInGroup={index === 0}
            isLastInGroup={index === array.length - 1}
            isAloneInGroup={array.length === 1}
          />
        ))}
      </div>
      {advancedInitialMessages.length > 0 && (
        <BotOrAgentMessageGroup
          messages={advancedInitialMessages.map(
            ({ message }, index) =>
              ({
                component: 'bot_message',
                data: { message },
                id: `${index}-${message}`,
                type: 'FROM_BOT',
                timestamp: Date.now().toString(),
              }) satisfies BotMessageType,
          )}
          suggestedReplies={
            messages.length === 0 &&
            initialQuestionsPosition === 'below-initial-messages'
              ? initialQuestions
              : undefined
          }
          agent={
            config.bot ? { ...config.bot, isAi: true, id: null } : undefined
          }
        />
      )}
      {messages.length === 0 && initialMessages.length > 0 && (
        <BotOrAgentMessageGroup
          messages={initialMessages.map(
            (m, index) =>
              ({
                component: 'bot_message',
                data: { message: m },
                id: `${index}-${m}`,
                type: 'FROM_BOT',
                timestamp: Date.now().toString(),
              }) satisfies BotMessageType,
          )}
          suggestedReplies={
            initialQuestionsPosition === 'below-initial-messages'
              ? initialQuestions
              : undefined
          }
          agent={
            config.bot ? { ...config.bot, isAi: true, id: null } : undefined
          }
        />
      )}
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
