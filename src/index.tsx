import { WidgetRoot, WidgetOptions } from "@lib/index";
import { WidgetPopover } from "@lib/widget";
import { createRoot } from "react-dom/client";

const defaultRootId = "opencopilot-root";

export function initOpenScript(options: WidgetOptions, rootId?: string) {
  
  let rootElement = document.getElementById(rootId ?? defaultRootId);

  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = rootId || defaultRootId;
    document.body.appendChild(rootElement);
  }
  
  const root = createRoot(rootElement);
  if (root) {
    root.render(
      <WidgetRoot
        options={options}
      >
        <WidgetPopover />
      </WidgetRoot>
    );

  }
}

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

console.log("OpenCopilot script loaded");