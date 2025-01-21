import React from "react";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";
import rehypeRaw from "rehype-raw";
import { RenderAttachment } from "./RenderFile";
import type { DefaultTextComponentProps } from "../../../headless/react/types/components";

export function BotOrAgentTextResponse({
  data,
  id,
  type,
  attachments,
}: DefaultTextComponentProps) {
  const { message, variant = "default" } = data;

  if (variant === "error") {
    return (
      <div data-test="error-message-container">
        <div className="gap-0.5 flex flex-row flex-wrap items-center justify-start">
          <div
            className="leading-snug font-medium text-sm text-rose-500"
            data-test="error-message"
          >
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-test="message-container">
      <div
        className="gap-0.5 flex flex-row flex-wrap items-center justify-start"
        data-test="attachments-container"
      >
        {attachments?.map((attachment) => {
          return (
            <RenderAttachment
              data-test={`attachment-${attachment.id}`}
              attachment={attachment}
              key={attachment.id}
            />
          );
        })}
      </div>
      <MemoizedReactMarkdown
        data-test="message-content"
        data-type={type}
        data-id={id}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ children, ...props }) => {
            return (
              <a target="_top" {...props} data-test="message-link">
                {children}
              </a>
            );
          },
        }}
        className="leading-snug font-medium text-sm prose prose-a:decoration-primary prose-a:underline prose-sm prose-slate"
      >
        {message}
      </MemoizedReactMarkdown>
    </div>
  );
}
