import React from "react";
import { version } from "../../../package.json";
import { Widget, WidgetRoot } from "./basic";
import { render } from "./render";
import type { WidgetConfig } from "../../headless/core";

const defaultRootId = "opencx-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCXWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetConfig) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <Widget />
    </WidgetRoot>,
  );
}

window["initOpenScript"] = initOpenScript;
window["openCXWidgetVersion"] = version;
