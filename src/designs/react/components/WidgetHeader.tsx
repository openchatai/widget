import { AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import React from 'react';
import {
  useConfig,
  usePreludeData,
  useWidgetRouter,
  useWidgetTrigger,
} from '../../../headless/react';
import { useDocumentDir } from '../../../headless/react/hooks/useDocumentDir';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { dc } from '../utils/data-component';
import { Button } from './lib/button';
import { MotionDiv } from './lib/MotionDiv';
import { Skeleton } from './lib/skeleton';
import { cn } from './lib/utils/cn';
import type { ScreenU } from '../../../headless/core';

function CloseWidgetButton() {
  const { setIsOpen } = useWidgetTrigger();
  const { isSmallScreen } = useIsSmallScreen();

  if (!isSmallScreen) return null;

  return (
    <Button
      variant="ghost"
      size="fit"
      className="rounded-full"
      onClick={() => setIsOpen(false)}
    >
      <XIcon className="size-4" />
    </Button>
  );
}

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
        const _: never = screen;
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
      const _: never = screen;
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

export function WidgetHeader() {
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
        <CloseWidgetButton />
      </div>
    </header>
  );
}
