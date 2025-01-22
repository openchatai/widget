import { motion } from "framer-motion";
import {
  EllipsisVerticalIcon,
  RotateCcw
} from "lucide-react";
import React, { useState } from "react";
import { useLocale } from "../../../hooks/useLocale";
import { usePreludeData, useWidget } from "../../../../../headless/react";
import { Button } from "../../../components/lib/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/lib/dropdown-menu";
import { Skeleton } from "../../../components/lib/skeleton";
import { useDocumentDir } from "../../../../../headless/react/hooks/useDocumentDir";

function OptionsMenu() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const { widgetCtx } = useWidget();

  // const { widgetSettings, setWidgetSettings } = useChat();
  // const { chat } = useChat();

  // TODO enable these
  // const togglePersistSession = () => {
  //   setWidgetSettings({
  //     ...widgetSettings,
  //     persistSession: !widgetSettings.persistSession,
  //   });
  // };

  // const toggleSoundEffects = () => {
  //   setWidgetSettings({
  //     ...widgetSettings,
  //     playSoundEffects: !widgetSettings.playSoundEffects,
  //   });
  // };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="fit" className="rounded-full">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56">
        {/* <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              togglePersistSession();
            }}
          >
            <AnimatePresence mode="wait">
              {widgetSettings.persistSession ? (
                <MotionDiv key="save" fadeIn="right" distance={4} snapExit>
                  <SaveIcon />
                </MotionDiv>
              ) : (
                <MotionDiv key="save-off" fadeIn="right" distance={4} snapExit>
                  <SaveOffIcon />
                </MotionDiv>
              )}
            </AnimatePresence>
            {locale.get("persist-session")}
            <Switch
              className="ml-auto"
              checked={widgetSettings.persistSession}
              onCheckedChange={togglePersistSession}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              toggleSoundEffects();
            }}
          >
            <AnimatePresence mode="wait">
              {widgetSettings.playSoundEffects ? (
                <MotionDiv key="volume-2" fadeIn="right" distance={4} snapExit>
                  <Volume2Icon />
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="volume-off"
                  fadeIn="right"
                  distance={4}
                  snapExit
                >
                  <VolumeOffIcon />
                </MotionDiv>
              )}
            </AnimatePresence>
            {locale.get("sound-effects")}
            <Switch
              className="ml-auto"
              checked={widgetSettings.playSoundEffects}
              onCheckedChange={toggleSoundEffects}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              widgetCtx.resetChat();
              setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -4, rotate: 360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
            >
              <RotateCcw />
            </motion.div>
            {locale.get("reset-conversation")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChatHeader() {
  const { data, isLoading } = usePreludeData();
  const direction = useDocumentDir()
  return (
    <header className="p-2 border-b bg-background">
      <div dir={direction} className="flex items-center rtl:flex-row-reverse gap-2">
        {/* <SettingsPopover /> */}
        <div className="flex-1 pl-2">
          {isLoading ? (
            <Skeleton className="h-4 w-2/3" />
          ) : (
            <h2 className="font-semibold">{data?.data?.organizationName}</h2>
          )}
        </div>
        <OptionsMenu />
      </div>
    </header>
  );
}
