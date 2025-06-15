import React, { useEffect, useMemo, useRef } from 'react';
import {
  OpenCxComponentName,
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

  const persistentInitialMessages = config.persistentInitialMessages || [];
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
      data-component={OpenCxComponentName['chat_screen/messages_container']}
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 p-2 space-y-2 overflow-auto"
    >
      {persistentInitialMessages.map((message) => (
        <BotOrAgentResponse
          key={message}
          component="bot_message"
          data={{ message }}
          id={message}
          type="FROM_BOT"
          timestamp={Date.now().toString()}
          dataComponentNames={{
            messageContainer:
              OpenCxComponentName[
                'chat_screen/persistent_initial_message_container'
              ],
            message:
              OpenCxComponentName['chat_screen/persistent_initial_message'],
          }}
        />
      ))}
      {messages.length === 0 && (
        <BotOrAgentMessageGroup
          messages={[
            ...initialMessages.map(
              (m) =>
                ({
                  component: 'bot_message',
                  data: { message: m },
                  id: m,
                  type: 'FROM_BOT',
                  timestamp: Date.now().toString(),
                }) satisfies BotMessageType,
            ),
          ]}
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
