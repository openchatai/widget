import { ComponentProps } from "@lib/types";

type ResolveComponentPropsType = ComponentProps<undefined>;

function ResolveComponent(props: ResolveComponentPropsType) {
    return <div data-message-id={props.id}>
        <p className="leading-snug font-medium text-sm">
            Your issue has been resolved!
        </p>
    </div>
}

export {
    ResolveComponent,
    type ResolveComponentPropsType
}