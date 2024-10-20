import { LangType } from "@lib/locales";
import { useConsumer } from "@lib/providers";
import { useConfigData } from "@lib/providers/ConfigProvider";
import { useLocale } from "@lib/providers/LocalesProvider";
import {
  MessageType,
  UserMessageType,
} from "@lib/types";
import { produce } from "immer";
import {
  useCallback,
  useReducer,
  useState,
} from "react";
import pkg from "../../package.json";
import { type ChatSessionType, type StructuredSocketMessageType } from "../types/schemas";
import { handleSocketMessages } from "./handle-socket-messages";
import { useSocket } from "./useSocket";
import { genId } from "@lib/utils/genId";
import { useLifecycle } from "./useLifecycle";

type ChatState = {
  lastUpdated: number | null;
  messages: MessageType[];
  keyboard: { options: string[] } | null;
};

type ActionType =
  | {
    type: "INIT";
  }
  | {
    type: "ADD_RESPONSE_MESSAGE";
    payload: MessageType;
  }
  | {
    type: "APPEND_USER_MESSAGE";
    payload: UserMessageType;
  }
  | {
    type: "PREPEND_HISTORY";
    payload: MessageType[];
  }
  | {
    type: "SET_SERVER_ID";
    payload: {
      clientMessageId: string;
      ServerMessageId: number;
    };
  }
  | {
    type: "SET_KEYBOARD";
    payload: {
      options: string[];
    } | null;
  }
  | {
    type: "RESET";
  } | {
    type: "SET_DELIVERED_AT",
    payload: {
      clientMessageId: string;
      deliveredAt: string;
    }
  }

function chatReducer(state: ChatState, action: ActionType) {
  return produce(state, (draft) => {

    const setLastupdated = () => {
      draft.lastUpdated = Date.now();
    };

    switch (action.type) {
      case "INIT": {
        setLastupdated();
        break;
      }
      case "ADD_RESPONSE_MESSAGE": {
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      }

      case "APPEND_USER_MESSAGE": {
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      }

      case "RESET": {
        draft.messages = [];
        draft.lastUpdated = null;
        draft.keyboard = null;
        break;
      }

      case "PREPEND_HISTORY": {
        const historyIds = action.payload.map((msg) => msg.id);
        draft.messages = draft.messages.filter(
          (msg) => !historyIds.includes(msg.id),
        );
        draft.messages = [...action.payload, ...draft.messages];
        setLastupdated();
        break;
      }

      case "SET_SERVER_ID": {
        const { clientMessageId, ServerMessageId } = action.payload;
        const message = draft.messages.find(
          (msg) => msg.id === clientMessageId,
        );
        if (message) {
          message.serverId = ServerMessageId;
        }
        break;
      }

      case "SET_KEYBOARD": {
        draft.keyboard = action.payload;
        break;
      }

      default:
        break;
    }
  });
}

type MessagePayload = {
  id: string;
  content: string;
  session_id: string;
  headers?: Record<string, unknown>;
  bot_token: string;
  query_params?: Record<string, string>;
  pathParams: Record<string, string>;
  language?: LangType;
  user?: {
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    customData?: Record<string, string>;
  };
};

type HookState = "loading" | "error" | "idle";

interface SendMessageInput extends Record<string, unknown> {
  content: {
    text: string;
  };
  headers?: Record<string, unknown>;
  user?: Record<string, unknown>;
  query_params?: Record<string, string>;
  PathParams?: Record<string, string>;
  id?: string;
}

type C = ChatSessionType | null;


type CanSendType = {
  canSend: boolean;
  reason?: "socketError" | "sessionClosed" | "noConsumer" | "noSession";
}

/**
 * manages the socket, messages, session/ticket
 */
