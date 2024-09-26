"use client";
import "./index.css";
export { Widget, WidgetPopover } from "./widget";
export * from "./@components";
export * from "./types";
export * from "./utils";
export * from "./hooks";
export {
    ComponentRegistry,
    useChat,
    useLocale as useLang,
    useConfigData,
} from "./providers";
export { WidgetRoot } from "./Root";