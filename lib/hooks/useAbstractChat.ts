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
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import pkg from "../../package.json";
import { SessionStatus, type ChatSessionType, type StructuredSocketMessageType } from "../types/schemas";
import { handleSocketMessages } from "./handle-socket-messages";
import { useSocket } from "./useSocket";
import { genId } from "@lib/utils/genId";
import { useLifecycle } from "./useLifecycle";
import { debugAssert } from "@lib/utils/debug-assert";
import { historyToWidgetMessages } from "@lib/utils/history-to-widget-messages";
type HookState = "loading" | "error" | "idle";

type ChatState = {
  prevState: ChatState | null;
  lastUpdated: number | null;
  messages: MessageType[];
  keyboard: { options: string[] } | null;
  meta: {
    state: HookState;
  }
};

type ActionType =
  | { type: "ADD_RESPONSE_MESSAGE"; payload: MessageType }
  | { type: "APPEND_USER_MESSAGE"; payload: UserMessageType }
  | { type: "PREPEND_HISTORY"; payload: MessageType[] }
  | { type: "SET_SERVER_ID"; payload: { clientMessageId: string; ServerMessageId: number } }
  | { type: "SET_KEYBOARD"; payload: { options: string[] } | null }
  | { type: "RESET" }
  | { type: "SET_DELIVERED_AT"; payload: { clientMessageId: string; deliveredAt: string } }
  | { type: "CHANGE_STATE", payload: ChatState['meta']['state'] };
