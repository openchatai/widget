import { WidgetRoot } from "../lib/Root";
import styles from "../lib/index.css?inline";
import { WidgetOptions } from "../lib/types";
import packageJson from "../package.json";
import { WidgetPopover } from "./designs/basic";
import { IframedWidgetPopover } from "./iframed";
import { render } from "./render";

const defaultRootId = "opencopilot-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;
function initIframedScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <IframedWidgetPopover />
    </WidgetRoot>
  );
}

export function initOpenScript(options: WidgetOptions, mode: "default" | "iframed" = "default") {
  if (mode === "iframed") {
    initIframedScript(options);
    return;
  }
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <style type="text/css" data-version={packageJson.version}>
        {styles}
      </style>
      <WidgetPopover />
    </WidgetRoot>
  );
}