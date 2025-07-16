import { AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  isExhaustive,
  type HeaderButtonU,
  type SafeExtract,
  type ScreenU,
} from '../../../headless/core';
import {
  useConfig,
  usePreludeData,
  useSessions,
  useWidget,
  useWidgetRouter,
  useWidgetTrigger,
} from '../../../headless/react';
import { useDocumentDir } from '../../../headless/react/hooks/useDocumentDir';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { useSetWidgetSizeFn } from '../hooks/useSetWidgetSize';
import { useTheme } from '../hooks/useTheme';
import { dc } from '../utils/data-component';
import { Button } from './lib/button';
import { DynamicIcon } from './lib/DynamicIcon';
import { MotionDiv } from './lib/MotionDiv';
import { Skeleton } from './lib/skeleton';
import { cn } from './lib/utils/cn';

function useGetHeaderTitle() {
  const { data } = usePreludeData();
  const {
    routerState: { screen },
  } = useWidgetRouter();
  const { textContent } = useConfig();

  const override = (() => {
    switch (screen) {
      case 'chat':
        return textContent?.chatScreen?.headerTitle;
      case 'sessions':
        return textContent?.sessionsScreen?.headerTitle;
      case 'welcome':
        return undefined;
      default:
        isExhaustive(screen, useGetHeaderTitle.name);
        return undefined;
    }
  })();

  return override ?? data?.data?.organizationName ?? 'Chat';
}

function useGetHeaderDataComponentProp(
  screen: ScreenU,
): ReturnType<typeof dc> | undefined {
  switch (screen) {
    case 'chat':
      return dc('chat/header');
    case 'sessions':
      return dc('sessions/header');
    case 'welcome':
      return undefined;
    default:
      isExhaustive(screen, useGetHeaderTitle.name);
      return undefined;
  }
}

function BackToSessionsScreenButton() {
  const { router } = useConfig();
  const {
    routerState: { screen },
    toSessionsScreen,
  } = useWidgetRouter();

  if (screen !== 'chat') return null;
  if (router?.chatScreenOnly) return null;

  return (
    <Button
      variant="ghost"
      size="fit"
      className="rounded-full"
      onClick={toSessionsScreen}
    >
      <ChevronLeftIcon className="size-4" />
    </Button>
  );
}

function HeaderButton__CloseWidget({
  button,
}: {
  button: SafeExtract<HeaderButtonU, { functionality: 'close-widget' }>;
}) {
  const { setIsOpen } = useWidgetTrigger();
  const { isSmallScreen } = useIsSmallScreen();

  if (isSmallScreen && button.hideOnSmallScreen) return null;
  if (!isSmallScreen && button.hideOnLargeScreen) return null;

  return (
    <Button
      variant="ghost"
      size="fit"
      className="rounded-full"
      onClick={() => setIsOpen(false)}
    >
      <DynamicIcon name={button.icon} />
    </Button>
  );
}

function HeaderButton__ExpandShrink({
  button,
}: {
  button: SafeExtract<HeaderButtonU, { functionality: 'expand-shrink' }>;
}) {
  const [expanded, setExpanded] = useState(false);

  const {
    routerState: { screen },
  } = useWidgetRouter();
  const { isSmallScreen } = useIsSmallScreen();
  const { theme } = useTheme();
  const { setWidth, setHeight } = useSetWidgetSizeFn();

  if (screen !== 'chat' && screen !== 'sessions') return null;

  const screenHeight = (() => {
    switch (screen) {
      case 'chat':
        return theme.screens.chat.height;
      case 'sessions':
        return theme.screens.sessions.height;
      default:
        isExhaustive(screen, HeaderButton__ExpandShrink.name);
        return theme.screens.chat.height;
    }
  })();
  const screenWidth = (() => {
    switch (screen) {
      case 'chat':
        return theme.screens.chat.width;
      case 'sessions':
        return theme.screens.sessions.width;
      default:
        isExhaustive(screen, HeaderButton__ExpandShrink.name);
        return theme.screens.chat.width;
    }
  })();

  const handleClick = () => {
    setExpanded((prev) => {
      const isExpanded = !prev;
      setHeight(isExpanded ? '100vh' : screenHeight);
      setWidth(isExpanded ? `max(40vw, ${screenWidth})` : screenWidth);

      return isExpanded;
    });
  };

  if (isSmallScreen && button.hideOnSmallScreen) return null;
  if (!isSmallScreen && button.hideOnLargeScreen) return null;

  return (
    <Button
      variant="ghost"
      size="fit"
      className="rounded-full"
      onClick={handleClick}
    >
      <DynamicIcon
        name={button.icon || (expanded ? button.shrinkIcon : button.expandIcon)}
      />
    </Button>
  );
}

