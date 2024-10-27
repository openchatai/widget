import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@lib/components/dialog';
import { Switch } from '@lib/components/switch';
import { useChat, useConfigData, useLocale } from '@lib/providers';
import { RotateCcw, SettingsIcon, XIcon } from 'lucide-react';

const HeroImage = "https://cloud.opencopilot.so/widget/hero-image.png";

function SettingsDialog() {
    const { widgetSettings, setSettings } = useConfigData();
    const locale = useLocale();
    return (
        <Dialog>
            <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0">
                <SettingsIcon className="size-5" />
            </DialogTrigger>
            <DialogContent>
                <div className="p-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold" dir="auto">
                        {locale.get("settings")}
                    </h2>
                    <DialogClose className="bg-transparent text-accent p-1 font-semibold">
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
        </Dialog>
    );
}

function HeroImageDisplay() {
    return (
        <div className="flex items-center justify-center -space-x-2">
            <img src={HeroImage} alt="Hero image" className="w-[122px]" />
        </div>
    );
}

function ConfirmationDialog() {
    const { clearSession } = useChat();
    const locale = useLocale();
    return (
        <Dialog>
            {({ setOpen }) => (
                <>
                    <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0">
                        <RotateCcw className="size-5" />
                    </DialogTrigger>
                    <DialogContent>
                        <div className="p-4">
                            <h2 className="text-sm" dir="auto">
                                {locale.get("reset-conversation-confirm")}
                            </h2>
                        </div>
                        <div className="p-4 space-x-3 flex items-center justify-end">
                            <button
                                onClick={() => {
                                    clearSession();
                                    setOpen(false);
                                }}
                                className="bg-rose-400 text-white px-2 py-1 rounded-lg text-sm"
                                dir="auto"
                            >
                                {locale.get("yes")}
                            </button>
                            <DialogClose
                                className="bg-transparent text-accent border px-2 py-1 rounded-lg text-sm"
                                dir="auto"
                            >
                                {locale.get("no")}
                            </DialogClose>
                        </div>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
}

function InfoSection() {
    const locale = useLocale();
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center -space-x-2">
                <img src={HeroImage} alt="Hero image" className="w-1/2" />
            </div>
            <h2
                className="text-lg font-semibold text-background text-center"
                dir="auto"
                style={{
                    textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
                }}
            >
                {locale.get("got-any-questions")}
            </h2>
            <span
                className="text-sm text-white text-center"
                dir="auto"
                style={{
                    textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
                }}
            >
                {locale.get("typical-response-time")}
            </span>
        </div>
    );
}

// Refactored Header Components
function HeaderChatRunning() {
    return (
        <header className="p-3 gap-2 flex flex-col" style={{ paddingBottom: "1rem" }}>
            <div className="w-full flex items-center justify-between">
                <SettingsDialog />
                <HeroImageDisplay />
                <ConfirmationDialog />
            </div>
        </header>
    );
}

function HeaderChatDidNotStart() {

    return (
        <header className="p-3 gap-2 flex flex-col" style={{ paddingBottom: "2rem" }}>
            <div className="w-full flex items-center justify-between">
                <SettingsDialog />
                <HeroImageDisplay />
                <ConfirmationDialog />
            </div>
            <InfoSection />
        </header>
    );
}

export { HeaderChatRunning, HeaderChatDidNotStart };
