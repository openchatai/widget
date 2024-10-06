import { LangType } from "@lib/locales";
import { useLocale } from "@lib/providers";
import {
  MessageType,
  UserMessageType,
} from "@lib/types";
import { debug } from "@lib/utils/debug";
import { genId } from "@lib/utils/genId";
import {
  createSession,
  getChatSessionById,
  getInitData,
} from "@lib/utils/getters";
import { historyToWidgetMessages } from "@lib/utils/history-to-widget-messages";
import { AxiosInstance } from "axios";
import { produce } from "immer";
import {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import useSWR from "swr";
import pkg from "../../package.json";
import { useTimeoutState } from "../hooks/useTimeoutState";
import { ChatHistoryMessageType, type ChatSessionType, SessionStatus, type StructuredSocketMessageType } from "../types/schemas";
import { handleSocketMessages } from "./handle-socket-messages";
import { useSocket } from "./socket";
import { representSocketState } from "./socketState";
import { useAxiosInstance } from "./useAxiosInstance";
import { useSyncedState } from "./useSyncState";

type useChatOptions = {
  socketUrl: string;
  apiUrl: string;
  botToken: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  pathParams: Record<string, string>;
  onSessionDestroy?: () => void;
  defaultHookSettings?: HookSettings
  userData?: Record<string, any>;
  language?: LangType;
};

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
    type: "DELETE_MESSAGE";
    payload: { id: string };
  }
  | {
    type: "CLEAR_MESSAGES";
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
  } | {
    type: "RESET";
  }

