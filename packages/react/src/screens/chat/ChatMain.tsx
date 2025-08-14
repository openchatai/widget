import {
  type BotMessageType,
  type LiteralWidgetComponentKey,
  type SafeExtract,
} from '@opencx/widget-core';
import {
  useConfig,
  useIsAwaitingBotReply,
  useMessages,
  useWidget,
} from '@opencx/widget-react-headless';
import React, { useEffect, useMemo, useRef } from 'react';
import { BotOrAgentMessageGroup } from '../../components/BotOrAgentMessageGroup';
import { RichText } from '../../components/RichText';
import { UserMessageGroup } from '../../components/UserMessageGroup';
import { dc } from '../../utils/data-component';
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from '../../utils/group-messages-by-type';

function ChatBannerItems() {
  const {
    messagesState: { messages },
  } = useMessages();
  const { chatBannerItems } = useConfig();

  if (!chatBannerItems?.length) return null;
  if (
    messages.length > 0 &&
    chatBannerItems.every((item) => !item.persistent)
  ) {
    return null;
  }

  return (
    <div className="w-full text-center text-xs">
      {chatBannerItems.map(({ message, persistent }, index) =>
        messages.length > 0 && !persistent ? null : (
          <div key={`${message}-${index}`}>
            <RichText>{message}</RichText>
          </div>
        ),
      )}
    </div>
  );
}

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

  const advancedInitialMessages = (() => {
    if (!messages.length) return config.advancedInitialMessages || [];
    return config.advancedInitialMessages?.filter((m) => !!m.persistent) || [];
  })();

  const initialMessages = (() => {
    if (advancedInitialMessages.length) return [];
    if (messages.length) return [];
    // TODO translate default welcome message
    if (!config.initialMessages?.length) return ['Hello, how can I help you?'];
    return config.initialMessages;
  })();

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
      <ChatBannerItems />
      {messages.length === 0 && advancedInitialMessages.length > 0 && (
        <BotOrAgentMessageGroup
          messages={advancedInitialMessages.map(
            ({ message }, index) =>
              ({
                component: 'bot_message',
                data: { message },
                id: `${index}-${message}`,
                type: 'FROM_BOT',
                timestamp: null,
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
                timestamp: null,
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
