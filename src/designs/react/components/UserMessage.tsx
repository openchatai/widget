import React from 'react';
import { type UserMessageType } from '../../../headless/core';
import { dc } from '../utils/data-component';
import { AttachmentPreview } from './AttachmentPreview';
import { cn } from './lib/utils/cn';

export function UserMessage({
  message,
  isFirstInGroup,
  isLastInGroup,
  isAloneInGroup,
}: {
  message: UserMessageType;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isAloneInGroup: boolean;
}) {
  return (
    <div
      {...dc('chat/user_msg/root')}
      className="w-5/6 flex flex-col items-end gap-1"
    >
      {message.attachments && message.attachments.length > 0 && (
        <div className="w-full flex gap-1 flex-wrap justify-end">
          {message.attachments?.map((attachment) => (
            <AttachmentPreview attachment={attachment} key={attachment.id} />
          ))}
        </div>
      )}
      {message.content.length > 0 && (
        <div
          {...dc('chat/user_msg/msg')}
          // Expose these data attributes for external styling customization
          data-first={isFirstInGroup}
          data-last={isLastInGroup}
          data-alone={isAloneInGroup}
          className={cn(
            'transition-all',
            'w-fit py-3 px-4 rounded-3xl text-sm',
            'bg-primary text-primary-foreground',
            'break-words [word-break:break-word]', // `[word-break:break-word]` is deprecated but works in the browser, while `break-words` which is `[overflow-wrap: break-word]` does not work
            'whitespace-pre-wrap',

            // We're using the booleans directly here, not the data attributes, to make any external styling more specific than this
            isFirstInGroup && !isAloneInGroup && 'rounded-br-md',
            isLastInGroup && !isAloneInGroup && 'rounded-tr-md',
            isAloneInGroup && 'rounded-r-md',
          )}
        >
          {message.content}
        </div>
      )}
    </div>
  );
}
