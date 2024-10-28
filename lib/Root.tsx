import React from "react";
import { ConfigDataProvider } from "./providers/ConfigDataProvider";
import { WidgetOptions } from "./types";
import { LocaleProvider } from "./providers/LocalesProvider";
import { ChatProvider } from "./providers/ChatProvider";

export function WidgetRoot({
    children,
    options,
}: {
    children: React.ReactNode;
    options: WidgetOptions;
}) {
    return (
        <ConfigDataProvider data={options}>
            <LocaleProvider>
                <ChatProvider>{children}</ChatProvider>
            </LocaleProvider>
        </ConfigDataProvider>
    );
}
