import { ComponentProps } from "@lib/types";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";

export type DefaultTextComponentProps = ComponentProps<{
  message: string;
}>;

export function BotTextResponse({
  data,
  id,
  type,
}: DefaultTextComponentProps) {
  return (
    <MemoizedReactMarkdown
      data-type={type}
      data-id={id}
      remarkPlugins={[remarkGfm]}
      className="leading-snug font-medium text-sm prose prose-a:decoration-primary prose-a:underline prose-sm prose-slate"
    >
      {data.message}
    </MemoizedReactMarkdown>
  );
}
