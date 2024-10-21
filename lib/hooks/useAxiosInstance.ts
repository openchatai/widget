import { PreludeData, UserObject, WorkingHours } from "@lib/types";
import { ChatHistoryMessageType, ChatSessionType, ConsumerType } from "@lib/types/schemas";
import axios, { HttpStatusCode } from "axios";
import { useMemo } from "react";

type Options = {
  apiUrl: string;
  botToken: string;
};

export function isResponseOk(status: HttpStatusCode) {
  return status >= 200 && status < 300;
}

const ConsumerIdHeader = "X-Consumer-Id";
const BotTokenHeader = "X-Bot-Token";

export function useAxiosInstance(options: Options) {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: options.apiUrl,
      headers: {
        [BotTokenHeader]: options.botToken,
      },
    })
  }, [options]);

  const apis = useMemo(() => ({
    /**
     * creates a fresh session and link the user data to it
     * @param user 
     * @returns 
     */
    createConversation: (consumerId: string, user?: UserObject) => {
      return instance.post<ChatSessionType>(`widget/contact/create-session/${consumerId}`, { user })
    },
    /**
     * get session data by id
     * @param sessionId 
     */
    fetchSession: (sessionId: string, consumerId: string) => {
      return instance.get<ChatSessionType>(`/chat-session/one/${sessionId}`, {
        headers: {
          [ConsumerIdHeader]: consumerId
        }
      })
    },

    /**
     * 
     */
    fetchContactSessions: (contactId: string,
      options?: {
        openOnly?: boolean;
        maxClosedSessions?: number;
      }) => {
      return instance.get<ChatSessionType[]>(`/widget/contact/conversations/${contactId}`, {
        params: options
      })
    },

    fetchConversationHistory: (sessionId: string, consumerId: string) => {
      return instance.get<ChatHistoryMessageType[]>(`/widget/session/history/${sessionId}`, {
        headers: {
          [ConsumerIdHeader]: consumerId
        }
      })
    },
    /**
     * get the organization office working hours.
     */
    getOfficeHours: () => {
      return instance.get<WorkingHours>("/copilot/office-hours/public");
    },

    fetchPreludeData: () => {
      return instance.get<PreludeData | undefined>("/widget/prelude");
    },

    /**
     * fetch contact conversations/sessions
     */
    fetchConversations: (contactId: string) => {
      return instance.get<ChatSessionType[]>(`/widget/contact/conversations/${contactId}`)
    },

    /**
     * given the userData object we will create or update the contact + get the related conversations/tickets/sessions
     */
    dumpContact: (userData: UserObject) => {
      return instance.post<ConsumerType>("/widget/contact/upsert", userData)
    }
  }), [options])

  return {
    instance,
    options,
    ...apis
  }
}
