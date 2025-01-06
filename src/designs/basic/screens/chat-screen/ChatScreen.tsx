import { useWidgetContentHeight } from "@react/hooks";
import { useChat } from "@react/index";
import { usePreludeData } from "@react/providers/usePreludeData";
import { Button } from "@ui/button";
import { Keyboard } from "@ui/keyboard";
import React from "react";
import {
  DEFAULT_STYLES,
  WIDGET_CONTENT_MAX_HEIGHT_PX,
} from "src/designs/constants";
import { cn } from "src/utils";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMain } from "./ChatMain";

export function ChatScreen() {
  const { state, sendMessage, noMessages, handleKeyboard } = useChat();
  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.initial_questions;
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  return (
    <div
      ref={observedElementRef}
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0",
      )}
    >
      <div
        className="w-full h-full justify-between flex flex-col relative"
        style={{
          background:
            "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)",
        }}
      >
        <ChatHeader />
        <div className="flex bg-background shadow-lg flex-col w-full flex-1 overflow-auto">
          <ChatMain />
          <footer>
            {state.keyboard && (
              <Keyboard
                options={state.keyboard.options}
                onKeyboardClick={handleKeyboard}
              />
            )}

            {noMessages && initialQuestions && (
              <div className="flex items-center flex-row justify-end gap-2 flex-wrap px-2">
                {initialQuestions?.map((iq, index) => (
                  <Button
                    key={index}
                    dir="auto"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      sendMessage({
                        content: { text: iq },
                      });
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
