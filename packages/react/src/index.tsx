import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';
import type {
  ExternalStorage,
  LiteralWidgetComponentKey,
  WidgetConfig,
} from '@opencx/widget-core';
import {
  useWidgetTrigger,
  WidgetProvider,
  WidgetTriggerProvider,
  type WidgetComponentType,
} from '@opencx/widget-react-headless';
import { AgentMessageDefaultComponent } from './components/custom-components/AgentMessageDefaultComponent';
import { FallbackDefaultComponent } from './components/custom-components/FallbackDefaultComponent';
import { LoadingDefaultComponent } from './components/custom-components/LoadingDefaultComponent';
import { WidgetContent, WidgetPopoverContent } from './WidgetPopoverContent';
import { WidgetPopoverTrigger } from './WidgetPopoverTrigger';
import { WidgetPopoverAnchor } from './WidgetPopoverAnchor';

function WidgetPopoverTriggerAndContent() {
  const { isOpen, setIsOpen } = useWidgetTrigger();

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <WidgetPopoverAnchor />
      <WidgetPopoverTrigger />
      <WidgetPopoverContent />
    </PopoverPrimitive.Root>
  );
}

const defaultComponents: WidgetComponentType[] = [
  {
    key: 'loading' satisfies LiteralWidgetComponentKey,
    component: LoadingDefaultComponent,
  },
  {
    key: 'fallback' satisfies LiteralWidgetComponentKey,
    component: FallbackDefaultComponent,
  },
  {
    key: 'bot_message' satisfies LiteralWidgetComponentKey,
    component: AgentMessageDefaultComponent,
  },
  {
    key: 'agent_message' satisfies LiteralWidgetComponentKey,
    component: AgentMessageDefaultComponent,
  },
];

const storage: ExternalStorage = {
  get: async (key: string) => {
    return localStorage.getItem(key);
  },
  set: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  remove: async (key: string) => {
    localStorage.removeItem(key);
  },
};

function WidgetWrapper({
  options,
  components = [],
  loadingComponent,
}: {
  options: WidgetConfig;
  components?: WidgetComponentType[];
  loadingComponent?: React.ReactNode;
}) {
  return (
    <WidgetProvider
      components={[...defaultComponents, ...components]}
      options={options}
      storage={storage}
      loadingComponent={loadingComponent}
    >
      <WidgetTriggerProvider>
        {options.inline ? (
          <WidgetContent />
        ) : (
          <WidgetPopoverTriggerAndContent />
        )}
      </WidgetTriggerProvider>
    </WidgetProvider>
  );
}

export { WidgetWrapper as Widget };
