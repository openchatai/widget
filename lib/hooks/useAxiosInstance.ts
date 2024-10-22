import { ChatSessionType } from "@lib/types/schemas";
import { PreludeData, WorkingHours } from "@lib/utils";
import axios from "axios";
import { useMemo } from "react";

type Options = {
  apiUrl: string;
  botToken: string;
};
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
    createSession: (botToken: string) => {
      return instance.post<ChatSessionType>("/chat-session/" + botToken);
    },

    /**
  * get session data by id
  * @param sessionId 
  */
    fetchSession: (sessionId: string) => {
      return instance.get<ChatSessionType>(`/chat-session/one/${sessionId}`)
    },

    fetchPreludeData: () => {
      return instance.get<PreludeData | undefined>("/widget/prelude");
    },
    /**
      * get the organization office working hours.
    */
    getOfficeHours: () => {
      return instance.get<WorkingHours>("/copilot/office-hours/public");
    },
  }), [instance])

  return { apis, options }
}
