import {
  useChat,
  useConfigData,
  useLocale,
  usePreludeData
} from '@react/index';
import { Button } from '@ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Skeleton } from '@ui/skeleton';
import { Switch } from '@ui/switch';
import { Tooltippy } from '@ui/tooltip';
import { RotateCcw, SettingsIcon } from 'lucide-react';
import React, { useState } from 'react';

function SettingsPopover() {
  const locale = useLocale();
  const { widgetSettings, setSettings } = useConfigData();

  return (
    <Popover>
      <Tooltippy content={locale.get('settings')} side="right">
        <PopoverTrigger asChild>
          <Button variant="ghost" size="fit" className="rounded-full">
            <SettingsIcon className="size-4" />
          </Button>
        </PopoverTrigger>
      </Tooltippy>
      <PopoverContent align="start" className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold" dir="auto">
            {locale.get('settings')}
          </h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="persist-session::open" dir="auto">
              {locale.get('persist-session')}
            </label>
            <Switch
              id="persist-session::open"
              checked={widgetSettings?.persistSession}
              onCheckedChange={(c) => setSettings({ persistSession: c })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="sfx::open" dir="auto">
              {locale.get('sound-effects')}
            </label>
            <Switch
              id="sfx::open"
              checked={widgetSettings?.useSoundEffects}
              onCheckedChange={(c) => setSettings({ useSoundEffects: c })}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ResetConversationPopover() {
  const locale = useLocale();
  const { clearSession } = useChat();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltippy content={locale.get('reset-conversation')} side="left">
        <PopoverTrigger asChild>
          <Button variant="ghost" size="fit" className="rounded-full">
            <RotateCcw className="size-4" />
          </Button>
        </PopoverTrigger>
      </Tooltippy>

      <PopoverContent align="end" className="space-y-2 text-sm">
        <header>
          <h2 className="text-sm" dir="auto">
            {locale.get('reset-conversation-confirm')}
          </h2>
        </header>
        <div className="space-x-2 flex items-center justify-end">
          <Button variant="secondary" size="sm">{locale.get('no')}</Button>
          <Button onClick={clearSession} variant="destructive" size="sm">
            {locale.get('yes')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ChatHeader() {
  const { data, isLoading } = usePreludeData();
  return (
    <header className="p-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <SettingsPopover />
        <div className="flex-1">
          {isLoading ? (
            <Skeleton className="h-4 w-2/3" />
          ) : (
            <h2 className="font-semibold">{data?.organization_name}</h2>
          )}
        </div>
        <ResetConversationPopover />
      </div>
    </header>
  );
}
