import { WidgetRoot } from "../lib/Root";
import { WidgetOptions } from "../lib/types";
import { IframedWidgetPopover } from "./iframed";
import { render } from "./render";

const defaultRootId = "opencopilot-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

export function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <IframedWidgetPopover />
    </WidgetRoot>
  );
}