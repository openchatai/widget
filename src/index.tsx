import React from "react";
import { version } from "../package.json";
import { WidgetOptions } from "../react-lib/types";
import { Widget, WidgetRoot } from "./designs/basic";
import { render } from "./render";

const defaultRootId = "opencx-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCXWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <Widget />
    </WidgetRoot>,
  );
}

window["initOpenScript"] = initOpenScript;
window["openCXWidgetVersion"] = version;
