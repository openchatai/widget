import React from 'react';
import { Button, type ButtonProps } from './lib/button';
import { cn } from './lib/utils/cn';
import { useMessages } from '../../../headless/react';
import { dc } from '../utils/data-component';

export function SuggestedReplyButton({
  suggestion,
  className,
  ...props
}: ButtonProps & { suggestion: string }) {
  const { sendMessage } = useMessages();

  const handleSend = () => {
    const trimmed = suggestion.trim();
    if (!trimmed) return;
    sendMessage({ content: trimmed });
  };

  return (
    <Button
      {...dc('chat/suggested_reply_btn')}
      size="sm"
      variant="outline"
      className={cn('rounded-xl w-fit', className)}
      {...props}
      onClick={handleSend}
    >
      {suggestion}
    </Button>
  );
}
