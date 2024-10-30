import { createSafeContext } from "@lib/utils/create-safe-context";
import { ReactNode, useEffect, useMemo } from "react";
import { useConfigData } from "./ConfigDataProvider";
import { useSyncedState } from "@lib/hooks";
import { ConsumerType } from "@lib/types/schemas";
import { UserObject } from "@lib/types";
import { useAsyncFn } from "react-use";

type T = ConsumerType;

function _useContact() {
    const { http, botToken, user, collectUserData, widgetSettings } = useConfigData();
    const [contact, setContact] = useSyncedState<T | null>(`${botToken}:consumer:${user.external_id}`, null, "local");
    const [creatingContactState, createContactAsync] = useAsyncFn(async (user: UserObject) => {
        try {
            if (!user || !user.email) return null;
            const dumpContactResponse = await http.apis.dumpContact(user);
            if (dumpContactResponse?.data?.id) {
                setContact(dumpContactResponse.data);
            }
            return dumpContactResponse?.data;
        } catch (error) {
            console.error(error);
        }
        return null
    }, [http.apis]);

    useEffect(() => {
        if (user && botToken) {
            createContactAsync(user)
        }
    }, [user, botToken]);

    const shouldCollectData = useMemo(() => {
        if (!contact?.id && collectUserData) {
            return {
                should: true,
                reason: "No contact id and collectUserData is true"
            }
        }
        return {
            should: false,
        }
    }, [contact])
    return {
        creatingContactState,
        createContactAsync,
        contact,
        shouldCollectData
    }
}

const [useContact, SafeContactProvider] = createSafeContext<ReturnType<typeof _useContact>>()

function ContactProvider({ children }: { children: ReactNode }) {
    const value = _useContact()
    return <SafeContactProvider value={value}>{children}</SafeContactProvider>
}

export { ContactProvider, useContact }