import { useChat, useLocale, usePreludeData } from "@react/core-integration";
import { useWidgetSettings } from "@react/core-integration/hooks/useSettings";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { MotionDiv } from "@ui/MotionDiv";
import { Skeleton } from "@ui/skeleton";
import { Switch } from "@ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import {
  EllipsisVerticalIcon,
  RotateCcw,
  SaveIcon,
  SaveOffIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import React, { useState } from "react";

function OptionsMenu() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const { settingsState, updateSettings } = useWidgetSettings();
  const { chat } = useChat();

  const togglePersistSession = () => {
    updateSettings({ persistSession: !settingsState.persistSession });
  };

  const toggleSoundEffects = () => {
    updateSettings({ useSoundEffects: !settingsState.useSoundEffects });
  };

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
            onSelect={(e) => {
              e.preventDefault();
              togglePersistSession();
            }}
          >
            <AnimatePresence mode="wait">
              {settingsState.persistSession ? (
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
              checked={settingsState.persistSession}
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
              {settingsState.useSoundEffects ? (
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
              checked={settingsState.useSoundEffects}
              onCheckedChange={toggleSoundEffects}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              chat.clearSession();
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

  return (
    <header className="p-2 border-b bg-background">
      <div className="flex items-center gap-2">
        {/* <SettingsPopover /> */}
        <div className="flex-1 pl-2">
          {isLoading ? (
            <Skeleton className="h-4 w-2/3" />
          ) : (
            <h2 className="font-semibold">{data?.organizationName}</h2>
          )}
        </div>
        <OptionsMenu />
      </div>
    </header>
  );
}
