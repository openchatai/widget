import { BotMessage } from "@lib/@components/BotMessage";
import { BotResponseWrapper } from "@lib/@components/BotMessageWrapper";
import { useChat, useChatCompletions, useConfigData, useLocale } from "@lib/index";
import {
  CircleDashed,
  SendHorizonal,
} from "lucide-react";
import React, {
  ComponentProps,
  ComponentType,
  useEffect,
  useMemo,
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
import * as Popover from "@radix-ui/react-popover";
import { Command } from 'cmdk';

function CompletionsRender({
  completions,
  onSelect,
  onInteractionOutside
}: {
  completions: string[];
  onSelect: (completion: string) => void;
  onInteractionOutside?: ComponentProps<typeof Popover.Content>['onInteractOutside'];
}) {
  if (completions.length === 0) {
    return null;
  }
  return (
    <Popover.Content
      sideOffset={10}
      style={{
        width: `var(--radix-popper-anchor-width)`
      }}
      asChild
      onInteractOutside={onInteractionOutside}
      side="top" align="center"
      className="bg-background h-fit scroll-smooth max-h-40 border shadow-md w-full rounded-xl p-1 overflow-y-auto z-10">
      <Command.List>
        <Command.Group>
          {completions.map((completion, index) => (
            <Command.Item
              key={index}
              className="p-2
          data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground
          cursor-pointer rounded-lg text-sm hover:bg-secondary hover:text-secondary-foreground transition-all"
              onSelect={() => onSelect(completion)}
            >
              {completion}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Popover.Content>
  );
}

function ChatFooter() {
  const { collectUserData, http } = useConfigData()
  const { inputText, setInputText, completions, setCompletions } = useChatCompletions(async (input) => {
    const resp = await http.apis.getCompletions(input);
    if (resp.data.completions) {
      return resp.data.completions;
    }
    return []
  }, 700);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, hookState } = useChat();
  const { contact } = useContact();
  const locale = useLocale();

  const shouldCollectDataFirst = collectUserData && !contact?.id;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputText(value);
  };

  async function handleInputSubmit(text: string) {
    if (text.trim().length === 0) {
      return;
    }
    sendMessage({
      content: {
        text,
      },
      user: {
        email: contact?.email || undefined,
        name: contact?.name || undefined,
        avatarUrl: contact?.avatar_url || undefined,
      }
    });
    setInputText("");
  }

  const isLoading = hookState.state === "loading";
  const shouldShowCompletions = completions.length > 0;
  const [showCompletions, setShowCompletions] = useState(shouldShowCompletions);
  useEffect(() => {
    if (inputRef.current){
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="p-3 relative">
      <Popover.Root
        open={showCompletions && shouldShowCompletions}>
        <Command loop>
          <Popover.Anchor asChild>
            <div className="flex rounded-xl items-center gap-2 bg-white border-[1.5px] border-zinc-200 p-2 transition-all shadow-sm">
              <input
                ref={inputRef}
                id='chat-input'
                disabled={isLoading || shouldCollectDataFirst}
                value={inputText}
                className="flex-1 outline-none py-0.5 text-zinc-900 text-sm bg-transparent placeholder:text-zinc-400"
                onChange={handleInputChange}
                onFocus={() => setShowCompletions(true)}
                onKeyDown={async (event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    await handleInputSubmit(inputText);
                  }
                }}
                placeholder={locale.get("write-a-message")}
              />
              <div className="flex-shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleInputSubmit(inputText)}
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
          </Popover.Anchor>
          <CompletionsRender
            completions={completions}
            onInteractionOutside={(event) => {
              const target = event.target as HTMLElement;
              if (target.closest("#chat-input")) {
                return;
              }
              setShowCompletions(false)
            }}
            onSelect={(completion) => {
              setInputText(completion);
              setCompletions([]);
              handleInputSubmit(completion);
            }}
          />
        </Command>
      </Popover.Root>
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
