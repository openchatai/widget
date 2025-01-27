import React from "react";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from "../../constants";
import { cn } from "../../components/lib/utils/cn";
import { useSession } from "../../../../headless/react";
import { Button } from "../../components/lib/button";
import { useWidgetRouter } from "../../../../headless/react/hooks/useWidgetRouter";
import { Avatar, AvatarImage } from "../../components/lib/avatar";
import { ChevronRightIcon } from "lucide-react";

export function SessionsScreen() {
  const { toChatScreen } = useWidgetRouter();
  const {
    sessionsState: { data: sessions },
  } = useSession();
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
      <div className="size-full overflow-scroll">
        <div className="size-full p-2 flex flex-col gap-2 relative">
          {sessions.map((s) => (
            <Button
              key={s.id}
              variant="outline"
              size="free"
              rounded="2xl"
              className="p-3 pr-2 flex text-start justify-between w-full whitespace-normal"
              onClick={() => toChatScreen(s.id)}
            >
              <p className="line-clamp-2 overflow-hidden text-ellipsis">
                {s.lastMessage}
              </p>
              <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
            </Button>
          ))}
          <Button
            key="new-session"
            rounded="2xl"
            className="mt-auto w-full"
            onClick={() => toChatScreen()}
          >
            New chat
          </Button>
        </div>
      </div>
    </div>
  );
}