function chatReducer(state: ChatState, action: ActionType) {
  return produce(state, (draft) => {
    const setLastupdated = () => {
      draft.lastUpdated = Date.now();
    };
    console.log(action.type)
    switch (action.type) {
      case "INIT":
        setLastupdated();
        break;
      case "CLEAR_MESSAGES":
        draft.messages = [];
        draft.lastUpdated = null;
        break;
      // case "ADD_RESPONSE_MESSAGE": {
      //   const msg = action.payload;
      //   if (msg.type === "FROM_BOT" && msg.component === "TEXT" && msg.agent?.is_ai === true) {
      //     const prevBotMessage = draft.messages.find(
      //       (_) => _.type === "FROM_BOT" && _.responseFor !== null && _.responseFor === msg.responseFor,
      //     ) as BotMessageType<{ message: string }> | undefined;
      //     if (prevBotMessage && prevBotMessage.data?.message.length > 0) {
      //       prevBotMessage.data.message +=
      //         (msg as BotMessageType<{ message: string }>).data.message ?? "";
      //     } else {
      //       draft.messages.push(msg);
      //     }
      //   } else {
      //     draft.messages.push(msg);
      //   }
      //   break;
      // }
      case "ADD_RESPONSE_MESSAGE": {
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      }
      case "APPEND_USER_MESSAGE": {
        debug("append user message", action.payload.id)
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
      case "DELETE_MESSAGE":
        draft.messages = draft.messages.filter(
          (msg) => msg.id !== action.payload.id,
        );
        setLastupdated();
        break;
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
        // const { clientMessageId, ServerMessageId } = action.payload;
        // const message = draft.messages.find(
        //   (msg) =>
        //     msg.type === "FROM_BOT" && msg.responseFor === clientMessageId,
        // );
        // if (message) {
        //   message.serverId = ServerMessageId;
        // }
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

const SESSION_KEY = (botToken: string) => `[OPEN_SESSION_${botToken}`;


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
}

interface HookSettings {
  persistSession?: boolean;
  useSoundEffects?: boolean;
}

function useAbstractChat({
  apiUrl,
  socketUrl,
  botToken,
  defaultHookSettings,
  onSessionDestroy,
  headers,
  queryParams,
  pathParams,
  userData,
  language,
}: useChatOptions): UseAbstractchatReturnType {
  const locale = useLocale();
  const [settings, _setSettings] = useSyncedState(
    "[SETTINGS]:[OPEN]",
    {
      persistSession: defaultHookSettings?.persistSession ?? false,
      useSoundEffects: defaultHookSettings?.useSoundEffects ?? false,
    },
    "local",
  );

  const axiosInstance = useAxiosInstance({
    apiUrl,
    botToken,
  });

  const [session, setSession] = useSyncedState<ChatSessionType>(
    SESSION_KEY(botToken),
    undefined,
    settings?.persistSession ? "local" : "memory",
  );

  async function refreshSession(sessionId: string) {
    let response = await getChatSessionById(axiosInstance, sessionId);
    if (response.data) {
      setSession(response.data);
    }
    return response.data;
  }

  const agent = session?.assignee_id === 555 ? "BOT" : "USER";

  const { socket, socketState } = useSocket(socketUrl, {
    autoConnect: true,
    transports: ["websocket"],
    closeOnBeforeunload: true,
    query: {
      botToken,
      sessionId: session?.id,
      client: "widget",
      clientVersion: pkg.version,
    }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session && socket) {

      const currentSessionId = session.id;

      const heartbeatPayload = {
        sessionId: currentSessionId,
        client: "widget",
        botToken,
        user: userData,
        timestamp: Date.now(),
      }

      async function sendHeartbeat() {
        socket?.emit('heartbeat', heartbeatPayload);
      }

      sendHeartbeat();

      interval = setInterval(() => {
        sendHeartbeat();
      }, 50 * 1000); // 50 seconds
    }

    return () => {
      clearInterval(interval);
    }

  }, [socket, session, botToken, userData]);

  useEffect(() => {
    if (session) {

      socket?.on("heartbeat:ack", (data: { success: boolean }) => {
        if (data.success) {
          debug("heartbeat ack")
        }
      })

      return () => {
        socket?.off("heartbeat:ack");
      }
    }
  }, [session]);


  const setSettings = (data: NonNullable<Partial<typeof settings>>) => {
    _setSettings(Object.assign({}, settings, data));
  };

  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null
  });

  const [hookState, _setHookState] = useTimeoutState<HookState>("idle", 1000 * 5);

  const setHookState = (state: HookState) => {
    if (state === "loading" && agent === "BOT") {
      return;
    }
    _setHookState(state);
  }
  const [info, setInfo] = useTimeoutState<ReactNode | null>(
    () => representSocketState(socketState, locale.get),
    1000,
  );

  const initialData = useSWR(
    ["initialData", botToken],
    async ([_, _token]) => {
      const { data } = await getInitData(axiosInstance, session?.id);
      return {
        history: data ? historyToWidgetMessages(data.history) : [],
        faq: data?.faq ?? [],
        initial_questions: data?.initial_questions ?? [],
        logo: data?.logo ?? "",
      }
    },
    {
      onSuccess(data) {
        dispatch({
          type: "PREPEND_HISTORY",
          payload: data.history,
        });
      },
      fallbackData: {
        history: [],
        faq: [],
        initial_questions: [],
        logo: "",
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    },
  );

  const handleConnect = useCallback(() => {
    if (session) {
      socket?.emit("join_session", { session_id: session.id });
    }
  }, [session?.id, socket]);

  const handleReconnect = useCallback(() => {
    if (session) {
      socket?.emit("join_session", { session_id: session.id });
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
    setSession(null);
    setHookState("idle");
    dispatch({ type: "RESET" });
    onSessionDestroy?.();
  }

  function recreateSession() {
    clearSession();
    createSession(axiosInstance, botToken).then(({ data }) => {
      setSession(data);
      joinSession(data.id);
    });
  }

  const handleIncomingMessage = (socketMsg: StructuredSocketMessageType) => {
    handleSocketMessages({
      _message: socketMsg,
      onSessionUpdate(message, _ctx) {
        setSession(message.value.session);
      },
      onBotMessage(message, _ctx) {
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onChatEvent(message, _ctx) {
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onUi(message, _ctx) {
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onForm(message, _ctx) {
        dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
      },
      onInfo(message, _ctx) {
        // setInfo(message.value);
      },
      onOptions(message, _ctx) {
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
      _socket: socket,
    })
  }
  const handleInfo = useCallback(
    (info: string) => {
      setInfo(info);
    },
    [setInfo],
  );

  useEffect(() => {
    socket?.on("structured_message", handleIncomingMessage);
    socket?.on("info", handleInfo);
    return () => {
      socket?.off("structured_message");
      socket?.off("info");
    };
  }, [handleIncomingMessage, handleInfo, socket]);

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

  const noMessages = chatState.messages.length === 0;

  debug(chatState.messages)

  async function sendMessage({
    content,
    user,
    headers: inputHeaders,
    PathParams: inputPathParams,
    query_params: inputQueryParams,
    ...data
  }: SendMessageInput) {
    let chatSession = session;

    if (!session && noMessages) {
      try {
        setHookState("loading");
        const { data: newSession } = await createSession(axiosInstance, botToken);
        if (newSession) {
          setSession(newSession);
          joinSession(newSession.id);
          chatSession = newSession;
        } else {
          throw new Error("Failed to create session");
        }
      } catch (error) {
        console.error("Error creating session:", error);
        setHookState("error");
        return null;
      }
    }

    if (chatSession && socket) {
      const msgId = genId();
      const payload: MessagePayload = {
        id: msgId,
        bot_token: botToken,
        content: content.text,
        session_id: chatSession.id,
        headers: {
          ...headers,
          ...inputHeaders,
        },
        pathParams: {
          ...pathParams,
          ...inputPathParams,
        },
        query_params: {
          ...queryParams,
          ...inputQueryParams,
        },
        user: {
          ...userData,
          ...user,
        },
        language,
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
            session_id: chatSession.id,
            user: payload.user,
          },
        });
        if (chatState.keyboard) {
          dispatch({
            type: "SET_KEYBOARD",
            payload: null
          });
        }
        setHookState("loading");
        socket.emit("send_chat", payload);
        return payload;
      } catch (error) {
        console.error("Error sending message:", error);
        setHookState("error");
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

  return {
    version: pkg.version,
    state: chatState,
    session: session ?? null,
    agent,
    // Detived // 
    isSessionClosed: session?.status === SessionStatus.CLOSED_RESOLVED || session?.status === SessionStatus.CLOSED_UNRESOLVED,
    // ------- //
    recreateSession,
    clearSession,
    sendMessage,
    noMessages,
    initialData: initialData?.data ?? null,
    info,
    hookState,
    settings,
    setSettings,
    axiosInstance,
    handleKeyboard
  };
}

interface InitialData {
  logo: string;
  faq: [];
  initial_questions: string[];
  history: MessageType[];
}

interface UseAbstractchatReturnType {
  version: string;
  state: ChatState,
  session: ChatSessionType | null;
  agent: "BOT" | "USER";
  isSessionClosed: boolean;
  recreateSession: () => void;
  clearSession: () => void;
  sendMessage: (input: SendMessageInput) => Promise<MessagePayload | null>;
  noMessages: boolean;
  info: ReactNode;
  hookState: HookState;
  initialData: InitialData | null;
  settings: HookSettings | null;
  setSettings: (data: NonNullable<Partial<HookSettings>>) => void;
  axiosInstance: AxiosInstance;
  handleKeyboard: (option: string) => void;
}

export { useAbstractChat, type SendMessageInput, type HookState, type UseAbstractchatReturnType };