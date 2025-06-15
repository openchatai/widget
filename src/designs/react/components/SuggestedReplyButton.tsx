import React from 'react';
import { Button, type ButtonProps } from './lib/button';
import { cn } from './lib/utils/cn';
import { OpenCxComponentName } from '../../../headless/core';

export function SuggestedReplyButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      data-component={OpenCxComponentName['chat_screen/suggested_reply_button']}
      size="sm"
      className={cn('rounded-full', className)}
      {...props}
    />
  );
}
