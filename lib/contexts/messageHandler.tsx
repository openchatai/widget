import { produce } from "immer";
import { Socket } from "socket.io-client";
import { ComponentRegistry } from "./componentRegistry.ts";
import type {
  BotMessageType,
  HandoffPayloadType,
  MessageType,
  UserMessageType,
} from "@lib/types";

function decodeJSON<T extends Record<string, any>>(
  jsonString: string
): T | null {
  try {
    const parsed = JSON.parse(
      typeof jsonString === "string" ? jsonString : JSON.stringify(jsonString)
    );
    if (typeof parsed === "object" && parsed !== null) {
      const parseNestedJSON = (obj: Record<string, any>) => {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === "string") {
              if (
                (value.startsWith("{") && value.endsWith("}")) ||
                (value.startsWith("[") && value.endsWith("]"))
              ) {
                try {
                  obj[key] = JSON.parse(value);
                } catch (e) {
                  console.error(
                    `Failed to parse nested JSON for key "${key}": ${e}`
                  );
                }
              }
            } else if (typeof value === "object" && value !== null) {
              parseNestedJSON(value);
            }
          }
        }
      };

      parseNestedJSON(parsed);
      return parsed as T;
    }

    return null;
  } catch (e) {
    console.error(`Failed to parse JSON string: ${e}`);
    return null;
  }
}

export type State = {
  currentUserMessage: null | UserMessageType;
  conversationInfo: null | string;
  lastServerMessageId: null | string;
  messages: MessageType[];
  clientState: Record<string, unknown>; // @for future use
};

type Listener<T = State> = (value: T) => void;

type UpdaterFunction<T = State> = (oldValue: T) => T;

// sometimes the im_end message is not received from the bot, so we have to set a timeout to end the current message
// this is the timeout
let timeout: NodeJS.Timeout | null = null;
const timeoutDuration = 1000 * 3;

export class ChatController {
  listeners = new Set<Listener>();
  components: ComponentRegistry | undefined;
  copilotToken: string;
  private state: State = {
    currentUserMessage: null,
    conversationInfo: null,
    lastServerMessageId: null,
    messages: [],
    clientState: {},
  };

  constructor(
    copilotToken: string,
    messages: MessageType[] = [],
    components?: ComponentRegistry
  ) {
    if (!copilotToken) {
      throw new Error("Expected a copilot token");
    }
    this.copilotToken = copilotToken;
    this.components = components;
    this.setValueImmer((draft) => {
      draft.messages = messages;
    });
  }

  notify = () => {
    this.listeners.forEach((l) => l(this.state));
  };

