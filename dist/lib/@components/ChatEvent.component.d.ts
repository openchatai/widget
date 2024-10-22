import { ComponentProps } from '../types';
import { MessageTypeEnum } from '../types/schemas';
type ChatEventComponentProps = ComponentProps<{
    event: MessageTypeEnum;
    message: string;
}>;
declare function ChatEventComponent(props: ChatEventComponentProps): import("react/jsx-runtime").JSX.Element;
export { ChatEventComponent, MessageTypeEnum, type ChatEventComponentProps };
