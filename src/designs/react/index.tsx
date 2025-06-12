import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';
import type { ExternalStorage, WidgetConfig } from '../../headless/core';
import {
  useWidgetTrigger,
  WidgetProvider,
  WidgetTriggerProvider,
  type WidgetComponentType,
} from '../../headless/react';
import { BotOrAgentResponse } from './components/custom-components/BotOrAgentTextResponse.component';
import { FallbackComponent } from './components/custom-components/Fallback.component';
import { BotLoadingComponent } from './components/custom-components/Loading.component';
import { WidgetPopoverContent } from './WidgetPopoverContent';
import { WidgetPopoverTrigger } from './WidgetPopoverTrigger';
import { WidgetPopoverAnchor } from './WidgetPopoverAnchor';

function WidgetTriggerAndContent() {
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
    key: 'loading',
    component: BotLoadingComponent,
  },
  {
    key: 'fallback',
    component: FallbackComponent,
  },
  {
    key: 'bot_message',
    component: BotOrAgentResponse,
  },
  {
    key: 'agent_message',
    component: BotOrAgentResponse,
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
}: {
  options: WidgetConfig;
  components?: WidgetComponentType[];
}) {
  return (
    <WidgetProvider
      components={[...defaultComponents, ...components]}
      options={options}
      storage={storage}
    >
      <WidgetTriggerProvider>
        <WidgetTriggerAndContent />
      </WidgetTriggerProvider>
    </WidgetProvider>
  );
}

export { WidgetWrapper as Widget };
