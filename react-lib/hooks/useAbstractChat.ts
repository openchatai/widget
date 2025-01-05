import { useLocale } from "../providers/LocalesProvider";
import { useConfigData } from "../providers/ConfigDataProvider"
import { UserObject } from "@react/types";
import { create } from "mutative";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import pkg from "../../package.json";
import {
  AIClosureType,
  ChatAttachmentType,
  type ChatSessionType,
  MessageType,
  SendMessageInput,
  SessionStatus,
  UserMessageType,
} from "@core/types";
import { useSyncedState } from "./useSyncState";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { mapChatHistoryToMessage } from "@core/utils/history-to-widget-messages";
import lodashSet from "lodash.set";
import { useWidgetSoundEffects } from "@react/providers/use-widget-sfx";
import { genId } from "@core/utils/genId";

const SESSION_POOLING_INTERVAL = 10000; // every 10 seconds
const MESSAGE_POOLING_INTERVAL = 5000; // every 5 seconds

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
  }

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

// Initialize chat state and reducer
function useAbstractChat({
  onSessionDestroy,
}: useChatOptions) {
  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null,
  });

  // Check if there are no messages
  const noMessages = chatState.messages.length === 0;

  // Get locale and configuration data
  const locale = useLocale();
  const { botToken, http, widgetSettings, defaultSettings, language, ...config } = useConfigData();
  const { messageArrivedSound } = useWidgetSoundEffects();

  // Determine if session should be persisted
  const shouldPersistSession = widgetSettings?.persistSession || defaultSettings.persistSession;

  // Manage session state
  const { refreshSession, session, deleteSession, setSession } = useSession({
    persist: shouldPersistSession
  });

  // Fetch chat history with improved error handling
  const [_fetchHistoryState, fetchHistory] = useAsyncFn(
    async (sessionId: string) => {
      if (!session) return [];
      try {
        const { data: redata } = await http.apis.fetchHistory(sessionId);
        if (!redata) return [];
        if (Array.isArray(redata)) {
          return mapChatHistoryToMessage(redata);
        }
        return [];
      } catch (error) {
        console.error("Error fetching history:", error);
        throw error;
      }
    },
    [session, http.apis]
  );

  // Poll for new messages with improved error handling
  const [_pollMessagesState, pollMessages] = useAsyncFn(
    async (sessionId: string, lastMessageTimestamp: string) => {
      try {
        const response = await http.apis.getHistoryPooling({
          sessionId,
          lastMessageTimestamp,
        });

        if (response.data) {
          const messages = mapChatHistoryToMessage(response.data);
          if (messages.length > 0) {
            dispatch({
              type: "APPEND_MESSAGES",
              payload: messages
            });

            try {
              messageArrivedSound.play();
            } catch (error) {
              console.error("Error playing sound:", error);
            }
          }
          return messages;
        }
        return [];
      } catch (error) {
        console.error("Error polling messages:", error);
        throw error;
      }
    },
    [http.apis, dispatch, messageArrivedSound]
  );

  // Poll for session updates with improved error handling
  const [_pollSessionState, pollSession] = useAsyncFn(
    async (sessionId: string) => {
      try {
        await refreshSession(sessionId);
        return true;
      } catch (error) {
        console.error("Error polling session:", error);
        throw error;
      }
    },
    [refreshSession]
  );

  // Set up polling intervals
  useEffect(() => {
    let sessionInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    if (session) {
      // Poll for session updates
      sessionInterval = setInterval(() => {
        pollSession(session.id);
      }, SESSION_POOLING_INTERVAL); // Every 10 seconds

      // Poll for new messages
      messageInterval = setInterval(() => {
        const lastMessageTimestamp = chatState.messages.at(-1)?.timestamp;
        if (lastMessageTimestamp) {
          pollMessages(session.id, lastMessageTimestamp);
        }
      }, MESSAGE_POOLING_INTERVAL); // Every 5 seconds
    }

    return () => {
      clearInterval(sessionInterval);
      clearInterval(messageInterval);
    };
  }, [session, pollSession, pollMessages]);

  // Initialize session and fetch history
  const [initState, initSession] = useAsyncFn(
    async () => {
      if (!session) return;
      try {
        const updatedSession = await refreshSession(session.id);
        if (updatedSession) {
          const history = await fetchHistory(updatedSession.id);
          if (history) {
            dispatch({ type: "PREPEND_HISTORY", payload: history });
          }
        }
      } catch (error) {
        console.error("Error initializing session:", error);
        throw error;
      }
    },
    [session, refreshSession, fetchHistory, dispatch]
  );

  // Initialize on mount
  useEffect(() => {
    initSession();
  }, []);

  // Clear the current session
  const [clearSessionState, clearSessionAsync] = useAsyncFn(
    async () => {
      try {
        deleteSession();
        dispatch({ type: "RESET" });
        onSessionDestroy?.();
      } catch (error) {
        console.error("Error clearing session:", error);
        throw error;
      }
    },
    [deleteSession, dispatch, onSessionDestroy]
  );

  // Recreate a new session
  const [recreateSessionState, recreateSessionAsync] = useAsyncFn(
    async () => {
      try {
        await clearSessionAsync();
        const { data } = await http.apis.createSession(botToken);
        setSession(data);
        return data;
      } catch (error) {
        console.error("Error recreating session:", error);
        throw error;
      }
    },
    [clearSessionAsync, http.apis, botToken, setSession]
  );

  // Send a message with improved error handling
  const [sendMessageState, sendMessage] = useAsyncFn(
    async ({ content, user, attachments, ...data }: SendMessageInput) => {
      let chatSession = session;

      if (!session && noMessages) {
        try {
          const { data: newSession } = await http.apis.createSession(botToken);
          if (newSession) {
            setSession(newSession);
            chatSession = {
              ...newSession,
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
          throw error;
        }
      }

      if (!chatSession) {
        throw new Error("No active session");
      }

      const msgId = genId();
      const { headers, queryParams } = config;

      try {
        // Add message to local state first
        dispatch({
          type: "APPEND_USER_MESSAGE",
          payload: {
            type: "FROM_USER",
            id: msgId,
            content: content.text,
            user: {
              ...config.user,
              ...user
            },
            deliveredAt: null,
            attachments,
          },
        });

        if (chatState.keyboard) {
          dispatch({
            type: "SET_KEYBOARD",
            payload: null,
          });
        }

        // Send message via HTTP
        const response = await http.apis.sendMessage({
          id: msgId,
          content: content.text,
          session_id: chatSession.id,
          bot_token: botToken,
          headers,
          query_params: queryParams,
          user: {
            ...config.user,
            ...user
          },
          language,
          attachments,
          ...data,
        });

        // Mark message as delivered
        dispatch({
          type: "SET_DELIVERED_AT",
          payload: {
            clientMessageId: msgId,
            deliveredAt: new Date().toISOString(),
          },
        });
        // append the response to the chat state
        if (response.data.success) {
          const data = response.data;
          if (data.autopilotResponse) {
            dispatch({
              type: "ADD_RESPONSE_MESSAGE",
              payload: {
                type: "FROM_BOT",
                id: data.autopilotResponse.id || genId(),
                timestamp: new Date().toISOString(),
                component: "TEXT",
                data: {
                  message: data.autopilotResponse.value.content,
                }
              }
            })
          }
          if (data.uiResponse) {
            const uiVal = data.uiResponse.value;
            dispatch({
              type: "ADD_RESPONSE_MESSAGE",
              payload: {
                type: "FROM_BOT",
                id: genId(),
                timestamp: new Date().toISOString(),
                component: uiVal.name,
                data: uiVal.request_response,
              }
            })
          }
        } else {
          dispatch({
            type: "ADD_RESPONSE_MESSAGE",
            payload: {
              type: "FROM_BOT",
              id: genId(),
              component: "TEXT",
              data: {
                message: response.data.error?.message || "",
                variant: "error"
              }
            }
          })
        }
        return { id: msgId };
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },
    [session, noMessages, http.apis, botToken, setSession, config, language, chatState.keyboard]
  );

  // Handle keyboard input with improved error handling
  const handleKeyboard = useCallback(
    (option: string) => {
      sendMessage({
        content: {
          text: option,
        },
      }).catch((error) => {
        console.error("Error handling keyboard input:", error);
      });
      dispatch({
        type: "SET_KEYBOARD",
        payload: null,
      });
    },
    [dispatch, sendMessage]
  );

  return {
    version: pkg.version,
    state: chatState,
    session,
    noMessages,
    initState,
    clearSessionState,
    recreateSessionState,
    sendMessageState,
    recreateSession: recreateSessionAsync,
    clearSession: clearSessionAsync,
    sendMessage,
    handleKeyboard,
  };
}

export { useAbstractChat, type SendMessageInput, type HookState };
