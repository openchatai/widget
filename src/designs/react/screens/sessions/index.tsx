import React from 'react';
import { cn } from '../../components/lib/utils/cn';
import {
  useConfig,
  useSessions,
  useWidgetRouter,
} from '../../../../headless/react';
import { Button } from '../../components/lib/button';
import { ChevronRightIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Loading } from '../../components/lib/loading';
import { MotionDiv } from '../../components/lib/MotionDiv';
import { WidgetHeader } from '../../components/WidgetHeader';
import { useLocale } from '../../hooks/useLocale';
import {
  OpenCxComponentName,
  type SessionDto,
} from '../../../../headless/core';
import { Skeleton } from '../../components/lib/skeleton';
import { Avatar, AvatarImage } from '../../components/lib/avatar';
import { MemoizedReactMarkdown } from '../../components/markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { PoweredByOpen } from '../../components/PoweredByOpen';
import { useTheme } from '../../hooks/useTheme';
import { useWidgetSize } from '../../hooks/useWidgetSize';

function SessionCard({ session }: { session: SessionDto }) {
  const { bot } = useConfig();
  const { toChatScreen } = useWidgetRouter();

  const assigneeName =
    session.assignee.kind === 'human'
      ? session.assignee.name || 'Support Agent'
      : bot?.name || 'AI Support Agent';
  const assigneeAvatarUrl =
    session.assignee.kind === 'human'
      ? session.assignee.avatarUrl || ''
      : bot?.avatar || '';

  return (
    <Button
      variant="outline"
      size="lg"
      className="border-muted rounded-full p-2 flex text-start justify-between w-full whitespace-normal"
      onClick={() => toChatScreen(session.id)}
    >
      <div className="flex-1 flex gap-2 items-center">
        <AnimatePresence mode="wait">
          <MotionDiv snapExit>
            <Avatar className="size-10">
              <AvatarImage src={assigneeAvatarUrl} alt="Agent Icon" />
            </Avatar>
          </MotionDiv>
        </AnimatePresence>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <MotionDiv key={assigneeName} snapExit>
              {assigneeName}
            </MotionDiv>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {session.lastMessage ? (
              <MotionDiv key={session.lastMessage || 'content'} snapExit>
                <MemoizedReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  // Do not add `prose` styling for last message preview
                  className="line-clamp-1 overflow-hidden text-ellipsis text-xs text-muted-foreground"
                >
                  {session.lastMessage}
                </MemoizedReactMarkdown>
              </MotionDiv>
            ) : (
              <MotionDiv key="skeleton" className="w-1/2" snapExit>
                <Skeleton className="h-4 w-full" />
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
    </Button>
  );
}

function SessionsList() {
  const locale = useLocale();
  const { toChatScreen } = useWidgetRouter();
  const {
    sessionsState: { data: sessions, isInitialFetchLoading: isLoading },
  } = useSessions();

  return (
    <div className="flex-1 flex flex-col overflow-scroll p-2">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <MotionDiv
            key="loading"
            className="flex-1 flex items-center justify-center"
          >
            <Loading />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="sessions"
            className="flex-1 flex flex-col gap-2 relative"
          >
            {sessions.length ? (
              <>
                <AnimatePresence>
                  {sessions.map((s, i) => (
                    <MotionDiv key={`${s.id}-${i}`} snapExit>
                      <SessionCard session={s} />
                    </MotionDiv>
                  ))}
                </AnimatePresence>
                <div className="mt-auto w-full rounded-3xl sticky bottom-0 outline outline-8 outline-background bg-background">
                  <Button
                    data-component={
                      OpenCxComponentName[
                        'sessions-screen__new-conversation-button'
                      ]
                    }
                    size="lg"
                    key="new-session"
                    className="w-full rounded-3xl"
                    onClick={() => toChatScreen()}
                  >
                    {locale.get('new-conversation')}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-2 items-center">
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    {locale.get('no-conversations-yet')}
                  </p>
                </div>
                <Button
                  size="lg"
                  key="new-session"
                  className="w-full rounded-3xl"
                  onClick={() => toChatScreen()}
                >
                  {locale.get('new-conversation')}
                </Button>
              </div>
            )}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SessionsScreen() {
  const { theme } = useTheme();
  useWidgetSize({
    width: theme.screens.sessions.width,
    height: theme.screens.sessions.height,
  });

  return (
    <div
      className={cn('flex flex-col overflow-hidden bg-background')}
      style={{
        width: '100vw', // Relative to the iframe
        maxWidth: '100vw', // Relative to the iframe
        height: '100vh', // Relative to the iframe
        maxHeight: '100vh', // Relative to the iframe
      }}
    >
      <div className="size-full flex flex-col">
        <WidgetHeader
          componentName={OpenCxComponentName['sessions-screen__header']}
        />
        <SessionsList />
      </div>
      <PoweredByOpen />
    </div>
  );
}
