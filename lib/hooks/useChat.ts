/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSyncedState } from "./useSyncState";
import { produce } from "immer";
import { ReactNode, useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  BotMessageType,
  ChatSession,
  HandoffPayloadType,
  MessageType,
  UserMessageType,
} from "@lib/types";
import { useAxiosInstance } from "./useAxiosInstance";
import {
  ChatMessageHistory,
  createSession,
  getInitData,
} from "@lib/utils/getters";
import useSWR from "swr";
import { useTimeoutState } from "../hooks/useTimeoutState";
import { TypedEventTarget } from "@lib/utils/typed-event-target";
import { useSocket } from "./socket";
import { representSocketState } from "./socketState";
import { isUiElement, SocketMessageParams } from "./parse-structured-response";
import { decodeJSON } from "@lib/utils/parseJson";

function debug(...args: unknown[]) {
  const prefix = "[useChat]";
  if (process.env.NODE_ENV === "development") {
    console.log(prefix, ...args);
  }
}

type useChatOptions = {
  socketUrl: string;
  apiUrl: string;
  botToken: string;
  onHandoff?: (payload: HandoffPayloadType) => void;
  onSessionDestroy?: () => void;
  defaultHookSettings?: {
    persistSession?: boolean;
    useSoundEffects?: boolean;
  };
};

export enum Events {
  MESSAGE = "message",
  SYSTEM_EVENT = "system_event",
  BOT_MESSAGE = "bot_message",
  AGENT_MESSAGE = "agent_message",
  USER_MESSAGE = "user_message",
  INFO = "info",
}

type State = {
  lastUpdated: number | null;
  messages: MessageType[];
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
    type: "UPDATE_MESSAGE";
    payload: { id: string; payload: Partial<MessageType> };
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
    type: "APPEND_CONTENT_TO_MESSAGE";
    payload: {
      content: string;
      messageId: string;
    };
  }
  | {
    type: "SET_SERVER_ID";
    payload: {
      clientMessageId: string;
      ServerMessageId: number;
    };
  };

function chatReducer(state: State, action: ActionType) {
  return produce(state, (draft) => {
    const setLastupdated = () => {
      draft.lastUpdated = Date.now();
    };
    switch (action.type) {
      case "INIT":
        setLastupdated();
        break;
      case "CLEAR_MESSAGES":
        draft.messages = [];
        draft.lastUpdated = null;
        break;
      case "ADD_RESPONSE_MESSAGE": {
        // if the `responseFor`
        const msg = action.payload;
        if (msg.type === "FROM_BOT" && msg.component === "TEXT") {
          const prevBotMessage = draft.messages.find(
            (_) => _.type === "FROM_BOT" && _.responseFor === msg.responseFor
          ) as BotMessageType<{ message: string }> | undefined;
          // Sorry
          if (prevBotMessage && prevBotMessage.data.message.length > 0) {
            prevBotMessage.data.message +=
              (msg as BotMessageType<{ message: string }>).data.message ?? "";

            debug("[message]", prevBotMessage.data.message);
          } else {
            draft.messages.push(msg);
          }
        } else {
          draft.messages.push(msg);
        }
        break;
      }
      case "APPEND_CONTENT_TO_MESSAGE": {
        break;
      }
      case "APPEND_USER_MESSAGE": {
        draft.messages.push(action.payload);
        setLastupdated();
        break;
      }
      case "UPDATE_MESSAGE":
        setLastupdated();
        break;
      case "DELETE_MESSAGE":
        draft.messages = draft.messages.filter(
          (msg) => msg.id !== action.payload.id
        );
        setLastupdated();
        break;
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
        // responseFor, serverId
        const { clientMessageId, ServerMessageId } = action.payload;

        const message = draft.messages.find(
          (msg) => msg.type === "FROM_BOT" && msg.responseFor === clientMessageId
        );

        if (message) {
          message.serverId = ServerMessageId;
        }

        break;
      }
      default:
        break;
    }
  });
}

