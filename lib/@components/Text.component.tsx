import { ComponentProps } from "@lib/types";

export type DefaultTextComponentProps = ComponentProps<{
    message: string
}>;

export function BotTextResponse({ data, id, responseFor, type }: DefaultTextComponentProps) {
    return <p
        data-type={type}
        data-id={id}
        data-response-for={responseFor}
        className='leading-snug font-medium text-sm'>
        {data.message}
    </p>
}
