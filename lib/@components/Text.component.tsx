import { ComponentProps } from "@lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
export type DefaultTextComponentProps = ComponentProps<{
    message: string
}>;

export function BotTextResponse({ data, id, responseFor, type }: DefaultTextComponentProps) {
    return <ReactMarkdown
        data-type={type}
        data-id={id}
        remarkPlugins={[remarkGfm]}
        data-response-for={responseFor}
        className='leading-snug font-medium text-sm'>
        {data.message}
    </ReactMarkdown>
}
