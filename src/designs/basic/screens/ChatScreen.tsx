import { BotMessage } from "@lib/@components/BotMessage";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import { useChat, useConfigData, useLocale } from "@lib/index";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { UserMessage } from "@ui/userMessage";
import { Keyboard } from "@ui/keyboard";
import { useContact } from "@lib/index";
import { BasicHeader } from "./BasicHeader";
import { SessionClosedDialog } from "./SessionClosedDialog";
import { usePreludeData } from "@lib/providers/usePreludeData";
import { useShouldCollectUserData } from "src/hooks/useShouldCollectData";
import { WelcomeScreen } from "./WelcomeScreen";

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
      <div className="flex rounded-xl items-center gap-2 bg-white border-[1.5px] border-zinc-200  p-2 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
        <input
          ref={inputRef}
          disabled={isLoading || shouldCollectDataFirst}
          value={input}
          className="flex-1 outline-none py-0.5 text-zinc-900 text-sm bg-transparent placeholder:text-zinc-400"
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
                className="rounded-md p-2 hover:brightness-90 transition-all text-foreground bg-primary disabled:opacity-50"
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
    className="max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto"
  >

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
  const { theme } = useConfigData();
  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.initial_questions;
  const { shouldCollectDataFirst } = useShouldCollectUserData();
  
  if (shouldCollectDataFirst) return <WelcomeScreen />;

  return (
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
  );
}
