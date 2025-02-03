import React from "react";
import { createRoot } from "react-dom/client";
import { version } from "../../package.json";
import type { WidgetConfig } from "../headless/core";
import { Widget } from "../designs/react";

const defaultRootId = "opencx-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCXWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetConfig) {
  render(defaultRootId, <Widget options={options} />);
}

window["initOpenScript"] = initOpenScript;
window["openCXWidgetVersion"] = version;

export function render(rootId: string, component: React.JSX.Element) {
  let rootElement = document.getElementById(rootId);
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = rootId;
    document.body.appendChild(rootElement);
  }

  // Set the attribute on the div whether it existed or was just created by this function... without this attribute, styles won't work
  rootElement.setAttribute("data-chat-widget", "");

  return createRoot(rootElement).render(component);
}
