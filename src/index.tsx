import React from "react";
import { version } from "../package.json";
import { WidgetOptions } from "../react-lib/types";
import { Widget } from "./designs/basic";
import { render } from "./render";

const defaultRootId = "opencopilot-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCopilotWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetOptions) {
  render(defaultRootId, <Widget options={options} />);
}

window["initOpenScript"] = initOpenScript;
window["openCopilotWidgetVersion"] = version;
