import { ComponentRegistry } from "@lib/providers/componentRegistry";
import { useConfigData } from "@lib/providers/ConfigDataProvider";
import { BotMessageType } from "@lib/types";
import { ComponentType, useMemo } from "react";

export function BotMessage({
    message,
    index,
}: {
    message: BotMessageType;
    index: number;
}) {
    const config = useConfigData();

    const components = useMemo(() => (
        new ComponentRegistry({
            components: config.components
        })
    ), [config])

    const component = components.getComponent(message.component, config.debug);

    if (!component) {
        return null;
    }

    const Component = component as ComponentType<{
        data: BotMessageType["data"];
        id: string;
    }>;

    return (
        <Component
            {...message}
            data={message.data ?? {}}
            id={message.id}
            key={index}
        />
    );
}
