import React from 'react';
import remarkGfm from 'remark-gfm';
import { MemoizedReactMarkdown } from '../markdown';
import rehypeRaw from 'rehype-raw';
import { AttachmentPreview } from '../AttachmentPreview';
import type { WidgetComponentProps } from '../../../../headless/react/types/components';
import { cn } from '../lib/utils/cn';
import { useConfig } from '../../../../headless/react';
import type { OpenCxComponentNameU } from '../../../../headless/core';
import { dc } from '../../utils/data-component';

export function BotOrAgentResponse({
  data,
  id,
  type,
  attachments,
  isFirstInGroup,
  isLastInGroup,
  isAloneInGroup,
  dataComponentNames,
  classNames,
}: WidgetComponentProps & {
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isAloneInGroup: boolean;
  dataComponentNames?: {
    messageContainer?: OpenCxComponentNameU;
    message?: OpenCxComponentNameU;
  };
  classNames?: {
    messageContainer?: string;
    message?: string;
  };
}) {
  const { anchorTarget } = useConfig();
  const { message, variant = 'default' } = data;

  if (variant === 'error') {
    return (
      <div>
        <div className="flex flex-row flex-wrap items-center justify-start">
          <div className="leading-snug text-sm text-destructive">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...dc(dataComponentNames?.messageContainer ?? 'chat/agent_msg/root')}
      className={cn(
        'w-5/6 flex flex-col items-start gap-1',
        classNames?.messageContainer,
      )}
    >
      {attachments && attachments.length > 0 && (
        <div className="w-full gap-1 flex flex-row flex-wrap items-center justify-start">
          {attachments?.map((attachment) => (
            <AttachmentPreview attachment={attachment} key={attachment.id} />
          ))}
        </div>
      )}
      {message.length > 0 && (
        <div
          {...dc(dataComponentNames?.message ?? 'chat/agent_msg/msg')}
          // Expose these data attributes for external styling customization
          data-first={isFirstInGroup}
          data-last={isLastInGroup}
          data-alone={isAloneInGroup}
          className={cn(
            'transition-all',
            'w-fit py-3 px-4 rounded-3xl bg-secondary text-secondary-foreground',
            'leading-snug text-sm prose prose-sm prose-a:decoration-primary prose-a:underline',
            'break-words [word-break:break-word]', // `[word-break:break-word]` is deprecated but works in the browser, while `break-words` which is `[overflow-wrap: break-word]` does not work
            // No need to add "whitespace-pre-wrap" in the agent or bot message because it is markup and content appear on separate lines as expected
            // Adding "whitespace-pre-wrap" will result in unnecessarily huge line breaks

            // We're using the booleans directly here, not the data attributes, to make any external styling more specific than this
            isFirstInGroup && !isAloneInGroup && 'rounded-bl-md',
            isLastInGroup && !isAloneInGroup && 'rounded-tl-md',
            !isFirstInGroup &&
              !isLastInGroup &&
              !isAloneInGroup &&
              'rounded-l-md',
            classNames?.message,
          )}
        >
          <MemoizedReactMarkdown
            data-type={type}
            data-id={id}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ children, ...props }) => {
                return (
                  <a target={anchorTarget ?? '_top'} {...props}>
                    {children}
                  </a>
                );
              },
            }}
            // Do not pass className directly to ReactMarkdown component because that will create a container div wrapping the rich text
          >
            {message}
          </MemoizedReactMarkdown>
        </div>
      )}
    </div>
  );
}
