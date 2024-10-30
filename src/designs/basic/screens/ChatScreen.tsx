import { BotMessage } from "@lib/@components/BotMessage";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import { useChat, useConfigData, useLocale } from "@lib/index";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCheckIcon,
  CircleDashed,
  SendHorizonal,
} from "lucide-react";
import React, {
  ComponentType,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { HeaderChatDidNotStart, HeaderChatRunning } from "./ChatScreenHeader";
import { Dialog, DialogContent } from "@ui/dialog";
import { TooltipProvider } from "@ui/tooltip";
import { UserMessage } from "@ui/messages";
import { Keyboard } from "@ui/keyboard";
import { CollectDataForm } from "./CollectDataForm";

function Info() {
  const { info } = useChat();
  const layoutId = useId();

  return <div className="relative w-full top-0 overflow-hidden h-5 px-1">
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
}

function ChatFooter() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, hookState } = useChat();
  const locale = useLocale();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  async function handleInputSubmit() {
    if (input.trim().length === 0) {
      return;
    }

    sendMessage({
      content: {
        text: input,
      },
    });

    setInput("");
  }

  const isLoading = hookState.state === "loading";

  return (
    <div className="p-2 rounded-lg relative">
      <Info />
      <div
        className="flex rounded-lg shadow-sm items-center gap-2 bg-white border border-gray-200 focus-within:border-gray-300 px-2 transition-all py-1.5"
      >
        <input
          ref={inputRef}
          disabled={isLoading}
          value={input}
          className="flex-1 outline-none p-1 text-accent text-sm bg-transparent !placeholder-text-sm placeholder-font-100 placeholder:text-primary-foreground/50"
          onChange={handleInputChange}
          autoFocus
          tabIndex={0}
          onKeyDown={async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              await handleInputSubmit();
            }
          }}
          placeholder={locale.get("write-a-message")}
        />
        <div>
          <button
            onClick={handleInputSubmit}
            disabled={isLoading}
            className="rounded-lg p-2 hover:brightness-110 transition-all text-white bg-primary shrink-0 disabled:opacity-50"
          >
            {isLoading ? (
              <CircleDashed className="size-3.5 animate-spin animate-iteration-infinite" />
            ) : (
              <SendHorizonal className="size-3.5 rtl:-scale-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionClosedDialog() {
  const { session, recreateSession } = useChat();
  const locale = useLocale();

  // there is a session and it's closed
  if (session && session.isSessionClosed !== true) return null;

  return (
    <Dialog open={session?.isSessionClosed}>
      <DialogContent>
        <header className="flex items-center gap-1">
          <CheckCheckIcon className="size-5 text-emerald-500" />
          <h2 className="text-base font-semibold" dir="auto">
            {locale.get("session-closed-lead")}
          </h2>
        </header>
        <footer className="grid mt-2">
          <button
            onClick={recreateSession}
            className="text-sm font-medium hover:brightness-110 whitespace-nowrap px-3 py-2 bg-primary text-white rounded-md"
          >
            {locale.get("create-new-ticket")}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

export function ChatScreen() {
  const { state, sendMessage, noMessages, handleKeyboard, hookState } =
    useChat();
  const { componentStore, initialMessages, preludeSWR, ...config } =
    useConfigData();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const initialQuestions = preludeSWR.data?.initial_questions;

  function handleNewMessage() {
    setTimeout(() => {
      const container_ = messagesContainerRef.current;
      if (container_) {
        container_.scrollTop = container_.scrollHeight;
      }
    }, 0);
  }
  useEffect(() => {
    handleNewMessage();
  }, [state.messages]);

  const LoadingComponent = componentStore.getComponent(
    "loading"
  ) as ComponentType;
  return (
    <TooltipProvider delayDuration={100}>
      <div className="size-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0">
        <div
          className="w-full mesh-gradient rounded-xl h-full justify-between rounded-t-xl flex flex-col relative"
          style={{
            background:
              "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
          }}
        >
          {noMessages ? <HeaderChatDidNotStart /> : <HeaderChatRunning />}
          <div
            className="flex rounded-xl shadow-lg flex-col w-full flex-1 rounded-t-xl overflow-auto"
            style={{
              background: "#FAFBFB",
            }}
          >
            <div
              data-messages
              ref={messagesContainerRef}
              className="max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto"
            >
              {initialMessages?.map((message, index) => (
                <BotMessage
                  key={index}
                  message={{
                    component: "text",
                    data: { message },
                    id: "000",
                    serverId: null,
                    type: "FROM_BOT",
                    bot: config.bot,
                  }}
                  Wrapper={BotResponseWrapper}
                  wrapperProps={{ bot: config.bot }}
                />
              )) ?? (
                  <BotMessage
                    key={"0001"}
                    message={{
                      component: "text",
                      data: { message: "Hello, how can I help?" },
                      id: "000",
                      serverId: null,
                      type: "FROM_BOT",
                      bot: config.bot,
                    }}
                    Wrapper={BotResponseWrapper}
                    wrapperProps={{ bot: config.bot }}
                  />
                )}
              {
                config.collectUserData && (
                  <CollectDataForm />
                )
              }
              {state.messages.map((message) => {
                if (message.type === "FROM_USER") {
                  return (
                    <UserMessage key={message.id} message={message} user={config.user}>
                      {message.content}
                    </UserMessage>
                  );
                } else if (message.type === "FROM_BOT") {
                  if (message.component == "CHAT_EVENT") {
                    return <BotMessage message={message} key={message.id} />;
                  }
                  return (
                    <BotMessage
                      key={message.id}
                      message={message}
                      Wrapper={BotResponseWrapper}
                      wrapperProps={{ bot: message.bot }}
                    />
                  );
                }
                return null;
              })}
              {hookState.state === "loading" && <LoadingComponent />}
            </div>
            <footer>
              {state.keyboard && (
                <React.Fragment>
                  <Keyboard
                    options={state.keyboard.options}
                    onKeyboardClick={handleKeyboard}
                  />
                </React.Fragment>
              )}

              <React.Fragment>
                {noMessages && (
                  <React.Fragment>
                    <div className="items-center justify-end mb-3 gap-1 flex-wrap p-1">
                      {initialQuestions?.map((iq, index) => (
                        <button
                          key={index}
                          dir="auto"
                          className="px-2 py-1.5 border whitespace-nowrap rounded-lg text-sm font-300"
                          onClick={() => {
                            sendMessage({
                              content: { text: iq },
                            });
                          }}
                        >
                          {iq}
                        </button>
                      ))}
                    </div>
                  </React.Fragment>
                )}

                <ChatFooter />
              </React.Fragment>
            </footer>
          </div>
        </div>
        <SessionClosedDialog />
      </div>
    </TooltipProvider>
  );
}
