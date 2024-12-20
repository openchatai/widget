import React from "react";
import { Switch } from '@ui/switch';
import { XIcon } from 'lucide-react';
import { DialogClose, DialogContent } from '@ui/dialog';
import { useChat, useConfigData, useLocale } from '@react/index';

export function SettingsDialogContent() {
    const { widgetSettings, setSettings } = useConfigData();
    const locale = useLocale();

    return <DialogContent>
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" dir="auto">
                {locale.get("settings")}
            </h2>
            <DialogClose className="text-secondary-foreground p-1 font-semibold">
                <XIcon className="size-4" />
            </DialogClose>
        </div>

        <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="persist-session::open" dir="auto">
                    {locale.get("persist-session")}
                </label>
                <Switch
                    id="persist-session::open"
                    checked={widgetSettings?.persistSession}
                    onCheckedChange={(c) => setSettings({ persistSession: c })}
                />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="sfx::open" dir="auto">
                    {locale.get("sound-effects")}
                </label>
                <Switch
                    id="sfx::open"
                    checked={widgetSettings?.useSoundEffects}
                    onCheckedChange={(c) => setSettings({ useSoundEffects: c })}
                />
            </div>
        </div>
    </DialogContent>
}

export function ClearSessionDialogContent({ setOpen }: { setOpen: (open: boolean) => void }) {
    const { clearSession } = useChat();
    const locale = useLocale();

    return <DialogContent>
        <header >
            <h2 className="text-sm" dir="auto">
                {locale.get("reset-conversation-confirm")}
            </h2>
        </header>
        <div className="space-x-2 flex items-center justify-end">
            <button
                onClick={() => {
                    clearSession();
                    setOpen(false);
                }}
                className="bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-sm"
                dir="auto"
            >
                {locale.get("yes")}
            </button>
            <DialogClose
                className="bg-secondary text-secondary-foreground border px-2 py-1 rounded-lg text-sm"
                dir="auto"
            >
                {locale.get("no")}
            </DialogClose>
        </div>
    </DialogContent>
}