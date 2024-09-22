import { ComponentProps } from "@lib/types";

type FollowupComponentProps = ComponentProps<{
    question: string;
    choices: [{
        label: string;
        value: "no"
    }, {
        label: string;
        value: "yes"
    }];
}>


export function FollowupComponent(props: FollowupComponentProps) {
    return <div className="w-full">
        <p className="text-sm">
            {props.data.question}
        </p>
        <div className="flex items-center gap-2">
            <button className="bg-secondary text-xs font-medium p-1 rounded-lg">
                Yes, my issue is resolved
            </button>
            <button className="bg-secondary text-xs font-medium p-1 rounded-lg">
                No, thanks
            </button>
        </div>
    </div>
}
