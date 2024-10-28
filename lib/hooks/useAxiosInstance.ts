import { ChatHistoryMessageType, ChatSessionType } from "@lib/types/schemas";
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
    });
  }, [options]);

  const apis = useMemo(
    () => ({
      createSession: (botToken: string) => {
        return instance.post<ChatSessionType>("/chat-session/" + botToken);
      },
      /**
       * get session data by id
       * @param sessionId
       */
      fetchSession: (sessionId: string) => {
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
