import { createSafeContext } from "@lib/utils/create-safe-context";
import { ReactNode, useEffect } from "react";
import { useConfigData } from "./ConfigDataProvider";
import { useAsyncFn, useSyncedState } from "@lib/hooks";
import { ConsumerType } from "@lib/types/schemas";
import { UserObject } from "@lib/types";

type T = ConsumerType;

function _useContact() {
    const { http, botToken, user, } = useConfigData();
    const [contact, setContact] = useSyncedState<T | null>(`${botToken}:consumer:[OPEN]`, null, "session");

    const [creatingContactState, createContactAsync] = useAsyncFn(async (user: UserObject) => {
        try {
            const dumpContactResponse = await http.apis.dumpContact(user);
            if (dumpContactResponse?.data?.id) {
                setContact(dumpContactResponse.data);
            }
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

    return {
        creatingContactState,
        createContactAsync,
        contact
    }
}

const [useContact, SafeContactProvider] = createSafeContext<ReturnType<typeof _useContact>>()

function ContactProvider({ children }: { children: ReactNode }) {
    const value = _useContact()
    return <SafeContactProvider value={value}>{children}</SafeContactProvider>
}

export { ContactProvider, useContact }