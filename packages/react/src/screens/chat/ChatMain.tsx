import {
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
import { SessionResolvedComponent } from '../../components/special-components/SessionResolvedComponent';
import { UserMessageGroup } from '../../components/UserMessageGroup';
import { dc } from '../../utils/data-component';
import {
  groupMessagesByType,
  isAgentMessageGroup,
  isBotMessageGroup,
  isUserMessageGroup,
} from '../../utils/group-messages-by-type';
import { AdvancedInitialMessages } from './AdvancedInitialMessages';
import { ChatBannerItems } from './ChatBannerItems';
import { InitialMessages } from './InitialMessages';
import { ChatBottomComponents } from '../../components/special-components/ChatBottomComponents';

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
      {...dc('chat/msgs/root')}
      ref={messagesContainerRef}
      className="max-h-full scroll-smooth relative flex-1 py-2 px-4 flex flex-col gap-2 overflow-auto"
    >
      <ChatBannerItems />
      <AdvancedInitialMessages />
      <InitialMessages />

      {groupedMessages.map((group, i) => {
        const type = group?.[0]?.type;
        const firstIdInGroup = group[0]?.id;
        if (!type || !firstIdInGroup) return null;

        if (isUserMessageGroup(group)) {
          return <UserMessageGroup key={firstIdInGroup} messages={group} />;
        }

        if (isBotMessageGroup(group)) {
          const isLastGroup = i === groupedMessages.length - 1;
          // Do not render any AI messages (most likely came from polling) while waiting for the sendMessage HTTP request to finish
          if (isAwaitingBotReply && isLastGroup) return null;

          const agent = group[0]?.agent;
          return (
            <BotOrAgentMessageGroup
              key={firstIdInGroup}
              messages={group}
              agent={agent}
            />
          );
        }

        if (isAgentMessageGroup(group)) {
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

      <ChatBottomComponents />
      <SessionResolvedComponent />
    </div>
  );
}
