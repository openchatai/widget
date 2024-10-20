import { AsyncState, isResponseOk, useAsyncFn, useSyncedState } from "@lib/hooks";
import { useLifecycle } from "@lib/hooks/useLifecycle";
import { ChatSessionType, consumerSchema, ConsumerType } from "@lib/types/schemas";
import { createSafeContext } from "@lib/utils/create-safe-context";
import { type PropsWithChildren, useCallback, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";
import { useConfigData } from "./ConfigProvider";
import { debugAssert } from "@lib/utils/debug-assert";

type T = ConsumerType;
type ConversationsSWR = SWRResponse<ChatSessionType[] | null, any>;

const [
    useConsumer,
    SafeProvider,
] = createSafeContext<{
    consumer: T | null;
    creatingConsumerState: AsyncState<T | null>;
    clearConsumerData: () => void;
    refreshConsumer: () => Promise<T | null>;
    conversationsSWR: ConversationsSWR
}>();

const SESSION_KEY = (botToken: string, anotherKey?: string) => `open_consumer_${botToken}_${anotherKey ?? 'data'}`;

interface ConsumerProviderProps extends PropsWithChildren {
    storageKey?: string;
    onConsumerCreated?: (consumer: T) => void;
    defaultConsumer?: T;
}

function ConsumerProvider({ children, storageKey, onConsumerCreated, defaultConsumer }: ConsumerProviderProps) {
    const { botToken, userData, settings, apis, logger } = useConfigData();

    const _storageKey = storageKey ?? SESSION_KEY(botToken, userData.external_id)

    const strategy = settings?.keepUserData ? userData.external_id ? "local" : "session" : "session";

    const [_consumer, _setConsumer, bucket] = useSyncedState<T | null>(_storageKey, defaultConsumer ?? null, strategy);

    const [creatingConsumerState, createConsumerAsync] = useAsyncFn(async () => {
        try {
            const dumpContactResponse = await apis.dumpContact(userData);
            if (isResponseOk(dumpContactResponse.status) && dumpContactResponse?.data) {
                return dumpContactResponse.data
            }
        } catch (error) {
            logger?.error("Error creating consumer", error);
        }
        return null
    }, [userData, apis])


    useLifecycle(async () => {
        const isValidConsumer = consumerSchema.passthrough().nullable().safeParse(_consumer);

        // detect invalid storage data
        if (!isValidConsumer.success && _consumer) {
            bucket.removeItem(_storageKey)
        }

        if (isValidConsumer.success && isValidConsumer.data) {
            return
        }

        const data = await createConsumerAsync();
        if (data) {
            _setConsumer(data);
            onConsumerCreated?.(data);
        }
    })

    const refreshConsumer = useCallback(async () => {
        const data = await createConsumerAsync();
        if (data) {
            _setConsumer(data);
            onConsumerCreated?.(data);
        }
        return data
    }, [createConsumerAsync])

    const clearConsumerData = useCallback(() => {
        bucket.removeItem(_storageKey);
    }, [bucket]);

    const consumer = useMemo(() => {
        // for later to add extra properties. 
        if (!_consumer) {
            return null
        }
        return _consumer
    }, [_consumer]);

    const conversationsSWR = useSWR([consumer, _storageKey, apis.options], async () => {
        if (!consumer) return null;
        const response = await apis.fetchConversations(consumer.id);
        if (isResponseOk(response.status)) {
            return response.data
        }
        return null
    })
    logger?.debug("consumer", _consumer)
    debugAssert()(typeof _consumer === "object" || _consumer === null, "Consumer must be an object or null");

    return <SafeProvider
        value={{
            consumer,
            creatingConsumerState,
            clearConsumerData,
            refreshConsumer,
            conversationsSWR
        }}>
        {children}
    </SafeProvider>
}

export {
    useConsumer,
    ConsumerProvider
}