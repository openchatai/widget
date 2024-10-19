import { createSafeContext } from "@lib/utils/create-safe-context";
import { ElementType } from "react";
const [
    useWidget,
    WidgetProvider,
] = createSafeContext<{
    widgetRoot: ElementType | null;
}>();


export { WidgetProvider, useWidget };