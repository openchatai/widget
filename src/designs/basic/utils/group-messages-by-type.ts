import {
  AgentMessageType,
  BotMessageType,
  MessageType,
  UserMessageType,
} from "@core/types";

export function groupMessagesByType(messages: MessageType[]): MessageType[][] {
  const result: MessageType[][] = [];
  let currentGroup: MessageType[] | null = null;

  messages.forEach((message) => {
    // Start a new group if the type changes
    if (!currentGroup || currentGroup[0].type !== message.type) {
      currentGroup = [];
      result.push(currentGroup);
    }
    // Start a new group if the agent changes
    if (
      currentGroup[0]?.type === "FROM_AGENT" &&
      message.type === "FROM_AGENT" &&
      message.agent?.id !== currentGroup[0].agent?.id
    ) {
      currentGroup = [];
      result.push(currentGroup);
    }
    currentGroup.push(message);
  });

  return result;
}

export function isUserMessageGroup(
  messages: MessageType[],
): messages is UserMessageType[] {
  return messages?.[0].type === "FROM_USER";
}

export function isBotMessageGroup(
  messages: MessageType[],
): messages is BotMessageType[] {
  return messages?.[0].type === "FROM_BOT";
}

export function isAgentMessageGroup(
  messages: MessageType[],
): messages is AgentMessageType[] {
  return messages?.[0].type === "FROM_AGENT";
}