const SESSION_KEY = (botToken: string) => `[OPEN_SESSION_${botToken}`;

const genId = (len = 20) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

type SendMessagePayload = {
  id: string;
  content: string;
  session_id: string;
  headers?: Record<string, unknown>;
  bot_token: string;
  query_params?: Record<string, string>;
  user?: {
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    customData?: Record<string, string>;
  };
};

function historyToMessages(mgs: ChatMessageHistory[]) {
  const messages: MessageType[] = [];
  for (const msg of mgs) {
    const { type } = msg;
    if (type === "message") {
      if (msg.from_user) {
        messages.push({
          type: "FROM_USER",
          content: msg.message ?? "",
          id: msg.id.toString(),
          session_id: msg.session_id ?? "",
          timestamp: msg.created_at ?? "",
          serverId: msg.id.toString(),
        });
      } else {
        messages.push({
          type: "FROM_BOT",
          id: msg.id.toString(),
          component: "TEXT",
          data: {
            message: msg.message ?? "",
          },
          responseFor: null,
          serverId: msg.id,
        });
      }
    }
  }
  return messages;
}


type HookState = "loading" | "error" | "idle";

export function useChat({
  apiUrl,
  socketUrl,
  botToken,
  defaultHookSettings,
  onHandoff,
  onSessionDestroy,
}: useChatOptions) {
  const [settings, _setSettings] = useSyncedState(
    "[SETTINGS]:[OPEN]",
    {
      persistSession: defaultHookSettings?.persistSession ?? false,
      useSoundEffects: defaultHookSettings?.useSoundEffects ?? false,
    },
    "local"
  );
  const axiosInstance = useAxiosInstance({
    apiUrl,
    botToken,
  });
  const [session, setSession] = useSyncedState<ChatSession>(
    SESSION_KEY(botToken),
    undefined,
    settings?.persistSession ? "local" : "memory"
  );
  const { socket, socketState } = useSocket(socketUrl, {
    autoConnect: true,
    transports: ["websocket"],
  });

  const setSettings = (data: NonNullable<Partial<typeof settings>>) => {
    _setSettings(Object.assign({}, settings, data));
  };

  const events = useRef(
    new TypedEventTarget<{
      message: CustomEvent<SendMessagePayload>;
      info: CustomEvent<string>;
      error: CustomEvent<string>;
      new_message: CustomEvent<MessageType>;
      handoff: CustomEvent<HandoffPayloadType>;
    }>()
  ).current;

  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
  });

  debug("[messages]", chatState.messages);

  const [hookState, setHookState] = useState<HookState>("idle");

  const [info, setInfo] = useTimeoutState<ReactNode | null>(
    () => representSocketState(socketState),
    1000
  );

  const initialData = useSWR(
    ["initialData", botToken, session],
    async ([_, _token, _session]) => {
      const { data } = await getInitData(axiosInstance, _session?.id);
      return (
        data ?? {
          faq: [],
          history: [],
          initial_questions: [],
          logo: "",
        }
      );
    },
    {
      onSuccess(data, key, config) {
        dispatch({
          type: "PREPEND_HISTORY",
          payload: historyToMessages(data.history),
        });
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  const handleConnect = useCallback(() => {
    socket?.emit("join_session", { session_id: session?.id });
  }, [session?.id, socket]);

  useEffect(() => {
    socket?.on("connect", handleConnect);
    return () => {
      socket?.off("connect", handleConnect);
    };
  }, [handleConnect, socket]);

  function joinSession(session_id: string) {
    socket?.emit("join_session", {
      session_id,
    });
  }

  function clearSession() {
    socket?.emit("leave_session", { session_id: session?.id });
    setSession(null);
    dispatch({ type: "CLEAR_MESSAGES" });
    onSessionDestroy?.();
  }

  function recreateSession() {
    clearSession();
    createSession(axiosInstance, botToken).then(({ data }) => {
      setSession(data);
      joinSession(data.id);
    });
  }

  async function sendMessage({
    content,
    user,
    ...data
  }: {
    content: {
      text: string;
    };
    headers?: Record<string, unknown>;
    user?: Record<string, unknown>;
    query_params?: Record<string, string>;
  }) {
    let chatSession = session;

    if (!session && chatState.messages.length === 0) {
      const { data } = await createSession(axiosInstance, botToken);
      if (data) {
        setSession(data);
        joinSession(data.id);
        chatSession = data;
      }
    }

    if (chatSession && socket) {
      const msgId = genId();
      const payload: SendMessagePayload = {
        id: msgId,
        bot_token: botToken,
        content: content.text,
        session_id: chatSession.id,
        ...data,
      };

      dispatch({
        type: "APPEND_USER_MESSAGE",
        payload: {
          type: "FROM_USER",
          id: msgId,
          content: content.text,
          timestamp: new Date().toISOString(),
          session_id: chatSession.id,
          user,
        },
      });

      try {
        setHookState("loading");
        socket.emit("send_chat", payload);
        events.dispatchEvent(
          new CustomEvent("message", {
            detail: payload,
          })
        );
      } catch (error) {
        setHookState("error");
      }
    }
  }

  const handleIncomingMessage =
    (response: SocketMessageParams) => {
      debug(response);
      try {
        let message: MessageType | null = null;

        if (response.type === "info") {
          return;
        }

        if (response.type === "message") {
          if (response.value === "|im_end|" || !response.value) {
            return;
          }

          message = {
            type: "FROM_BOT",
            component: "TEXT",
            responseFor: response.client_message_id ?? null,
            id: response.server_message_id?.toString() ?? genId(),
            data: {
              message: response.value,
            },
            serverId: response.server_message_id ?? null,
            agent: response.agent
          };

        }

        else if (response.type === "vote") {
          if (
            response.server_message_id &&
            response.client_message_id
          ) {
            const payload = {
              clientMessageId: response.client_message_id,
              ServerMessageId: response.server_message_id,
            }
            debug("vote", payload);
            dispatch({
              type: "SET_SERVER_ID",
              payload,
            });
          }
        }

        else if (
          response.type === "handoff") {
          const handoff = response.value;
          const message: BotMessageType = {
            component: "HANDOFF",
            data: handoff,
            type: "FROM_BOT",
            serverId: response.server_message_id ?? null,
            id: response.server_message_id?.toString() ?? genId(),
            responseFor: response.client_message_id ?? null,
          };

          onHandoff?.(handoff);
          dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
          events.dispatchTypedEvent(
            "handoff",
            new CustomEvent("handoff", { detail: handoff })
          );
        }

        else if (
          response.type === "ui" &&
          isUiElement(response.value)
        ) {
          const uiVal = response.value;
          message = {
            type: "FROM_BOT",
            component: uiVal.name,
            data: decodeJSON(JSON.stringify(uiVal)), // sometimes the api response is messed up, nested json strings, ...etc. kinda work around
            serverId: null,
            id: genId(),
            responseFor: response.client_message_id ?? null,
            agent: response.agent,
          };
          debug("[ui]", message);
        }

        if (message) {
          dispatch({ type: "ADD_RESPONSE_MESSAGE", payload: message });
          setInfo(null);
          events.dispatchEvent(
            new CustomEvent("new_message", {
              detail: message,
            })
          );
        }

      } catch (error) {
        setHookState("error");
        debug(error);
      }
      setHookState("idle");
    }

  const handleInfo = useCallback(
    (info: string) => {
      setInfo(info);
      events.dispatchEvent(
        new CustomEvent("info", {
          detail: info,
        })
      );
    },
    [events, setInfo]
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

  return {
    state: chatState,
    session: session ?? null,
    recreateSession,
    clearSession,
    sendMessage,
    noMessages,
    initialData,
    info,
    events,
    hookState,
    settings,
    setSettings,
    axiosInstance
  };
}
