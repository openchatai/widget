import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { useAsyncFn } from "react-use";

type CompletionFetcher = (input: string) => Promise<string[]>;

export function useChatCompletions(
    fetchCompletions: CompletionFetcher,
    debounceDelay = 300,
    minCharacters = 10,
    maxCharacters = 50
) {
    const [inputText, setInputText] = useState<string>("");
    const [completions, setCompletions] = useState<string[]>([]);
    const cache = useMemo(() => new Map<string, string[]>(), []);

    const [fetchCompletionsState, _fetchCompletionsDebounced] = useAsyncFn(
        async (input: string) => {
            if (cache.has(input)) {
                return cache.get(input)!;
            }
            const completions = await fetchCompletions(input);
            cache.set(input, completions); // Store in cache
            setCompletions(completions);
            return completions;
        },
        [fetchCompletions, debounceDelay]
    );

    const fetchCompletionsDebounced = useMemo(
        () => debounce(_fetchCompletionsDebounced, debounceDelay),
        [debounceDelay]
    );

    useEffect(() => {
        if (!inputText.trim() || inputText.trim().length < minCharacters) return;
        if (inputText.trim().length > maxCharacters) return;
        fetchCompletionsDebounced(inputText.trim());
    }, [inputText, fetchCompletionsDebounced]);

    return {
        inputText,
        completions,
        setInputText,
        fetchCompletionsState,
        setCompletions
    };
}
