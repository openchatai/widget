import { AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, UserRoundIcon } from 'lucide-react';
import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { type SessionDto } from '../../../../headless/core';
import {
  useConfig,
  useSessions,
  useWidgetRouter,
} from '../../../../headless/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/lib/avatar';
import { Button } from '../../components/lib/button';
import { LoadingSpinner } from '../../components/lib/LoadingSpinner';
import { MotionDiv } from '../../components/lib/MotionDiv';
import { Skeleton } from '../../components/lib/skeleton';
import { cn } from '../../components/lib/utils/cn';
import { MemoizedReactMarkdown } from '../../components/markdown';
import { PoweredByOpen } from '../../components/PoweredByOpen';
import { Header } from '../../components/Header';
import { useLocale } from '../../hooks/useLocale';
import { useTheme } from '../../hooks/useTheme';
import { useSetWidgetSize } from '../../hooks/useSetWidgetSize';
import { dc } from '../../utils/data-component';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="pl-4 text-xs text-muted-foreground/75 uppercase font-semibold tracking-tight">
      {children}
    </p>
  );
}

function SessionCard({
  session,
  className,
}: {
  session: SessionDto;
  className?: string;
}) {
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
      variant="ghost"
      size="lg"
      className={cn(
        'rounded-full p-2 pr-4 flex text-start justify-between w-full whitespace-normal',
        className,
      )}
      onClick={() => toChatScreen(session.id)}
    >
      <div className="flex-1 flex gap-2 items-center">
        <AnimatePresence mode="wait">
          <MotionDiv snapExit>
            <Avatar className="size-10">
              <AvatarImage src={assigneeAvatarUrl} alt="Agent Icon" />
              <AvatarFallback>
                <UserRoundIcon className="size-4" />
              </AvatarFallback>
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
    openSessions,
    closedSessions,
    canCreateNewSession,
  } = useSessions();

  return (
    <div className="flex-1 flex flex-col overflow-scroll py-2 px-2">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <MotionDiv
            key="loading"
            className="flex-1 flex items-center justify-center"
          >
            <LoadingSpinner />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="sessions"
            className="flex-1 flex flex-col gap-2 relative"
          >
            {sessions.length ? (
              <>
                <AnimatePresence>
                  {openSessions.length > 0 && (
                    <MotionDiv
                      fadeIn="up"
                      delay={0.2}
                      key="open-sessions"
                      className="space-y-2"
                      snapExit
                    >
                      {openSessions.map((s) => (
                        <SessionCard key={s.id} session={s} />
                      ))}
                    </MotionDiv>
                  )}

                  {closedSessions.length > 0 && (
                    <MotionDiv
                      key="closed-sessions"
                      className="space-y-2"
                      delay={0.2}
                      snapExit
                    >
                      <SectionTitle>
                        {locale.get('closed-conversations')}
                      </SectionTitle>
                      {closedSessions.map((s) => (
                        <SessionCard
                          key={s.id}
                          session={s}
                          className="opacity-50 hover:opacity-100"
                        />
                      ))}
                    </MotionDiv>
                  )}
                </AnimatePresence>

                {canCreateNewSession && (
                  <div className="mt-auto w-full rounded-3xl sticky bottom-0 outline outline-8 outline-background bg-background">
                    <Button
                      {...dc('sessions/new_conversation_btn')}
                      size="lg"
                      key="new-session"
                      className="w-full"
                      onClick={() => toChatScreen()}
                    >
                      {locale.get('new-conversation')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-2 items-center">
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    {locale.get('no-conversations-yet')}
                  </p>
                </div>
                <Button
                  {...dc('sessions/new_conversation_btn')}
                  size="lg"
                  key="new-session"
                  className="w-full"
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
  useSetWidgetSize({
    width: theme.screens.sessions.width,
    height: theme.screens.sessions.height,
  });

  return (
    <div
      {...dc('sessions/root')}
      className={cn('flex flex-col overflow-hidden bg-background')}
      style={{
        width: '100vw', // Relative to the iframe
        maxWidth: '100vw', // Relative to the iframe
        height: '100vh', // Relative to the iframe
        maxHeight: '100vh', // Relative to the iframe
      }}
    >
      <div className="size-full flex flex-col">
        <Header />
        <SessionsList />
        <PoweredByOpen />
      </div>
    </div>
  );
}
