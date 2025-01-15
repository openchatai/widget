import React from "react";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";
import rehypeRaw from "rehype-raw";
import { RenderAttachment } from "@ui/RenderFile";
import { DefaultTextComponentProps } from "@react/types";

export function BotOrAgentTextResponse({
  data,
  id,
  type,
  attachments,
}: DefaultTextComponentProps) {
  const { message, variant = "default" } = data;

  if (variant === "error") {
    return (
      <div>
        <div className="gap-0.5 flex flex-row flex-wrap items-center justify-start">
          <div className="leading-snug font-medium text-sm text-rose-500">
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="gap-0.5 flex flex-row flex-wrap items-center justify-start">
        {attachments?.map((attachment) => {
          return (
            <RenderAttachment attachment={attachment} key={attachment.id} />
          );
        })}
      </div>
      <MemoizedReactMarkdown
        data-type={type}
        data-id={id}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ children, ...props }) => {
            return (
              <a target="_top" {...props}>
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
