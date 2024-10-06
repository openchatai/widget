import { ComponentProps } from "@lib/types"
import { MessageTypeEnum } from "@lib/types/schemas.backend";

type ChatEventComponentProps = ComponentProps<{
    event: MessageTypeEnum
    message: string;
}>


function ChatEventComponent(props: ChatEventComponentProps) {
    return <div className="w-full relative py-3">
        <span
            className="absolute top-1/2 left-0 right-0 h-px text-primary-foreground bg-secondary w-full"
        />
        <p className="text-primary-foreground absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary p-1 text-xs rounded-lg w-fit text-center font-medium shadow-sm">
            {props.data.message}
        </p>
    </div>
}

export {
    ChatEventComponent,
    MessageTypeEnum,
    type ChatEventComponentProps
}