import { createRoot } from "react-dom/client";
import root from "react-shadow";
import { WidgetRoot } from "../lib/Root";
import styles from "../lib/index.css?inline";
import { WidgetOptions } from "../lib/types";
import { WidgetPopover } from "../lib/widget";
import packageJson from "../package.json";

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
    rootElement.setAttribute("data-chat-widget", "");
    document.body.appendChild(rootElement);
  }

  const _root = createRoot(rootElement);
  if (_root) {
    _root.render(
      <WidgetRoot options={options}>
        <root.div data-version={packageJson.version} style={{ fontSize: "16px", display: "contents" }}>
          <WidgetPopover />
          <style type="text/css">
            {styles}
          </style>
        </root.div>
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