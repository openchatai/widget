import { createRoot } from "react-dom/client";
import styles from "../lib/index.css?inline";
import { WidgetOptions } from "../lib/types";
import { WidgetRoot } from "../lib/widget";
import { WidgetPopover } from "../lib/widget";

const defaultRootId = "opencopilot-root";

const IS_SERVER = typeof window === "undefined";

export function initOpenScript(options: WidgetOptions, rootId?: string) {
  if (IS_SERVER) {
    return;
  }

  let rootElement = document.getElementById(rootId ?? defaultRootId);

  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = rootId || defaultRootId;
    document.body.appendChild(rootElement);
  }

  const root = createRoot(rootElement);
  if (root) {
    root.render(
      <WidgetRoot options={options}>
        <style>{styles}</style>
        <WidgetPopover />
      </WidgetRoot>,
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
