import { MessageTypeU } from '@core/types';
import { ComponentProps } from '@react/types';
import React from 'react';

type ChatEventComponentProps = ComponentProps<{
  event: MessageTypeU;
  message: string;
}>;

function ChatEventComponent(props: ChatEventComponentProps) {
  return (
    <div className="w-full relative py-3 my-2" data-test="chat-event-container">
      <span className="absolute top-1/2 left-0 right-0 h-px bg-secondary w-full" data-test="chat-event-divider" />
      <p className="text-secondary-foreground absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary p-1 text-xs rounded-lg w-fit text-center font-medium shadow-sm" data-test="chat-event-message">
        {props.data.message}
      </p>
    </div>
  );
}

export { ChatEventComponent, type ChatEventComponentProps };
