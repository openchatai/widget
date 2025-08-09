import { useWidget, type WidgetComponentProps } from '@opencx/widget-react-headless';
import React from 'react';
import { BotOrAgentResponse } from './custom-components/BotOrAgentTextResponse.component';

export function BotOrAgentMessage({
  isFirstInGroup,
  isLastInGroup,
  isAloneInGroup,
  ...props
}: WidgetComponentProps & {
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isAloneInGroup: boolean;
}) {
  const { componentStore } = useWidget();

  // Try to use custom components first
  if (props.data.action) {
    const Component = componentStore.getComponent(props.data.action.name);
    if (Component) {
      return (
        <Component
          {...props}
          id={props.id}
          isFirstInGroup={isFirstInGroup}
          isLastInGroup={isLastInGroup}
          isAloneInGroup={isAloneInGroup}
        />
      );
    }
  }

  const Component = componentStore.getComponent(props.component);

  if (!Component) {
    // Fallback... just in case
    return (
      <BotOrAgentResponse
        {...props}
        isFirstInGroup={isFirstInGroup}
        isLastInGroup={isLastInGroup}
        isAloneInGroup={isAloneInGroup}
      />
    );
  }

  return (
    <Component
      {...props}
      id={props.id}
      isFirstInGroup={isFirstInGroup}
      isLastInGroup={isLastInGroup}
      isAloneInGroup={isAloneInGroup}
    />
  );
}
