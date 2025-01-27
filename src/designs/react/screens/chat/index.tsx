import React from "react";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMain } from "./ChatMain";
import { useMessages, usePreludeData } from "../../../../headless/react";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from "../../constants";
import { cn } from "../../components/lib/utils/cn";
import { SuggestedReplies } from "../../components/SuggestedReplies";
import { Button } from "../../components/lib/button";

export function ChatScreen() {
  const { messagesState, sendMessage } = useMessages();
  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.data?.initialQuestions;
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  const noMessages = messagesState.messages.length === 0;

  return (
    <div
      ref={observedElementRef}
      data-test="chat-screen"
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background",
      )}
    >
      <div
        className="w-full h-full justify-between flex flex-col relative"
        data-test="chat-screen-content"
      >
        <ChatHeader />
        <div
          className="flex bg-background shadow-lg flex-col w-full flex-1 overflow-auto"
          data-test="chat-main-container"
        >
          <ChatMain />
          <footer data-test="chat-footer">
            {messagesState.suggestedReplies && (
              <SuggestedReplies
                data-test="chat-keyboard"
                options={messagesState.suggestedReplies}
                onKeyboardClick={(option) => {
                  const trimmed = option.trim();
                  if (!trimmed) return;
                  sendMessage({ content: trimmed });
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
                      sendMessage({ content: iq });
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
