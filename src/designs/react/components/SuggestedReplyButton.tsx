import React from 'react';
import { Button, type ButtonProps } from './lib/button';
import { cn } from './lib/utils/cn';
import { OpenCxComponentName } from '../../../headless/core';
import { useMessages } from '../../../headless/react';

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
      data-component={OpenCxComponentName['chat_screen/suggested_reply_button']}
      size="sm"
      className={cn('rounded-full w-fit', className)}
      {...props}
      onClick={handleSend}
    >
      {suggestion}
    </Button>
  );
}