  unSubscribe = (listener: Listener) => {
    this.listeners.delete(listener);
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.unSubscribe(listener);
    };
  };

  getSnapshot = () => {
    return this.state;
  };

  reset = () => {
    this.setValueImmer((draft) => {
      draft.messages = [];
      draft.currentUserMessage = null;
      draft.conversationInfo = null;
      draft.lastServerMessageId = null;
    });
  };

  genId = (len = 7) => {
    return Math.random().toString(36).substring(len);
  };

  getTimeStamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      formatMatcher: "best fit",
      hour: "numeric",
      minute: "numeric",
    });
  };

  isLoading = () => {
    return this.state.currentUserMessage !== null;
  };

  setValue = (newValue: State | UpdaterFunction) => {
    if (typeof newValue === "function") {
      this.state = (newValue as UpdaterFunction)(this.state);
    } else {
      this.state = newValue;
    }
    this.notify();
  };

  setValueImmer = (updater: (draft: State) => void) => {
    this.setValue(produce(this.state, updater));
  };

  select = <KT extends keyof State>(key: KT) => {
    return this.state[key];
  };

  setConversationInfo = (info: string) => {
    this.setValueImmer((draft) => {
      draft.conversationInfo = info;
    });
  };

  settle = () => {
    this.setValueImmer((draft) => {
      draft.currentUserMessage = null;
      draft.conversationInfo = null;
    });
  };

  setLastServerMessageId = (id: string | null) => {
    this.setValueImmer((draft) => {
      draft.lastServerMessageId = id;
    });
  };

  handleTextMessage = (
    message: Omit<UserMessageType, "from" | "id" | "timestamp" | "session_id">,
    socket: Socket | null,
    sessionId: string
  ) => {
    this.setLastServerMessageId(null);
    const id = this.genId();
    const userMessage: UserMessageType = {
      ...message,
      from: "user",
      session_id: sessionId,
      id: id,
      timestamp: this.getTimeStamp(),
    };

    this.setValueImmer((draft) => {
      draft.messages.push(userMessage);
      draft.currentUserMessage = userMessage;
    });

    socket?.emit("send_chat", userMessage);
  };

  internalHandleHandoff = (payload: HandoffPayloadType) => {
    // handle handoff
    const id = this.genId();
    this.setValueImmer((draft) => {
      const lastMessage = draft.messages[draft.messages.length - 1];

      if (
        lastMessage &&
        lastMessage.from === "bot" &&
        lastMessage.type === "HANDOFF"
      )
        return;

      const message = {
        from: "bot",
        type: "HANDOFF",
        id: id,
        responseFor: id,
        timestamp: this.getTimeStamp(),
        data: payload,
      } as BotMessageType<HandoffPayloadType>;
      draft.messages.push(message);
    });
  };
  // Called for every character recived from the bot
  appendToCurrentBotMessage = (message: string) => {
    const currentUserMessage = this.state.currentUserMessage;

    if (!currentUserMessage) {
      // Just append the message to the last message
      const id = this.genId();
      this.setValueImmer((draft) => {
        draft.messages.push({
          from: "bot",
          id: id,
          type: "TEXT",
          responseFor: "EXTERNAL_MESSAGE" + id,
          timestamp: this.getTimeStamp(),
          data: {
            message,
          },
        });
      });
      return;
    }

    // Append the message content to the existing botmessage.type=TEXT or create a new one
    const botMessage = this.select("messages").find(
      (msg) => msg.id === currentUserMessage.id
    ) as BotMessageType;
    if (botMessage) {
      this.setValueImmer((draft) => {
        const d = draft.messages.find(
          (msg) =>
            msg.id === currentUserMessage.id &&
            msg.from === "bot" &&
            msg.type === "TEXT"
        ) as BotMessageType;
        if (d) {
          d.data = {
            message: (d.data?.message || "") + message,
          };
        } else {
          draft.messages.push({
            from: "bot",
            id: currentUserMessage.id,
            type: "TEXT",
            responseFor: currentUserMessage.id,
            timestamp: this.getTimeStamp(),
            data: {
              message: message,
            },
          });
        }
      });
    } else {
      this.setValueImmer((draft) => {
        draft.messages.push({
          from: "bot",
          id: currentUserMessage.id,
          type: "TEXT",
          responseFor: currentUserMessage.id,
          timestamp: this.getTimeStamp(),
          data: {
            content: message,
          },
        });
      });
    }
  };
  // socket handlers impl.
  socketChatInfoHandler = (message: string) => {
    this.setConversationInfo(message);
  };

  socketChatVoteHandler = (message: string) => {
    this.setLastServerMessageId(message);
  };
  // OLD
  socketMessageRespHandler = (data: string) => {
    if (data === "|im_end|") {
      this.settle();
      return;
    }

    if (this.select("conversationInfo")) {
      this.setValueImmer((d) => {
        d.conversationInfo = null;
      });
    }

    this.startTimeout(() => {
      this.settle();
    });

    this.appendToCurrentBotMessage(data);
  };

  // NEW
  newSocketMessageRespHandler = (_data: { data: string }) => {
    const { data } = _data;
    if (data === "|im_end|") {
      this.settle();
      return;
    }

    if (this.select("conversationInfo")) {
      this.setValueImmer((d) => {
        d.conversationInfo = null;
      });
    }

    this.startTimeout(() => {
      this.settle();
    });

    this.appendToCurrentBotMessage(data);
  };

  socketUiHandler = (msg: string) => {
    type ResponseObject =
      | {
          type: "ui_form";
          message_id: string; // => the user's message id
          action: {
            name: string;
            description: string;
            operation_id: string;
            request_type: string;
            payload: {
              parameters: {
                in: string;
                name: string;
                schema: {
                  type: string;
                };
                required: boolean;
                description: string;
                value: string;
              }[];
              request_body: Record<string, unknown>;
            };
          };
        }
      | {
          type: "ui_component";
          incoming_message_id: string;
          request_response: Record<string, unknown>;
          name: string;
        };
    const parsedResponse = decodeJSON(msg) as ResponseObject;
    console.log("parsedResponse", parsedResponse);
    this.setValueImmer((draft) => {
      let message: BotMessageType | null = null;
      if (parsedResponse.type === "ui_form") {
        message = {
          from: "bot",
          type: "FORM",
          id: this.genId(),
          responseFor: parsedResponse.message_id,
          timestamp: this.getTimeStamp(),
          data: {
            action: parsedResponse.action,
          },
        };
      } else if (parsedResponse.type === "ui_component") {
        // handle component
        message = {
          from: "bot",
          type: parsedResponse.name,
          id: this.genId(),
          responseFor: parsedResponse.incoming_message_id,
          timestamp: this.getTimeStamp(),
          data: parsedResponse.request_response ?? {},
        };
      }
      console.log("message", message);
      if (message) {
        draft.messages.push(message);
      }
    });
  };

  socketHandoffHandler = (
    message: string | object,
    externalCallback?: (payload: HandoffPayloadType) => void
  ) => {
    const parsedResponse: HandoffPayloadType =
      typeof message === "object" ? message : JSON.parse(message);
    externalCallback?.(parsedResponse);
    this.internalHandleHandoff(parsedResponse);
  };

  private startTimeout = (callback: () => void) => {
    this.clearTimeout();
    timeout = setTimeout(() => {
      callback();
      timeout = null;
    }, timeoutDuration);
  };

  private clearTimeout = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}
export { HandoffPayloadType };
