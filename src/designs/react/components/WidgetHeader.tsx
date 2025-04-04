import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  MessageCirclePlusIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { usePreludeData, useWidgetRouter } from '../../../headless/react';
import { Button } from './lib/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './lib/dropdown-menu';
import { Skeleton } from './lib/skeleton';
import { useDocumentDir } from '../../../headless/react/hooks/useDocumentDir';
import { MotionDiv } from './lib/MotionDiv';
import { cn } from './lib/utils/cn';

function OptionsMenu() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const { toChatScreen } = useWidgetRouter();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="fit" className="rounded-full">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              setOpen(false);
              toChatScreen();
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -4, rotate: 360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
            >
              <MessageCirclePlusIcon />
            </motion.div>
            {locale.get('new-conversation')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function WidgetHeader() {
  const {
    routerState: { screen },
    toSessionsScreen,
  } = useWidgetRouter();
  const { data, isLoading } = usePreludeData();
  const direction = useDocumentDir();

  return (
    <header className="p-2 border-b bg-background">
      <div
        dir={direction}
        className="flex items-center rtl:flex-row-reverse gap-2"
      >
        {screen === 'chat' && (
          <Button
            variant="ghost"
            size="fit"
            className="rounded-full"
            onClick={toSessionsScreen}
          >
            {/* TODO handle rtl here */}
            <ChevronLeftIcon className="size-4" />
          </Button>
        )}
        <div className={cn('flex-1', screen === 'sessions' && 'pl-2')}>
          <AnimatePresence mode="wait">
            {isLoading || !data?.data?.organizationName ? (
              <MotionDiv key="skeleton" snapExit>
                <Skeleton className="h-5 w-1/2" />
              </MotionDiv>
            ) : (
              <MotionDiv key="organization-name">
                <h2 className="font-semibold">
                  {data?.data?.organizationName}
                </h2>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
        <OptionsMenu />
      </div>
    </header>
  );
}
