import { DefaultTextComponentProps } from "@lib/@components";
import { BotMessage } from "@lib/@components/BotMessage";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@lib/components/dialog";
import { Switch } from "@lib/components/switch";
import { TooltipProvider } from "@lib/components/tooltip";
import { ComponentRegistry } from "@lib/providers/componentRegistry";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleDashed,
  RotateCcw,
  SendHorizonal,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import React, {
  ComponentType,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserMessage } from "../components/messages";
import { useChat } from "../providers/ChatProvider";
import { useConfigData } from "../providers/ConfigDataProvider";

const HeroImage = "https://cloud.opencopilot.so/widget/hero-image.png";

function ChatFooter() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, info, hookState } = useChat();
  const layoutId = useId();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  function handleInputSubmit() {
    if (input.trim() === "") {
      return;
    }
    sendMessage({
      content: {
        text: input,
      },
    });
    setInput("");
  }

  return (
    <div className="p-2 rounded-lg relative">
      <div className="relative w-full top-0 overflow-hidden h-5 px-1">
        <AnimatePresence>
          {info && (
            <motion.div
              key={info.toString()}
              className="absolute w-full text-xs text-accent/60"
              layoutId={layoutId}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: "-100%" }}
              initial={{ opacity: 0, translateY: "-100%" }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              style={{ top: 0 }}
            >
              {info}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="flex items-center gap-2 border px-2 py-1.5 rounded-lg"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(19, 34, 68, 0.08)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.04)",
          borderRadius: "8px",
        }}
      >
        <input
          ref={inputRef}
          disabled={hookState === "loading"}
          value={input}
          className="flex-1 outline-none p-1 text-accent text-sm bg-transparent !placeholder-text-sm placeholder-font-100 placeholder:text-primary-foreground/50"
          onChange={handleInputChange}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleInputSubmit();
            }
          }}
          placeholder="Write a message..."
        />
        <div>
          <button
            onClick={handleInputSubmit}
            disabled={hookState === "loading"}
            className="rounded-lg p-1.5 text-white bg-primary shrink-0 disabled:opacity-50"
            style={{
              background: "#1883FF",
              border: "1px solid rgba(19, 34, 68, 0.08)",
            }}
          >
            {hookState === "loading" ? (
              <CircleDashed className="size-3.5 animate-spin animate-iteration-infinite" />
            ) : (
              <SendHorizonal className="size-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatScreen() {
  const {
    initialData,
    state,
    sendMessage,
    noMessages,
    hookState,
    events: chatEvents,
  } = useChat();
  const config = useConfigData();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const loading = hookState === "loading";

  function handleNewMessage() {
    setTimeout(() => {
      const container_ = messagesContainerRef.current;
      if (container_) {
        container_.scrollTop = container_.scrollHeight;
      }
    }, 0);
  }

  useEffect(() => {
    chatEvents.addEventListener("message", handleNewMessage);
    chatEvents.addEventListener("new_message", handleNewMessage);
    return () => {
      chatEvents.removeEventListener("new_message", handleNewMessage);
      chatEvents.removeEventListener("message", handleNewMessage);
    };
  }, [chatEvents]);

  const components = useMemo(
    () =>
      new ComponentRegistry({
        components: config.components,
      }),
    [config],
  );

  const LoadingComponent = components.getComponent(
    "loading",
    config.debug,
  ) as ComponentType;

  const DefaultTextComponent = components.getComponent(
    "TEXT",
    config.debug,
  ) as React.ComponentType<DefaultTextComponentProps>;

  return (
    <TooltipProvider>
      <div className="size-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0">
        <div
          className="w-full mesh-gradient h-full justify-between rounded-t-xl flex flex-col relative overflow-auto"
          style={{
            background:
              "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
            boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.12)",
            borderRadius: "16px",
          }}
        >
          {noMessages ? <HeaderChatDidNotStart /> : <HeaderChatRunning />}

          <div
            className="flex flex-col w-full flex-1 bg-background rounded-t-xl shadow"
            style={{
              background: "#FAFBFB",
              boxShadow: "0px -8px 20px rgba(0, 0, 0, 0.12)",
              borderRadius: " 16px 16px 0px 0px",
            }}
          >
            <div
              data-messages
              ref={messagesContainerRef}
              className="max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto"
            >
              {config.initialMessage?.map((message, index) => (
                <BotResponseWrapper bot={config.bot} key={index}>
                  <DefaultTextComponent
                    component="TEXT"
                    data={{ message }}
                    id={`${index}`}
                    responseFor={null}
                    type="FROM_BOT"
                    serverId={null}
                  />
                </BotResponseWrapper>
              )) ?? (
                <BotResponseWrapper bot={config.bot}>
                  <DefaultTextComponent
                    component="TEXT"
                    data={{ message: "Hello, how can I help?" }}
                    id="123"
                    responseFor={null}
                    type="FROM_BOT"
                    serverId={null}
                  />
                </BotResponseWrapper>
              )}
              {state.messages.map((message, i) => {
                if (message.type === "FROM_USER") {
                  return (
                    <UserMessage key={i} user={config.user}>
                      {message.content}
                    </UserMessage>
                  );
                } else if (message.type === "FROM_BOT") {
                  return (
                    <BotResponseWrapper bot={message.bot}>
                      <BotMessage message={message} index={i} key={i} />
                    </BotResponseWrapper>
                  );
                }
                return null;
              })}

              {loading && <LoadingComponent />}
            </div>

            <footer>
              {noMessages && (
                <div className="items-center justify-end mb-3 gap-1 flex-wrap">
                  {initialData.data?.initial_questions?.map((iq, index) => (
                    <button
                      key={index}
                      className="px-2 py-1.5 border whitespace-nowrap rounded-lg text-sm font-300"
                      onClick={() => {
                        sendMessage({
                          content: { text: iq },
                          headers: config.headers,
                          query_params: config.queryParams,
                          user: config.user,
                        });
                      }}
                    >
                      {iq}
                    </button>
                  ))}
                </div>
              )}
              <ChatFooter />
            </footer>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function HeaderChatRunning() {
  const { session, clearSession, settings, setSettings } = useChat();
  return (
    <header
      className="p-3 gap-2 flex flex-col"
      style={{
        paddingBottom: "1rem",
      }}
    >
      <div className="w-full flex items-center justify-between">
        <Dialog>
          <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0">
            <SettingsIcon className="size-5" />
          </DialogTrigger>
          <DialogContent>
            <div className="p-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Settings</h2>
              <DialogClose className="bg-transparent text-accent p-1 font-semibold">
                <XIcon className="size-4" />
              </DialogClose>
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="persist-session::open">Persist session</label>
                <Switch
                  id="persist-session::open"
                  disabled={!!session}
                  checked={settings?.persistSession}
                  onCheckedChange={(c) => {
                    setSettings({ persistSession: c });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sfx::open">Sound effects</label>
                <Switch
                  id="sfx::open"
                  disabled={!!session}
                  checked={settings?.useSoundEffects}
                  onCheckedChange={(c) => {
                    setSettings({ useSoundEffects: c });
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-center -space-x-2">
          <img src={HeroImage} alt="Hero image" className="w-[122px]" />
        </div>
        <Dialog>
          {({ setOpen }) => {
            return (
              <>
                <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0">
                  <RotateCcw className="size-5" />
                </DialogTrigger>
                <DialogContent>
                  <div className="p-4">
                    <h2 className="text-sm">
                      This will reset the current conversation, do you want to
                      continue?
                    </h2>
                  </div>
                  <div className="p-4 space-x-3 flex items-center justify-end">
                    <button
                      onClick={() => {
                        clearSession();
                        setOpen(false);
                      }}
                      className="bg-rose-400 text-white px-2 py-1 rounded-lg text-sm"
                    >
                      Yes
                    </button>
                    <DialogClose className="bg-transparent text-accent border px-2 py-1 rounded-lg text-sm">
                      No
                    </DialogClose>
                  </div>
                </DialogContent>
              </>
            );
          }}
        </Dialog>
      </div>
    </header>
  );
}

function HeaderChatDidNotStart() {
  const { session, clearSession, settings, setSettings } = useChat();
  return (
    <header
      className="p-3 gap-2 flex flex-col"
      style={{
        paddingBottom: "2rem",
      }}
    >
      <div className="w-full flex items-center justify-between">
        <Dialog>
          <DialogTrigger className="p-1.5 hidden rounded-full bg-accent/60 text-background">
            <XIcon className="size-5" />
          </DialogTrigger>
          <DialogContent>
            <div className="p-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">close the widget</h2>
              <DialogClose className="bg-transparent text-accent p-2 font-semibold">
                <XIcon className="size-4" />
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0">
            <SettingsIcon className="size-5" />
          </DialogTrigger>
          <DialogContent>
            <div className="p-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Settings</h2>
              <DialogClose className="bg-transparent text-accent p-1 font-semibold">
                <XIcon className="size-4" />
              </DialogClose>
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="persist-session::open">Persist session</label>
                <Switch
                  id="persist-session::open"
                  disabled={!!session}
                  checked={settings?.persistSession}
                  onCheckedChange={(c) => {
                    setSettings({ persistSession: c });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sfx::open">Sound effects</label>
                <Switch
                  id="sfx::open"
                  disabled={!!session}
                  checked={settings?.useSoundEffects}
                  onCheckedChange={(c) => {
                    setSettings({ useSoundEffects: c });
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          {({ setOpen }) => {
            return (
              <>
                <DialogTrigger className="p-1.5 rounded-full bg-accent/60 text-background">
                  <RotateCcw className="size-5" />
                </DialogTrigger>
                <DialogContent>
                  <div className="p-4">
                    <h2 className="text-sm">
                      This will reset the current conversation, do you want to
                      continue?
                    </h2>
                  </div>
                  <div className="p-4 space-x-3 flex items-center justify-end">
                    <button
                      onClick={() => {
                        clearSession();
                        setOpen(false);
                      }}
                      className="bg-rose-400 text-white px-2 py-1 rounded-lg text-sm"
                    >
                      Yes
                    </button>
                    <DialogClose className="bg-transparent text-accent border px-2 py-1 rounded-lg text-sm">
                      No
                    </DialogClose>
                  </div>
                </DialogContent>
              </>
            );
          }}
        </Dialog>
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center -space-x-2">
          <img src={HeroImage} alt="Hero image" className="w-1/2" />
        </div>
        <h2
          className="text-lg font-semibold text-background text-center"
          style={{
            textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
          }}
        >
          Got any question? Chat with us!
        </h2>

        <span
          className="text-sm text-white text-center"
          style={{
            textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
          }}
        >
          Typically respond in less than 1 minute
        </span>
      </div>
    </header>
  );
}
