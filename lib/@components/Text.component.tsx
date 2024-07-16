import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "@lib/types";
import { BotMessageWrapper, Vote } from "@lib/components";

type Props = ComponentProps<{
  message: string;
}>;

/**
 * The Basic Text component
 */
export function Text({ id, data, serverId }: Props) {
  const { message } = data;
  return (
    <BotMessageWrapper id={id}>
      <div className="flex-1">
        <div className="w-fit">
          <div dir="auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose prose-slate !text-sm prose-sm max-w-full"
            >
              {message}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      {serverId &&
        <Vote serverMessageId={serverId} />
      }
    </BotMessageWrapper>
  );
}
