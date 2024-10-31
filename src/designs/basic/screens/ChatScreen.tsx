import { BotMessage } from "@lib/@components/BotMessage";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import { useChat, useConfigData, useLocale } from "@lib/index";
import { AnimatePresence, motion } from "framer-motion";
import {
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
import { CompactHeader } from "./ChatScreenHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";
import { UserMessage } from "@ui/userMessage";
import { Keyboard } from "@ui/keyboard";
import { CollectDataForm } from "./CollectDataForm";
import { useContact } from "@lib/index";
import { BasicHeader } from "./BasicHeader";
import { SessionClosedDialog } from "./SessionClosedDialog";

function Info() {
  const { info } = useChat();
  const layoutId = useId();

  return <div className="relative w-full top-0 overflow-hidden h-5 px-1">
    <AnimatePresence>
      {info && (
        <motion.div
          key={info.toString()}
          className="absolute w-full text-xs text-accent-foreground"
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
  const { collectUserData, theme } = useConfigData()
  const { contact } = useContact();
  const locale = useLocale();

  const shouldCollectDataFirst = collectUserData && !contact?.id;

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
      user: {
        email: contact?.email || undefined,
        name: contact?.name || undefined,
        avatarUrl: contact?.avatar_url || undefined,
      }
    });

    setInput("");
  }

  const isLoading = hookState.state === "loading";

  return (
    <div className="p-2 rounded-lg relative">
      {
        !theme.hideInfoBar && <Info />
      }

      <div
        className="flex rounded-lg shadow-sm items-center gap-2 bg-foreground border border-border px-2 transition-all py-1.5"
      >
        <input
          ref={inputRef}
          disabled={isLoading || shouldCollectDataFirst}
          value={input}
          className="flex-1 outline-none p-1 text-accent-foreground text-sm bg-transparent placeholder:text-opacity-50"
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
          <Tooltip>
            <TooltipContent>
              {locale.get("send-message")}
            </TooltipContent>
            <TooltipTrigger asChild>
              <button
                onClick={handleInputSubmit}
                disabled={isLoading || shouldCollectDataFirst}
                className="rounded-lg p-2 hover:brightness-110 transition-all text-foreground bg-primary shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <CircleDashed className="size-3.5 animate-spin animate-iteration-infinite" />
                ) : (
                  <SendHorizonal className="size-3.5 rtl:-scale-100" />
                )}
              </button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function ChatRenderer() {
  const { state, hookState } = useChat();
  const { componentStore, initialMessages, preludeSWR, ...config } = useConfigData();

  const LoadingComponent = componentStore.getComponent(
    "loading"
  ) as ComponentType;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  return <div
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
        }}
        Wrapper={BotResponseWrapper}
        wrapperProps={{ agent: config.bot }}
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
            agent: config.bot
          }}
          Wrapper={BotResponseWrapper}
          wrapperProps={{ agent: config.bot }}
        />
      )}

    {
      config.collectUserData &&
      <BotResponseWrapper agent={config.bot} className="w-full">
        <CollectDataForm />
      </BotResponseWrapper>
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
            wrapperProps={{ agent: message.agent }}
          />
        );
      }
      return null;
    })}
    {hookState.state === "loading" && <LoadingComponent />}
  </div>
}


export function ChatScreen() {
  const { state, sendMessage, noMessages, handleKeyboard } = useChat();
  const { preludeSWR, theme } = useConfigData();
  const initialQuestions = preludeSWR.data?.initial_questions;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="size-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0">
        <div
          className="w-full h-full justify-between flex flex-col relative"
          style={{
            background:
              "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
          }}
        >
          {theme.headerStyle === "compact" ? (<CompactHeader />) : (<BasicHeader />)}

          <div
            data-header-style={theme.headerStyle}
            className="flex bg-background shadow-lg data-[header-style=compact]:rounded-t-2xl flex-col w-full flex-1 overflow-auto">
            <ChatRenderer />
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
