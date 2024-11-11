import { LangType } from "@lib/locales";
import { useLocale } from "../providers/LocalesProvider";
import { useConfigData } from "../providers/ConfigDataProvider"
import { MessageType, UserMessageType, UserObject } from "@lib/types";
import { genId } from "@lib/utils/genId";
import { produce } from "immer";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import pkg from "../../package.json";
import { useTimeoutState } from "../hooks/useTimeoutState";
import {
  AIClosureType,
  type ChatSessionType,
  SessionStatus,
  type StructuredSocketMessageType,
} from "../types/schemas";
import { handleSocketMessages } from "./handle-socket-messages";
import { useSocket } from "./socket";
import { representSocketState } from "./socketState";
import { useSyncedState } from "./useSyncState";
import { useAsyncFn } from "react-use";
import { historyToWidgetMessages } from "@lib/utils/history-to-widget-messages";
import lodashSet from "lodash.set";
import { useWidgetSoundEffects } from "@lib/providers/use-widget-sfx";

type HookState = {
  state: "loading" | "error" | "idle";
  error?: any;
};

type useChatOptions = {
  onSessionDestroy?: () => void;
  defaultHookSettings?: HookSettings;
};

type ChatState = {
  lastUpdated: number | null;
  messages: MessageType[];
  keyboard: { options: string[] } | null;
};

type ActionType =
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
  }
  | {
    type: "SET_DELIVERED_AT";
    payload: {
      clientMessageId: string;
      deliveredAt: string;
    };
  };

