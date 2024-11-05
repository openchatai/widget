import { useConfigData, useContact } from "@lib/index";

export function useShouldCollectUserData() {
    const { contact } = useContact();
    const { collectUserData } = useConfigData();

    const shouldCollectDataFirst = collectUserData && !contact?.id;

    return {
        shouldCollectDataFirst
    }
}