function HeaderButton__ResolveSession({
  button,
}: {
  button: SafeExtract<HeaderButtonU, { functionality: 'resolve-session' }>;
}) {
  const { widgetCtx } = useWidget();
  const { setIsOpen } = useWidgetTrigger();
  const { resolveSession, sessionState } = useSessions();
  const { isSmallScreen } = useIsSmallScreen();

  const handleResolve = async () => {
    const { success, error } = await resolveSession();
    if (!success) return console.error(error);

    if (button.onResolved === 'close-widget') setIsOpen(false);
    if (button.onResolved === 'reset-chat') widgetCtx.resetChat();
    if (button.onResolved === 'reset-chat-and-close-widget') {
      setIsOpen(false);
      widgetCtx.resetChat();
    }
  };

  if (isSmallScreen && button.hideOnSmallScreen) return null;
  if (!isSmallScreen && button.hideOnLargeScreen) return null;

  return (
    <Button
      variant="ghost"
      size="fit"
      className="rounded-full"
      onClick={handleResolve}
      disabled={
        sessionState.isResolvingSession || !sessionState.session?.isOpened
      }
    >
      <DynamicIcon name={button.icon} />
    </Button>
  );
}

function Header__Button({ button }: { button: HeaderButtonU }) {
  switch (button.functionality) {
    case 'close-widget':
      return <HeaderButton__CloseWidget button={button} />;
    case 'expand-shrink':
      return <HeaderButton__ExpandShrink button={button} />;
    case 'resolve-session':
      return <HeaderButton__ResolveSession button={button} />;
    default:
      isExhaustive(button, Header__Button.name);
      return null;
  }
}

const defaultCloseWidgetButton = {
  functionality: 'close-widget',
  hideOnLargeScreen: true,
  icon: 'X',
} satisfies HeaderButtonU;

export function Header__Buttons() {
  const {
    routerState: { screen },
  } = useWidgetRouter();
  const { headerButtons } = useConfig();

  const buttons =
    screen === 'chat'
      ? headerButtons?.chatScreen
      : screen === 'sessions'
        ? headerButtons?.sessionsScreen
        : [];

  if (!buttons || buttons.length === 0) {
    return <Header__Button button={defaultCloseWidgetButton} />;
  }

  return (
    <>
      {buttons.map((button) => (
        <Header__Button
          key={`${button.functionality}-${button.icon}`}
          button={button}
        />
      ))}
    </>
  );
}

export function Header() {
  const {
    routerState: { screen },
  } = useWidgetRouter();
  const { isLoading } = usePreludeData();
  const direction = useDocumentDir();

  const dataComponentProp = useGetHeaderDataComponentProp(screen);
  const title = useGetHeaderTitle();

  return (
    <header {...dataComponentProp} className="py-2 px-4 shrink-0">
      <div dir={direction} className="flex items-center gap-2">
        <BackToSessionsScreenButton />
        <div
          className={cn(
            'flex-1 h-8 flex items-center',
            screen === 'sessions' && 'pl-2',
          )}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <MotionDiv key="skeleton" snapExit>
                <Skeleton className="h-5 w-1/2" />
              </MotionDiv>
            ) : (
              <MotionDiv key="organization-name">
                <h2 className="font-semibold">{title}</h2>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
        <Header__Buttons />
      </div>
    </header>
  );
}