function useAbstractChat({
  conversation,
  onCreateConversation,
}: {
  conversation?: C;
  /**
   * when the conversation is undefined
   * @param conversation 
   * @returns 
   */
  onCreateConversation?: (conversation: C) => void;
}) {
  const [_conversation, _setConversation] = useState<C>(conversation ?? null);
  const { socketUrl, botToken, logger } = useConfigData();
  const { consumer } = useConsumer();
  const locale = useLocale();

  const { socket, useListen, socketState } = useSocket(socketUrl, {
    transports: ["websocket"],
    closeOnBeforeunload: true,
    autoConnect: false,
    retries: 3,
    query: {
      client: "widget",
      botToken,
      language: locale.lang,
      clientVersion: pkg.version,
      contactId: consumer?.id,
      sessionId: null,
    }
  });


  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (session && socket) {

  //     const currentSessionId = session.id;

  //     const heartbeatPayload = {
  //       sessionId: currentSessionId,
  //       client: "widget",
  //       botToken,
  //       user: userData,
  //       timestamp: Date.now(),
  //     }

  //     async function sendHeartbeat() {
  //       socket?.emit('heartbeat', heartbeatPayload);
  //     }

  //     sendHeartbeat();

  //     interval = setInterval(() => {
  //       sendHeartbeat();
  //     }, 50 * 1000); // 50 seconds
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   }

  // }, [socket, session, botToken]);

  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null
  });

  function joinSession(session_id: string) {
    socket?.emit("join_session", {
      session_id,
    });
  }

  useListen("structured_message", (socketMsg: StructuredSocketMessageType) => {
    handleSocketMessages({
      _message: socketMsg,
      _socket: socket,
      onSessionUpdate(message, _ctx) {
        logger?.debug("updateSession", message);
        // 
      },
      onBotMessage(message, _ctx) {
        logger?.debug("onBotMessage", message);
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onChatEvent(message, _ctx) {
        logger?.debug("onChatEvent", message);
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onUi(message, _ctx) {
        logger?.debug("onUi", message);
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onForm(message, _ctx) {
        logger?.debug("onForm", message);
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onOptions(message, _ctx) {
        logger?.debug("onOptions", message);
        dispatch({
          type: "SET_KEYBOARD",
          payload: {
            options: message.value.options
          }
        })
      },
      onVote(message, _ctx) {
        if (message.server_message_id && message.client_message_id) {
          dispatch({
            type: "SET_SERVER_ID",
            payload: {
              clientMessageId: message.client_message_id,
              ServerMessageId: message.server_message_id,
            }
          });
        }
      },
    })
  });

  useListen("ack:chat_message:delivered", (payload: MessagePayload) => {
    logger?.debug("ack:chat_message:delivered", payload);
    dispatch({
      type: "SET_DELIVERED_AT",
      payload: {
        clientMessageId: payload.id,
        deliveredAt: new Date().toISOString()
      }
    });
  })
  
  useListen("user_message_broadcast", (message: MessagePayload) => {
    logger?.debug("user_message_broadcast", message);
    dispatch({
      type: "APPEND_USER_MESSAGE",
      payload: {
        user: message.user,
        type: "FROM_USER",
        deliveredAt: null,
        serverId: null,
        session_id: _conversation?.id ?? "",
        content: message.content,
        id: message.id ?? genId(10),
      }
    })
  },);

  useListen("connect", () => {
    // if (session && socket) {
    //   socket.emit("join_session", { session_id: session.id });
    // }
  });

  useListen("heartbeat:ack", (data: { success: boolean }) => {
    if (data.success) {
      // 
    }
  })

  useListen("reconnect", () => {
    // if (session && socket) {
    //   socket.emit("join_session", { session_id: session.id });
    // }
  });

  useLifecycle(() => {
    dispatch({ type: "INIT" });
  })

  async function sendMessage({
    content,
    user,
    headers: inputHeaders,
    PathParams: inputPathParams,
    query_params: inputQueryParams,
    ...data
  }: SendMessageInput) {
    // let chatSession = session;

    // if (!session && noMessages) {
    //   try {
    //     const { data: newSession } = await createSession(axiosInstance, botToken);
    //     if (newSession) {
    //       setSession(newSession);
    //       joinSession(newSession.id);
    //       chatSession = newSession;
    //     } else {
    //       throw new Error("Failed to create session");
    //     }
    //   } catch (error) {
    //     console.error("Error creating session:", error);
    //     return null;
    //   }
    // }

    // if (chatSession && socket) {
    //   const msgId = genId();
    //   const payload: MessagePayload = {
    //     id: msgId,
    //     bot_token: botToken,
    //     content: content.text,
    //     session_id: chatSession.id,
    //     headers: {
    //       ...headers,
    //       ...inputHeaders,
    //     },
    //     pathParams: {
    //       ...pathParams,
    //       ...inputPathParams,
    //     },
    //     query_params: {
    //       ...queryParams,
    //       ...inputQueryParams,
    //     },
    //     user: {
    //       ...userData,
    //       ...user,
    //     },
    //     language,
    //     ...data
    //   };
    //   try {
    //     dispatch({
    //       type: "APPEND_USER_MESSAGE",
    //       payload: {
    //         type: "FROM_USER",
    //         id: msgId,
    //         content: content.text,
    //         timestamp: new Date().toISOString(),
    //         session_id: chatSession.id,
    //         user: payload.user,
    //         deliveredAt: null,
    //         serverId: null
    //       },
    //     });
    //     if (chatState.keyboard) {
    //       dispatch({
    //         type: "SET_KEYBOARD",
    //         payload: null
    //       });
    //     }

    //     socket.emit("send_chat", payload);
    //     return payload;
    //   } catch (error) {
    //     console.error("Error sending message:", error);
    //     return null;
    //   }
    // }
    // return null;
  }

  const handleKeyboard = useCallback((option: string) => {
    sendMessage({
      content: {
        text: option,
      },
    });
    dispatch({
      type: "SET_KEYBOARD",
      payload: null
    });
  }, [dispatch, sendMessage, socket,]);

  return {
    version: pkg.version,
    state: chatState,
    sendMessage,
    handleKeyboard,
  };
}


export { useAbstractChat, type SendMessageInput, type HookState };