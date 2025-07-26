import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';
import type {
  ExternalStorage,
  LiteralWidgetComponentKey,
  WidgetConfig,
} from '../../headless/core';
import {
  useWidgetTrigger,
  WidgetProvider,
  WidgetTriggerProvider,
  type WidgetComponentType,
  type WidgetModeComponentType,
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
    key: 'loading' satisfies LiteralWidgetComponentKey,
    component: BotLoadingComponent,
  },
  {
    key: 'fallback' satisfies LiteralWidgetComponentKey,
    component: FallbackComponent,
  },
  {
    key: 'bot_message' satisfies LiteralWidgetComponentKey,
    component: BotOrAgentResponse,
  },
  {
    key: 'agent_message' satisfies LiteralWidgetComponentKey,
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
  modesComponents = [],
  loadingComponent,
}: {
  options: WidgetConfig;
  components?: WidgetComponentType[];
  modesComponents?: WidgetModeComponentType[];
  loadingComponent?: React.ReactNode;
}) {
  return (
    <WidgetProvider
      components={[...defaultComponents, ...components]}
      modesComponents={modesComponents}
      options={options}
      storage={storage}
      loadingComponent={loadingComponent}
    >
      <WidgetTriggerProvider>
        <WidgetTriggerAndContent />
      </WidgetTriggerProvider>
    </WidgetProvider>
  );
}

export { WidgetWrapper as Widget };
