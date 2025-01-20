import React from "react";
import { version } from "../../../package.json";
import { WidgetConfig } from "src/headless/core";
import { Widget, WidgetRoot } from "./basic";
import { render } from "./render";

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
