import { useLocale } from "../providers/LocalesProvider";
import { useConfigData } from "../providers/ConfigDataProvider"
import { UserObject } from "@react/types";
import { create } from "mutative";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import pkg from "../../package.json";
import { useTimeoutState } from "./useTimeoutState";
import {
  AIClosureType,
  ChatAttachmentType,
  type ChatSessionType,
  MessageType,
  SessionStatus,
  type StructuredSocketMessageType,
  UserMessageType,
} from "@core/types";
import { handleSocketMessages } from "./handle-socket-messages";
import { useSocket } from "./socket";
import { representSocketState } from "./socketState";
import { useSyncedState } from "./useSyncState";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { mapChatHistoryToMessage } from "@core/utils/history-to-widget-messages";
import lodashSet from "lodash.set";
import { useWidgetSoundEffects } from "@react/providers/use-widget-sfx";
import { LangType } from "@react/locales";
import { genId } from "@core/utils/genId";

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
  } | {
    type: "SET_MESSAGES",
    payload: MessageType[];
  } | {
    type: "APPEND_MESSAGES",
    payload: MessageType[];
  };

function chatReducer(state: ChatState, action: ActionType) {
  return create(state, (draft) => {
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
      case "SET_MESSAGES": {
        draft.messages = action.payload
        break;
      }
      case "APPEND_MESSAGES": {
        // skip id's that are already in the state
        const newMessages = action.payload.filter((msg) => {
          return !draft.messages.some((m) => m.id === msg.id);
        });
        draft.messages.push(...newMessages);
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
  attachments?: Array<ChatAttachmentType>,
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
    isAssignedToAi: _session.assignee_id === 555,
    isAssignedToHuman: _session.assignee_id !== 555,
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

function useHookState() {
  const [hookState, setHookState] = useState<HookState>({ state: "idle" });
  return [hookState, setHookState] as const;
}

// Initialize chat state and reducer
function useAbstractChat({
  onSessionDestroy,
}: useChatOptions) {
  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null,
  });

  // Get locale and configuration data
  const locale = useLocale();
  const { botToken, http, socketUrl, widgetSettings, defaultSettings, language, ...config } = useConfigData();
  const { messageArrivedSound } = useWidgetSoundEffects();

  // Fetch chat history
  const [fetchHistoryState, fetchHistory] = useAsyncFn(
    async (sessionId: string) => {
      if (session) {
        try {
          const { data: redata } = await http.apis.fetchHistory(sessionId);
          if (!redata) return [];
          if (Array.isArray(redata)) {
            const messages = mapChatHistoryToMessage(redata ?? []);
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

  // Determine if session should be persisted
  const shouldPersistSession = widgetSettings?.persistSession || defaultSettings.persistSession;

  // Manage session state
  const { refreshSession, refreshSessionState, session, deleteSession, setSession } = useSession({
    persist: shouldPersistSession
  });

  // Manage hook state
  const [hookState, _setHookState] = useHookState();

  // Set hook state with optional loading disable
  function setHookState(
    state: HookState
  ) {
    const disableLoading = session?.isAssignedToHuman || session?.isPendingHuman || session?.isSessionClosed || !session?.isAssignedToAi
    if (!disableLoading) {
      _setHookState(state);
    }
    else {
      _setHookState({
        state: "idle"
      })
    }
  }

  // Initialize socket connection
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

  // Fetch session and history on mount
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

  // Send heartbeat at regular intervals
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

  // Listen for heartbeat acknowledgements
  useListen(
    "heartbeat:ack",
    (data: { success: boolean }) => {
      // Handle heartbeat acknowledgement
    },
    [session]
  );

  // Manage socket connection state info
  const [info, setInfo] = useTimeoutState<ReactNode | null>(
    () => representSocketState(socketState, locale.get),
    1000
  );

  // Handle socket connection events
  const handleConnect = () => {
    if (session && socket) {
      socket.emit("join_session", { session_id: session.id });
    }
  }

  const handleReconnect = () => {
    if (session && socket) {
      socket.emit("join_session", { session_id: session.id });
    }
  }

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", handleConnect);
    socket.on("reconnect", handleReconnect);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("reconnect", handleReconnect);
    };
  }, [handleConnect, socket, handleReconnect]);

  // Join a session
  function joinSession(session_id: string) {
    socket?.emit("join_session", {
      session_id,
    });
  }

  // Clear the current session
  function clearSession() {
    socket?.emit("leave_session", { session_id: session?.id });
    deleteSession();
    dispatch({ type: "RESET" });
    onSessionDestroy?.();
    setHookState({ state: "idle" })
  }

  // Recreate a new session
  function recreateSession() {
    clearSession();
    http.apis.createSession(botToken).then(({ data }) => {
      setSession(data);
      joinSession(data.id);
    });
  }

  // Handle incoming messages from the socket
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
      onChatEvent() {
        session && refreshSession(session.id)
      },
      onUi(message, _ctx) {
        if (message.type === "FROM_BOT") {
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
        setHookState({
          state: "idle",
        });
      },
    });
  };

  // Handle socket info messages
  const handleInfo = useCallback(
    (info: string) => {
      setInfo(info);
    },
    [setInfo]
  );

  // Poll for new messages at regular intervals
  useEffect(() => {
    if (!session) return;
    const lastMessageTimestamp = chatState.messages.at(-1)?.timestamp;
    if (!lastMessageTimestamp) return;
    const interval = setInterval(() => {
      http.apis.getHistoryPooling({
        sessionId: session.id,
        lastMessageTimestamp,
      }).then((response) => {
        response.data && dispatch({
          type: "APPEND_MESSAGES",
          payload: mapChatHistoryToMessage(response.data)
        })
      })
    }, 20 * 1000);
    return () => {
      clearInterval(interval);
    }
  }, [session, chatState.messages])

  // Handle user message broadcasts
  const handleUserMessageBroadcast = useCallback((message: MessagePayload) => {
    dispatch({
      type: "APPEND_USER_MESSAGE",
      payload: {
        user: message?.user,
        type: "FROM_USER",
        deliveredAt: null,
        content: message.content,
        id: message.id ?? genId(10),
        attachments: []
      },
    });
  }, []);

  // Handle message delivery acknowledgements
  const handleDeliveredAck = useCallback((payload: MessagePayload) => {
    dispatch({
      type: "SET_DELIVERED_AT",
      payload: {
        clientMessageId: payload.id,
        deliveredAt: new Date().toISOString(),
      },
    });
  }, []);

  // Set up socket listeners
  useListen("structured_message", handleIncomingMessage)
  useListen("ack:chat_message:delivered", handleDeliveredAck);
  useListen("info", handleInfo);
  useListen("user_message_broadcast", handleUserMessageBroadcast);

  // Check if there are no messages
  const noMessages = chatState.messages.length === 0;

  // Send a message
  const [__, sendMessage] = useAsyncFn(
    async ({ content, user, ...data }: SendMessageInput) => {
      let chatSession = session;
      setHookState({
        state: "loading",
      });
      if (!session && noMessages) {
        try {
          const { data: newSession } = await http.apis.createSession(botToken);
          if (newSession) {
            setSession(newSession);
            joinSession(newSession.id);
            chatSession = {
              ...newSession,
              // will be updated anyway when the component rerenders
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
          attachments: data.attachments,
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
              user: payload.user,
              deliveredAt: null,
              attachments: data.attachments,
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

  // Handle keyboard input
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

  // Determine if messages can be sent
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
