import { useConfigData } from "../providers/ConfigDataProvider";
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
  type ChatSessionType,
  SessionStatus,
} from "@core/types/schemas";
import { useSyncedState } from "./useSyncState";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { mapChatHistoryToMessage } from "@core/utils/history-to-widget-messages";
import lodashSet from "lodash.set";
import { useWidgetSoundEffects } from "@react/providers/use-widget-sfx";
import { genId } from "@core/utils/genId";
import { MessageType, SendMessageInput, UserMessageType } from "@core/types";

/**
 * IMPORTANT: both intervals must have the same value, otherwise the one with the longer duration will be cleared and recreated and so on, and never actually fired
 * Both rely on the `session`... polling messages shouldn't trigger a session change... but still, the useEffect will rerun and the intervals will be recreated
 */
const SESSION_POOLING_INTERVAL = 5000; // every 5 seconds
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
  /**
   * Options that the AI provides to the user after a reply, such as "I need more help" or "This is helpful"
   */
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
  }
  | {
    type: "SET_MESSAGES";
    payload: MessageType[];
  }
  | {
    type: "APPEND_MESSAGES";
    payload: MessageType[];
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
          (msg) => !historyIds.includes(msg.id),
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
        const message = draft.messages.find((message) => {
          if (
            message.type === "FROM_USER" &&
            message.id === action.payload?.clientMessageId
          ) {
            return true;
          }
        });
        if (message?.type === "FROM_USER") {
          lodashSet(message, "deliveredAt", action.payload.deliveredAt);
        }
        break;
      }
      case "SET_MESSAGES": {
        draft.messages = action.payload;
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
  sessionKey = (botToken, { external_id }) =>
    `[OPEN_SESSION_${botToken}]_${external_id ? external_id : "session"}`,
}: {
  persist: boolean;
  sessionKey?: (botToken: string, user: UserObject) => string;
}) {
  const { botToken, http, user } = useConfigData();
  const [_session, setSession, clearBucket] = useSyncedState<ChatSessionType>(
    sessionKey(botToken, user),
    undefined,
    persist ? "local" : "memory",
  );

  const transformSession = (session: ChatSessionType) => {
    return {
      ...session,
      isSessionClosed: session.status !== SessionStatus.OPEN,
      isAssignedToAi: session.assignee_id === 555,
      isAssignedToHuman: session.assignee_id !== 555,
      isPendingHuman: session.assignee_id === 555 && session.ai_closure_type === AIClosureType.handed_off,
    }
  }

  const session = useMemo(() => {
    return _session ? transformSession(_session) : null;
  }, [_session]);

  const [refreshSessionState, refreshSession] = useAsyncFn(
    async (sId: string) => {
      let response = await http.apis.fetchSession(sId);
      if (response.data) {
        setSession(response.data);
      }
      return response.data;
    },
    [http, setSession],
  );
  // Poll for session updates with improved error handling
  const [_pollSessionState, pollSession] = useAsyncFn(
    async (sessionId: string) => {
      try {
        const sessionUpdated = await refreshSession(sessionId);
        if (sessionUpdated) {
          return transformSession(sessionUpdated);
        }
        return null;
      } catch (error) {
        console.error("Error polling session:", error);
        throw error;
      }
    },
    [refreshSession, transformSession]
  );

  function deleteSession() {
    setSession(null);
    clearBucket();
  }

  return {
    session,
    refreshSession,
    refreshSessionState,
    deleteSession,
    setSession,
    transformSession,
    pollSession,
  };
}

// Initialize chat state and reducer
function useAbstractChat({ onSessionDestroy }: useChatOptions) {
  const [chatState, dispatch] = useReducer(chatReducer, {
    lastUpdated: null,
    messages: [],
    keyboard: null,
  });

  const [hookState, setHookState] = useState<HookState>({ state: "idle" });

  // Check if there are no messages
  const noMessages = chatState.messages.length === 0;

  const { botToken, http, widgetSettings, defaultSettings, language, ...config } = useConfigData();
  const { messageArrivedSound } = useWidgetSoundEffects();

  // Determine if session should be persisted
  const shouldPersistSession =
    widgetSettings?.persistSession || defaultSettings.persistSession;

  // Manage session state
  const { refreshSession, session, deleteSession, setSession, pollSession } = useSession({
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

  // Poll for new messages with 
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


  // Set up polling intervals
  useEffect(() => {
    let sessionInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    if (session) {
      // Poll for session updates
      sessionInterval = setInterval(() => {
        pollSession(session.id);
      }, SESSION_POOLING_INTERVAL);

      // Poll for new messages
      messageInterval = setInterval(() => {
        const lastMessageTimestamp = chatState.messages.at(-1)?.timestamp;
        if (lastMessageTimestamp) {
          pollMessages(session.id, lastMessageTimestamp);
        }
      }, MESSAGE_POOLING_INTERVAL);
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
        setHookState({ state: "idle" });
      } catch (error) {
        console.error("Error clearing session:", error);
        throw error;
      }
    },
    [deleteSession, dispatch, onSessionDestroy, setHookState]
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

  const sendMessage = async ({ content, user, attachments, ...data }: SendMessageInput) => {
    try {
      let chatSession = session;
      let newSessionCreated = false;

      // Only set loading if creating new session (which will be AI) or if existing session is assigned to AI
      if (!session || session?.isAssignedToAi) {
        setHookState({ state: "loading" });
      }

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
              isPendingHuman: false,
            };
            newSessionCreated = true;
          } else {
            throw new Error("Failed to create new chat session");
          }
        } catch (error) {
          setHookState({
            state: "error",
            error: error instanceof Error ? error.message : "Failed to create session"
          });
          throw error;
        }
      }

      if (!chatSession) {
        const error = new Error("No active session available");
        setHookState({ state: "error", error: error.message });
        throw error;
      }

      const msgId = genId();
      const { headers, queryParams } = config;

      // Add message to local state first
      dispatch({
        type: "APPEND_USER_MESSAGE",
        payload: {
          type: "FROM_USER",
          id: msgId,
          content: content.text,
          timestamp: new Date().toISOString(),
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

      if (!newSessionCreated && chatSession.isAssignedToAi) {
        try {
          const sessionUpdated = await pollSession(chatSession.id);
          if (sessionUpdated) {
            chatSession = sessionUpdated;
          }
        } catch (error) {
          console.error("Error polling session:", error);
          // Continue with existing session if polling fails
        }
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
          ...user,
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

      // Handle response
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
          });
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
          });
        }
      } else {
        const errorMessage = response.data.error?.message || "Unknown error occurred";
        dispatch({
          type: "ADD_RESPONSE_MESSAGE",
          payload: {
            type: "FROM_BOT",
            id: genId(),
            timestamp: new Date().toISOString(),
            component: "TEXT",
            data: {
              message: errorMessage,
              variant: "error"
            }
          }
        });
        setHookState({ state: "error", error: errorMessage });
      }

      setHookState({ state: "idle" });
      return { id: msgId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Error in sendMessage:", errorMessage, error);
      // Only set error state if we were in loading state (AI session)
      if (!session || session?.isAssignedToAi) {
        setHookState({ state: "error", error: errorMessage });
      }
      throw error;
    }
  }

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
    hookState,
    recreateSession: recreateSessionAsync,
    clearSession: clearSessionAsync,
    sendMessage,
    handleKeyboard,
  };
}

export { useAbstractChat, type SendMessageInput, type HookState };
