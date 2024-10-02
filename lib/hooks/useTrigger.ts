import React from "react";

function useTrigger({
    handleClick,
    triggerId,
}: {
    handleClick: (event: MouseEvent, _ref: HTMLElement) => void;
    triggerId?: string;
}) {
    const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (triggerId) {
            const trigger = document.getElementById(triggerId);
            if (trigger) {
                setTrigger(trigger);
            }
            return () => {
                setTrigger(null);
            };
        }
    }, [triggerId]);

    React.useEffect(() => {

        if (trigger) {
            const eventListener = (ev: MouseEvent) => {
                handleClick(ev, trigger);
            };

            trigger.addEventListener("click", eventListener);

            return () => {
                trigger.removeEventListener("click", eventListener);
            };
        }
    }, [handleClick, trigger]);

    return trigger
}

export { useTrigger };