// Reducer function to manage chat state
function chatReducer(state: ChatState, action: ActionType) {
  return produce(state, (draft) => {
    const setLastupdated = () => {
      draft.lastUpdated = Date.now();
    };
    draft.prevState = state;
    switch (action.type) {
      case "ADD_RESPONSE_MESSAGE":
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      case "APPEND_USER_MESSAGE":
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      case "RESET":
        draft.messages = [];
        draft.lastUpdated = null;
        draft.keyboard = null;
        draft.prevState = null;
        draft.meta.state = "idle";
        break;
      case "PREPEND_HISTORY": {
        const historyIds = action.payload.map((msg) => msg.id);
        draft.messages = draft.messages.filter((msg) => !historyIds.includes(msg.id));
        draft.messages = [...action.payload, ...draft.messages];
        setLastupdated();
        break;
      }
      case "SET_SERVER_ID": {
        const { clientMessageId, ServerMessageId } = action.payload;
        const message = draft.messages.find((msg) => msg.id === clientMessageId);
        if (message) {
          message.serverId = ServerMessageId;
        }
        break;
      }
      case "SET_KEYBOARD":
        draft.keyboard = action.payload;
        break;
      case "CHANGE_STATE": {
        draft.meta.state = action.payload;
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


type SendMessageInput = {
  content: { text: string };
  headers?: Record<string, unknown>;
  user?: Record<string, unknown>;
  query_params?: Record<string, string>;
  PathParams?: Record<string, string>;
  id?: string;
};

type C = ChatSessionType | null;

export type CanSendType = {
  canSend: boolean;
  reason?: "socketError" | "sessionClosed" | "noConsumer" | "noSession" | "noContent";
}

/**
 * manages the socket, messages, session/ticket
 */
function useAbstractChat({
  defaultConversation: conversation,
  onCreateConversation,
}: {
  defaultConversation?: C | string;
  /**
   * when the conversation is undefined
   * @param conversation 
   * @returns 
   */
  onCreateConversation?: (conversation: C) => void;
}) {
  const [_activeConversation, setActiveConversation] = useState<C>();
  const { socketUrl, botToken, logger, apis, ...config } = useConfigData();
  const { consumer } = useConsumer();
  const locale = useLocale();

  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null,
    prevState: null,
    meta: {
      state: "idle"
    }
  });


  const { socket, useListen } = useSocket(socketUrl, {
    transports: ["websocket"],
    closeOnBeforeunload: true,
    query: {
      client: "widget",
      botToken,
      language: locale.lang,
      clientVersion: pkg.version,
      contactId: consumer?.id,
      sessionId: null,
    }
  });

  function changeActiveConversation(c: C) {
    setActiveConversation(c);
    dispatch({ type: "RESET" })
  }

  useEffect(() => {
    if (!consumer) {
      logger?.warn("consumer is undefined");
      return;
    }
    if (!conversation) {
      // 
    }
    if (typeof conversation === "string") {
      apis.fetchSession(
        conversation,
        consumer.id
      ).then((c) => {
        if (c.data) {
          setActiveConversation(c.data);
        }
      })
    } else if (typeof conversation === "object") {
      setActiveConversation(conversation);
    }
  }, [conversation]);

  const joinChatSession = (sessionId: string) => {
    if (socket) {
      socket.emit("join_session", { sessionId });
      logger?.debug("joined session", sessionId);
    } else {
      console.error("Socket is not initialized");
    }
  }

  const leaveChatSession = (sessionId: string) => {
    if (socket) {
      socket.emit("leave_session", { sessionId });
      logger?.debug("left session", sessionId);
    } else {
      console.error("Socket is not initialized");
    }
  }

  useEffect(() => {
    if (socket && _activeConversation) {
      joinChatSession(_activeConversation.id);
    }
    return () => {
      if (socket && _activeConversation) {
        leaveChatSession(_activeConversation.id);
      }
    };
  }, [_activeConversation, socket]);

  useEffect(() => {
    if (_activeConversation && consumer) {
      apis.fetchConversationHistory(_activeConversation.id, consumer.id)
        .then((response) => {
          if (response.data) {
            const messages = historyToWidgetMessages(response.data);
            logger?.debug({
              original: response.data,
              widget: messages
            });
            dispatch({ type: "PREPEND_HISTORY", payload: messages });
          }
        })
        .catch(error => logger?.error("Error fetching conversation history", error));
    }
  }, [_activeConversation, consumer, apis]);

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
        session_id: _activeConversation?.id ?? "",
        content: message.content,
        id: message.id ?? genId(10),
      }
    })
  },);

  useListen("connect", () => {
    if (_activeConversation && socket) {
      joinChatSession(_activeConversation.id)
    }
  });

  useListen("heartbeat:ack", (data: { success: boolean }) => {
    if (data.success) {
      // 
    }
  })

  useListen("reconnect", () => {
    if (_activeConversation && socket) {
      joinChatSession(_activeConversation.id)
    }
  });

  const noMessages = chatState.messages.length === 0;

  async function sendMessage({
    content,
    user,
    headers: inputHeaders,
    PathParams: inputPathParams,
    query_params: inputQueryParams,
    ...data
  }: SendMessageInput) {
    debugAssert()(consumer, "consumer should be defined");

    if (!consumer) return;

    let conversation = _activeConversation;

    if (!conversation && noMessages) {
      try {
        const { data: newConversation } = await apis.createConversation(consumer.id);
        if (newConversation) {
          onCreateConversation?.(newConversation)
          setActiveConversation(newConversation);
          joinChatSession(newConversation.id);
          conversation = newConversation;
        } else {
          throw new Error("Failed to create conversation");
        }
      } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
    }

    if (conversation && socket) {
      const msgId = genId();
      const payload: MessagePayload = {
        id: msgId,
        bot_token: botToken,
        content: content.text,
        session_id: conversation.id,
        headers: {
          ...config.headers,
          ...inputHeaders,
        },
        pathParams: {
          ...config.pathParams,
          ...inputPathParams,
        },
        query_params: {
          ...config.queryParams,
          ...inputQueryParams,
        },
        user: {
          ...config.userData,
          ...user,
        },
        language: config.language,
        ...data
      };
      try {
        dispatch({
          type: "APPEND_USER_MESSAGE",
          payload: {
            type: "FROM_USER",
            id: msgId,
            content: content.text,
            timestamp: new Date().toISOString(),
            session_id: conversation.id,
            user: payload.user,
            deliveredAt: null,
            serverId: null
          },
        });
        if (chatState.keyboard) {
          dispatch({
            type: "SET_KEYBOARD",
            payload: null
          });
        }
        socket.emit("send_chat", payload);
        return payload;
      } catch (error) {
        console.error("Error sending message:", error);
        return null;
      }
    }
    return null;
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

  const activeConversation = useMemo(() => {
    if (_activeConversation) {
      return {
        ..._activeConversation,
        isClosed: _activeConversation.status !== SessionStatus.OPEN,
      }
    }
    return undefined
  }, [_activeConversation]);

  const canSend = useMemo<CanSendType>(() => {
    if (activeConversation?.isClosed) {
      return {
        canSend: false,
        reason: "sessionClosed"
      }
    }
    return {
      canSend: true
    };
  }, [activeConversation]);

  return {
    version: pkg.version,
    state: chatState,
    activeConversation,
    sendMessage,
    handleKeyboard,
    changeActiveConversation,
    canSend
  };
}


export { useAbstractChat, type SendMessageInput, type HookState };