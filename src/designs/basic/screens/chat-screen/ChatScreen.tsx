import { Button } from "src/components/lib/button";
import { Keyboard } from "src/components/keyboard";
import React from "react";
import {
  DEFAULT_STYLES,
  WIDGET_CONTENT_MAX_HEIGHT_PX,
} from "src/designs/constants";
import { cn } from "src/utils";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMain } from "./ChatMain";
import { useMessages, usePreludeData } from "react-web/core-integration";
import { useWidgetContentHeight } from "react-web/hooks/useWidgetContentHeight";

export function ChatScreen() {
  const { messages, messageCtx } = useMessages();
  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.data?.initialQuestions;
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  const noMessages = messages.messages.length === 0;

  return (
    <div
      ref={observedElementRef}
      data-test="chat-screen"
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0",
      )}
    >
      <div
        className="w-full h-full justify-between flex flex-col relative"
        data-test="chat-screen-content"
        style={{
          background:
            "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
        }}
      >
        <ChatHeader />
        <div
          className="flex bg-background shadow-lg flex-col w-full flex-1 overflow-auto"
          data-test="chat-main-container"
        >
          <ChatMain />
          <footer data-test="chat-footer">
            {messages.suggestedReplies && (
              <Keyboard
                data-test="chat-keyboard"
                options={messages.suggestedReplies}
                onKeyboardClick={(option) => {
                  const trimmed = option.trim();
                  if (!trimmed) return;
                  messageCtx.sendMessage({ content: trimmed });
                }}
              />
            )}

            {noMessages && initialQuestions && (
              <div
                className="flex items-center flex-row justify-end gap-2 flex-wrap px-2"
                data-test="initial-questions-container"
              >
                {initialQuestions?.map((iq, index) => (
                  <Button
                    key={index}
                    dir="auto"
                    variant="outline"
                    size="sm"
                    data-test={`initial-question-${index}`}
                    onClick={() => {
                      messageCtx.sendMessage({ content: iq });
                    }}
                  >
                    {iq}
                  </Button>
                ))}
              </div>
            )}

            <ChatFooter />
          </footer>
        </div>
      </div>
    </div>
  );
}
