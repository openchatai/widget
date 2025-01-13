import { useChat } from "../ChatProvider";
import { usePubsub } from "./usePubsub";

export function useWidgetSettings() {
    const { config } = useChat();
    const settingsState = usePubsub(config.settingsState);
    return { settingsState, updateSettings: config.updateSettings };
}