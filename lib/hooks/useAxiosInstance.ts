import { ChatHistoryMessageType, ChatSessionType } from "@lib/types/schemas";
import { PreludeData, WorkingHours } from "@lib/utils";
import axios from "axios";
import { useMemo } from "react";
import { version } from "../../package.json"
type Options = {
  apiUrl: string;
  botToken: string;
};
const BotTokenHeader = "X-Bot-Token";
const WidgetVersionHeader = "X-Widget-Version";

export function useAxiosInstance(options: Options) {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: options.apiUrl,
      headers: {
        [BotTokenHeader]: options.botToken,
        [WidgetVersionHeader]: version,
        "X-Use-Guard": true
      },
    });
  }, [options]);

  const apis = useMemo(
    () => ({
      createSession: (botToken: string) => {
        if (!botToken) {
          throw new Error("Bot token is required");
        }
        return instance.post<ChatSessionType>("/chat-session/" + botToken);
      },
      /**
       * get session data by id
       * @param sessionId
       */
      fetchSession: (sessionId: string) => {
        if (!sessionId){
          throw new Error("Session id is required");
        }
        return instance.get<ChatSessionType>(`widget/session/${sessionId}`);
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

      fetchHistory: (sessionId: string) => {
        if (!sessionId){
          throw new Error("Session id is required");
        }
        return instance.get<ChatHistoryMessageType[]>(
          `widget/session/history/${sessionId}`
        );
      },

      downvote: (id: string) => {
        return instance.delete<{
          message: string;
        }>(`/chat/vote/${id}`);
      },

      upvote: (id: string) => {
        return instance.post<{
          message: string;
        }>(`/chat/vote/${id}`);
      },
    }),
    [instance]
  );

  return { apis, options };
}
