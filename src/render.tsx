import React from "react";
import { createRoot } from "react-dom/client";

export function render(rootId: string, component: React.JSX.Element) {
  let rootElement = document.getElementById(rootId);
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = rootId;
    rootElement.setAttribute("data-chat-widget", "");
    document.body.appendChild(rootElement);
  }

  return createRoot(rootElement).render(component);
}
