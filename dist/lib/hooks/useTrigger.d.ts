declare function useTrigger({ handleClick, triggerId, }: {
    handleClick: (event: MouseEvent, _ref: HTMLElement) => void;
    triggerId?: string;
}): HTMLElement | null;
export { useTrigger };
