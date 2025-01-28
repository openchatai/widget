import React from "react";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from "../../constants";
import { cn } from "../../components/lib/utils/cn";
import { useSessions } from "../../../../headless/react";
import { Button } from "../../components/lib/button";
import { useWidgetRouter } from "../../../../headless/react/hooks/useWidgetRouter";
import { Avatar, AvatarImage } from "../../components/lib/avatar";
import { ChevronRightIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Loading } from "../../components/lib/loading";
import { MotionDiv } from "../../components/lib/MotionDiv";

export function SessionsScreen() {
  const { toChatScreen } = useWidgetRouter();
  const {
    sessionsState: { data: sessions, isInitialFetchLoading: isLoading },
  } = useSessions();
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
      <div className="size-full overflow-scroll p-2">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionDiv
              key="loading"
              className="size-full flex items-center justify-center"
            >
              <Loading />
            </MotionDiv>
          ) : (
            <MotionDiv
              key="sessions"
              className="size-full flex flex-col gap-2 relative"
            >
              {sessions.length ? (
                <>
                  {sessions.map((s) => (
                    <Button
                      key={s.id}
                      variant="outline"
                      size="lg"
                      className="rounded-3xl p-2.5 pr-2 flex text-start justify-between w-full whitespace-normal"
                      onClick={() => toChatScreen(s.id)}
                    >
                      <p className="line-clamp-2 overflow-hidden text-ellipsis">
                        {s.lastMessage}
                      </p>
                      <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
                    </Button>
                  ))}
                  <div key="spacer" />
                  <Button
                    size="lg"
                    key="new-session"
                    className="mt-auto w-full rounded-3xl sticky bottom-0"
                    onClick={() => toChatScreen()}
                    // TODO add translation
                  >
                    New chat
                  </Button>
                </>
              ) : (
                <div className="size-full flex flex-col gap-2 items-center">
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
                    // TODO add translation
                  >
                    Start your first chat
                  </Button>
                </div>
              )}
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
