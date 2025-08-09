import React from 'react';
import { createRoot } from 'react-dom/client';
import { version } from '../package.json';
import type { WidgetConfig } from '@opencx/widget-core';
import { Widget } from '../src';

const defaultRootId = 'opencx-root';

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCXWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetConfig) {
  render(defaultRootId, <Widget options={options} />);
}

window.initOpenScript = initOpenScript;
window.openCXWidgetVersion = version;

export function render(rootId: string, component: React.JSX.Element) {
  let rootElement = document.getElementById(rootId);
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = rootId;
    document.body.appendChild(rootElement);
  }

  return createRoot(rootElement).render(component);
}
