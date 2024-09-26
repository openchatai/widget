import React from "react";
import { ChatProvider, LocaleProvider } from "./providers";
import { ConfigDataProvider } from "./providers/ConfigDataProvider";
import { WidgetOptions } from "./types";

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
