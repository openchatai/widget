import React from "react";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from "../../constants";
import { cn } from "../../components/lib/utils/cn";
import { useSessions, useWidgetRouter } from "../../../../headless/react";
import { Button } from "../../components/lib/button";
import { ChevronRightIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Loading } from "../../components/lib/loading";
import { MotionDiv } from "../../components/lib/MotionDiv";
import { WidgetHeader } from "../../components/WidgetHeader";
import { useLocale } from "../../hooks/useLocale";
import type { SessionDto } from "../../../../headless/core";
import { Skeleton } from "../../components/lib/skeleton";

function SessionCard({ session }: { session: SessionDto }) {
  const { toChatScreen } = useWidgetRouter();
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-3xl p-2.5 pr-2 flex text-start justify-between w-full whitespace-normal"
      onClick={() => toChatScreen(session.id)}
    >
      <AnimatePresence mode="wait">
        {session.lastMessage ? (
          <MotionDiv key="content">
            <p className="line-clamp-2 overflow-hidden text-ellipsis">
              {session.lastMessage}
            </p>
          </MotionDiv>
        ) : (
          <MotionDiv key="skeleton" className="w-1/2" snapExit>
            <Skeleton className="h-4 w-full" />
          </MotionDiv>
        )}
      </AnimatePresence>
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
                <div className="mt-auto w-full rounded-3xl sticky bottom-0 outline outline-8 outline-background">
                  <Button
                    size="lg"
                    key="new-session"
                    className="w-full rounded-3xl"
                    onClick={() => toChatScreen()}
                  >
                    {locale.get("new-conversation")}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-2 items-center">
                <div className="flex-1 flex items-center justify-center">
                  <p
                    className="text-muted-foreground"
                    // TODO add translation
                  >
                    No conversations yet
                  </p>
                </div>
                <Button
                  size="lg"
                  key="new-session"
                  className="w-full rounded-3xl"
                  onClick={() => toChatScreen()}
                >
                  {locale.get("new-conversation")}
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
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  return (
    <div
      ref={observedElementRef}
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background",
      )}
    >
      <div className="size-full flex flex-col">
        <WidgetHeader />
        <SessionsList />
      </div>
    </div>
  );
}