function chatReducer(state: ChatState, action: ActionType) {
  return produce(state, (draft) => {
    const setLastupdated = () => {
      draft.lastUpdated = Date.now();
    };
    switch (action.type) {
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
          (msg) => !historyIds.includes(msg.id)
        );
        draft.messages = [...action.payload, ...draft.messages];
        setLastupdated();
        break;
      }

      case "SET_SERVER_ID": {
        const { clientMessageId, ServerMessageId } = action.payload;
        const message = draft.messages.find(
          (msg) => msg.id === clientMessageId
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
      case "SET_DELIVERED_AT": {
        const message = draft.messages.find(message => {
          if (message.type === "FROM_USER" && message.id === action.payload?.clientMessageId) {
            return true;
          }
        })
        if (message?.type === "FROM_USER") {
          lodashSet(message, "deliveredAt", action.payload.deliveredAt);
        }
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

interface SendMessageInput extends Record<string, unknown> {
  content: {
    text: string;
  };
  id?: string;
  language?: string;
  user?: UserObject
}

interface HookSettings {
  persistSession?: boolean;
  useSoundEffects?: boolean;
}

function useSession({
  persist,
  sessionKey = (botToken, { external_id }) => `[OPEN_SESSION_${botToken}]_${external_id ? external_id : "session"}`
}: {
  persist: boolean,
  sessionKey?: (
    botToken: string,
    user: UserObject
  ) => string
}) {
  const { botToken, http, user } = useConfigData();
  const [_session, setSession, clearBucket] = useSyncedState<ChatSessionType>(
    sessionKey(botToken, user),
    undefined,
    persist ? "local" : "memory"
  );

  const session = _session ? {
    ..._session,
    isSessionClosed: _session.status !== SessionStatus.OPEN,
    isAssignedToAi: _session.assignee_id === 555 || _session.ai_closure_type === null,
    isAssignedToHuman: _session.assignee_id !== 555 && _session.ai_closure_type === null,
    isPendingHuman: _session.assignee_id === 555 && _session.ai_closure_type === AIClosureType.handed_off,
  } : null;

  const [refreshSessionState, refreshSession] = useAsyncFn(async (sId: string) => {
    let response = await http.apis.fetchSession(sId);
    if (response.data) {
      setSession(response.data);
    }
    return response.data;
  }, [http, setSession]);

  function deleteSession() {
    setSession(null);
    clearBucket()
  }

  return {
    session,
    refreshSession,
    refreshSessionState,
    deleteSession,
    setSession
  }
}

function useAbstractChat({
  onSessionDestroy,
}: useChatOptions) {
  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null,
  });
  const locale = useLocale();
  const { botToken, http, socketUrl, widgetSettings, defaultSettings,language, ...config } = useConfigData();
  const { messageArrivedSound } = useWidgetSoundEffects();
  const [fetchHistoryState, fetchHistory] = useAsyncFn(
    async (sessionId: string) => {
      if (session) {
        try {
          const { data: redata } = await http.apis.fetchHistory(sessionId);
          if (Array.isArray(redata)) {
            const messages = historyToWidgetMessages(redata ?? [], { bot: config.bot });
            return messages;
          }
        } catch (error) {
          console.error(error)
          return []
        }
      }
      return [];
    },
    [config.bot]
  );
  const shouldPersistSession = widgetSettings?.persistSession || defaultSettings.persistSession;
  const { refreshSession, refreshSessionState, session, deleteSession, setSession } = useSession({
    persist: shouldPersistSession
  })

  const [hookState, _setHookState] = useState<HookState>({ state: "idle" });

  const disableLoading = !session || session.isAssignedToHuman || session.isPendingHuman;

  function setHookState(
    state: HookState
  ) {
    if (!disableLoading) {
      _setHookState(state);
    }
  }

  const { socket, socketState, useListen } = useSocket(socketUrl, {
    transports: ["websocket"],
    closeOnBeforeunload: true,
    autoConnect: true,
    query: {
      botToken,
      sessionId: session?.id,
      client: "widget",
      clientVersion: pkg.version,
      language,
    },
  });

  // create timeout to reset the hook state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hookState.state === "loading") {
      timeout = setTimeout(() => {
        setHookState({
          state: "idle",
        });
      }, 7000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [hookState]);

  useEffect(() => {
    async function init() {
      if (!session) return;
      const sisi = await refreshSession(session?.id);
      if (sisi) {
        const history = await fetchHistory(sisi.id);
        if (history) {
          dispatch({ type: "PREPEND_HISTORY", payload: history });
        }
      }
    }
    init();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session && socket) {
      const currentSessionId = session.id;

      const heartbeatPayload = {
        sessionId: currentSessionId,
        client: "widget",
        botToken,
        user: config.user,
        timestamp: Date.now(),
      };

      async function sendHeartbeat() {
        socket?.emit("heartbeat", heartbeatPayload);
      }
      sendHeartbeat();
      interval = setInterval(() => {
        sendHeartbeat();
      }, 50 * 1000); // 50 seconds
    }

    return () => {
      clearInterval(interval);
    };
  }, [socket, session, botToken, config.user]);

  useListen(
    "heartbeat:ack",
    (data: { success: boolean }) => {
      // 
    },
    [session]
  );

  const [info, setInfo] = useTimeoutState<ReactNode | null>(
    () => representSocketState(socketState, locale.get),
    1000
  );

  const handleConnect = useCallback(() => {
    if (session && socket) {
      socket.emit("join_session", { session_id: session.id });
    }
  }, [session?.id, socket]);

  const handleReconnect = useCallback(() => {
    if (session && socket) {
      socket.emit("join_session", { session_id: session.id });
    }
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", handleConnect);
    socket?.on("reconnect", handleReconnect);
    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("reconnect", handleReconnect);
    };
  }, [handleConnect, socket, handleReconnect]);

  function joinSession(session_id: string) {
    socket?.emit("join_session", {
      session_id,
    });
  }

  function clearSession() {
    socket?.emit("leave_session", { session_id: session?.id });
    deleteSession();
    dispatch({ type: "RESET" });
    onSessionDestroy?.();
  }

  function recreateSession() {
    clearSession();
    http.apis.createSession(botToken).then(({ data }) => {
      setSession(data);
      joinSession(data.id);
    });
  }

  const handleIncomingMessage = (socketMsg: StructuredSocketMessageType) => {
    handleSocketMessages({
      _message: socketMsg,
      _socket: socket,
      _config: { bot: config.bot },
      onSessionUpdate(message, _ctx) {
        setSession(message.value.session);
      },
      onBotMessage(message, _ctx) {
        setHookState({
          state: "idle",
        });
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
        try {
          messageArrivedSound.play()
        } catch (error) {
          console.error(error)
        }
      },
      onChatEvent(message, _ctx) {
        session && refreshSession(session.id)
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onUi(message, _ctx) {
        if (message.type === "FROM_BOT" && message?.component === "handoff") {
          session && refreshSession(session.id)
        }
        setHookState({
          state: "idle",
        });
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onForm(message, _ctx) {
        setHookState({
          state: "idle",
        });
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onOptions(message, _ctx) {
        dispatch({
          type: "SET_KEYBOARD",
          payload: {
            options: message.value.options,
          },
        });
      },
      onVote(message, _ctx) {
        if (message.server_message_id && message.client_message_id) {
          dispatch({
            type: "SET_SERVER_ID",
            payload: {
              clientMessageId: message.client_message_id,
              ServerMessageId: message.server_message_id,
            },
          });
        }
      },
    });
  };

  const handleInfo = useCallback(
    (info: string) => {
      setInfo(info);
    },
    [setInfo]
  );

  const handleUserMessageBroadcast = useCallback((message: MessagePayload) => {
    dispatch({
      type: "APPEND_USER_MESSAGE",
      payload: {
        user: message.user,
        type: "FROM_USER",
        deliveredAt: null,
        serverId: null,
        session_id: session?.id ?? "",
        content: message.content,
        id: message.id ?? genId(10),
      },
    });
  }, []);

  // this will just resend the user message again to the widget with everything
  const handleDeliveredAck = useCallback((payload: MessagePayload) => {
    dispatch({
      type: "SET_DELIVERED_AT",
      payload: {
        clientMessageId: payload.id,
        deliveredAt: new Date().toISOString(),
      },
    });
  }, []);
  useListen("structured_message", handleIncomingMessage)
  useListen("ack:chat_message:delivered", handleDeliveredAck);
  useListen("info", handleInfo);
  useListen("user_message_broadcast", handleUserMessageBroadcast);

  const noMessages = chatState.messages.length === 0;

  const [__, sendMessage] = useAsyncFn(
    async ({ content, user, ...data }: SendMessageInput) => {
      setHookState({
        state: "loading",
      });
      let chatSession = session;
      if (!session && noMessages) {
        try {
          const { data: newSession } = await http.apis.createSession(botToken);
          if (newSession) {
            setSession(newSession);
            joinSession(newSession.id);
            chatSession = {
              ...newSession,
              // will be updated anyway when the hook rerenders
              isSessionClosed: newSession.status !== SessionStatus.OPEN,
              isAssignedToAi: newSession.assignee_id === 555,
              isAssignedToHuman: false,
              isPendingHuman: false
            }
          } else {
            throw new Error("Failed to create session");
          }
        } catch (error) {
          console.error("Error creating session:", error);
          return null;
        }
      }

      if (chatSession && socket) {
        const msgId = genId();
        const { headers, pathParams, queryParams } = config;
        const payload = {
          id: msgId,
          bot_token: botToken,
          content: content.text,
          session_id: chatSession.id,
          headers,
          pathParams,
          query_params: queryParams,
          queryParams,
          user: {
            ...config.user,
            ...user
          },
          language,
          ...data,
        };
        try {
          dispatch({
            type: "APPEND_USER_MESSAGE",
            payload: {
              type: "FROM_USER",
              id: msgId,
              content: content.text,
              session_id: chatSession.id,
              user: payload.user,
              deliveredAt: null,
              serverId: null,
            },
          });
          if (chatState.keyboard) {
            dispatch({
              type: "SET_KEYBOARD",
              payload: null,
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
    },
    [setHookState, session, socket, config.user, config, botToken, language]
  );

  const handleKeyboard = useCallback(
    (option: string) => {
      sendMessage({
        content: {
          text: option,
        },
      });
      dispatch({
        type: "SET_KEYBOARD",
        payload: null,
      });
    },
    [dispatch, sendMessage, socket]
  );

  const unstable__canSend = useMemo(() => {
    if (session?.isSessionClosed) {
      return {
        canSend: false,
        reason: "closedSession",
      };
    }
    return {
      canSend: true,
    };
  }, [session]);

  return {
    version: pkg.version,
    state: chatState,
    session,
    unstable__canSend,
    noMessages,
    fetchHistoryState,
    refreshSessionState,
    recreateSession,
    clearSession,
    sendMessage,
    info,
    handleKeyboard,
    hookState,
  };
}

export { useAbstractChat, type SendMessageInput, type HookState };
