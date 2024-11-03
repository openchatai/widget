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
import { usePreludeData } from "@lib/providers/usePreludeData";
import { WelcomeScreen } from "./WelcomeScreen";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce" />
      </div>
    </div>
  );
}

function ChatFooter() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, hookState } = useChat();
  const { collectUserData } = useConfigData()
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
    <div className="p-3">
      <div className="flex rounded-xl items-center gap-2 bg-white dark:bg-zinc-900 border-[1.5px] border-zinc-200 dark:border-zinc-800 p-2 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
        <input
          ref={inputRef}
          disabled={isLoading || shouldCollectDataFirst}
          value={input}
          className="flex-1 outline-none py-0.5 text-zinc-900 dark:text-zinc-100 text-sm bg-transparent placeholder:text-zinc-400"
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
        <div className="flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleInputSubmit}
                disabled={isLoading || shouldCollectDataFirst}
                className="rounded-md p-2 hover:bg-zinc-900/90 dark:hover:bg-zinc-800 transition-all text-white bg-zinc-900 dark:bg-zinc-800 disabled:opacity-50"
              >
                {isLoading ? (
                  <CircleDashed className="size-4 animate-spin animate-iteration-infinite" />
                ) : (
                  <SendHorizonal className="size-4 rtl:-scale-100" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              {locale.get("send-message")}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function ChatRenderer() {
  const { state, hookState } = useChat();
  const { componentStore, initialMessages, ...config } = useConfigData();

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
    className="max-h-full scroll-smooth relative flex-1 py-6 px-4 space-y-4 overflow-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent"
  >
    {/* Show initial messages only if there are no other messages */}
    <div className="space-y-4 max-w-3xl mx-auto w-full">
      {state.messages.length === 0 && (
        initialMessages?.map((message, index) => (
          <BotMessage
            key={index}
            message={{
              component: "text",
              data: { message },
              id: `initial-${index}`,
              serverId: null,
              type: "FROM_BOT",
            }}
            Wrapper={BotResponseWrapper}
            wrapperProps={{ agent: config.bot }}
          />
        )) ?? (
          <BotMessage
            key={"default-welcome"}
            message={{
              component: "text",
              data: { message: "Hello, how can I help?" },
              id: "default-welcome",
              serverId: null,
              type: "FROM_BOT",
              agent: config.bot
            }}
            Wrapper={BotResponseWrapper}
            wrapperProps={{ agent: config.bot }}
          />
        )
      )}

      {config.collectUserData && !state.messages.length && (
        <BotResponseWrapper agent={config.bot} className="w-full">
          <CollectDataForm />
        </BotResponseWrapper>
      )}

      {state.messages.map((message) => {
        if (message.type === "FROM_USER") {
          return (
            <UserMessage key={message.id} message={message} user={config.user}>
              {message.content}
            </UserMessage>
          );
        } else if (message.type === "FROM_BOT") {
          if (message.component === "CHAT_EVENT") {
            return <BotMessage message={message} key={message.id} />;
          }
          return (
            <BotMessage
              key={message.id}
              message={message}
              Wrapper={BotResponseWrapper}
              wrapperProps={{ agent: message.agent || config.bot }}
            />
          );
        }
        return null;
      })}
      {hookState.state === "loading" && (
        <BotResponseWrapper agent={config.bot}>
          <TypingIndicator />
        </BotResponseWrapper>
      )}
    </div>
  </div>
}


export function ChatScreen() {
  const { state, sendMessage, noMessages, handleKeyboard } = useChat();
  const { theme } = useConfigData();
  const preludeSWR = usePreludeData();
  const { contact } = useContact();
  const initialQuestions = preludeSWR.data?.initial_questions;

  // Show welcome screen if no contact exists
  if (!contact?.id) {
    return <WelcomeScreen />;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div className="size-full flex flex-col overflow-hidden bg-white dark:bg-zinc-950 backdrop-blur-sm z-10 origin-bottom absolute bottom-0 inset-x-0">
        <div className="w-full h-full flex flex-col relative">
          {theme.headerStyle === "compact" ? (<CompactHeader />) : (<BasicHeader />)}
          
          <div
            data-header-style={theme.headerStyle}
            className="flex bg-white dark:bg-zinc-950 shadow-sm data-[header-style=compact]:rounded-t-2xl flex-col w-full flex-1 overflow-auto relative"
          >
            <ChatRenderer />
            <footer className="border-t border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm relative">
              {state.keyboard && (
                <Keyboard
                  options={state.keyboard.options}
                  onKeyboardClick={handleKeyboard}
                />
              )}

              {noMessages && (
                <div className="items-center justify-end gap-1.5 flex-wrap px-3 pt-3">
                  {initialQuestions?.map((iq, index) => (
                    <button
                      key={index}
                      dir="auto"
                      className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 whitespace-nowrap rounded-md text-sm transition-colors"
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
              )}

              <ChatFooter />
            </footer>
          </div>
        </div>
        <SessionClosedDialog />
      </div>
    </TooltipProvider>
  );
}
