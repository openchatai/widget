import React from "react";
import { ChatProvider, LanguageProvider } from "./providers";
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
            <LanguageProvider>
                <ChatProvider>{children}</ChatProvider>
            </LanguageProvider>
        </ConfigDataProvider>
    );
}
