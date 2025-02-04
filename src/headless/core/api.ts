import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { type Dto, type Endpoint, basicClient } from "./sdk";
import type { WidgetConfig } from "./types/widget-config";
import type { SendMessageDto, VoteInputDto } from "./types/schemas";

export class ApiCaller {
  private client: ReturnType<typeof basicClient>;
  private uploadFileClient: AxiosInstance;
  private config: WidgetConfig;

  constructor({
    config,
  }: {
    config: WidgetConfig;
  }) {
    this.config = config;
    const { baseUrl, headers } = this.constructClientOptions(
      config.user?.token,
    );
    this.client = this.createOpenAPIClient({ baseUrl, headers });
    this.uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  }

  private constructClientOptions = (token: string | null | undefined) => {
    const baseUrl = this.config.apiUrl || "https://api.open.cx";
    const headers = {
      "X-Bot-Token": this.config.token,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    return { baseUrl, headers };
  };

  private createOpenAPIClient = ({
    baseUrl,
    headers,
  }: ReturnType<typeof this.constructClientOptions>) => {
    return basicClient({
      baseUrl,
      onRequest: ({ request }) => {
        Object.entries(headers).forEach(([key, value]) => {
          if (value) {
            request.headers.set(key, value);
          }
        });
      },
    });
  };
  private createAxiosUploadClient = ({
    baseUrl,
    headers,
  }: ReturnType<typeof this.constructClientOptions>) => {
    const uploadPath = "/backend/widget/v2/upload" satisfies Endpoint;
    return axios.create({
      baseURL: `${baseUrl}${uploadPath}`,
      headers,
    });
  };

  setAuthToken = (token: string) => {
    const { baseUrl, headers } = this.constructClientOptions(token);
    this.client = this.createOpenAPIClient({ baseUrl, headers });
    this.uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  };

  widgetPrelude = async () => {
    return await this.client.GET("/backend/widget/v2/prelude", {
      params: { header: { "X-Bot-Token": this.config.token } },
    });
  };

  sendMessage = async (body: SendMessageDto, abortSignal?: AbortSignal) => {
    return await this.client.POST("/backend/widget/v2/chat/send", {
      body,
      signal: abortSignal,
    });
  };

  getSessionHistory = async ({
    sessionId,
    lastMessageTimestamp,
    abortSignal,
  }: {
    sessionId: string;
    lastMessageTimestamp?: string;
    abortSignal: AbortSignal;
  }) => {
    const query = lastMessageTimestamp ? { lastMessageTimestamp } : undefined;
    return await this.client.GET(
      "/backend/widget/v2/session/history/{sessionId}",
      { params: { path: { sessionId }, query }, signal: abortSignal },
    );
  };

  createUnverifiedContact = async (body: Dto["CreateUnverifiedContactDto"]) => {
    return await this.client.POST(
      "/backend/widget/v2/contact/create-unverified",
      {
        params: { header: { "x-bot-token": this.config.token } },
        body,
      },
    );
  };

  createSession = async (body: Dto["CreateWidgetChatSessionDto"]) => {
    return await this.client.POST("/backend/widget/v2/create-session", {
      body,
    });
  };

  getSession = async ({
    sessionId,
    abortSignal,
  }: { sessionId: string; abortSignal: AbortSignal }) => {
    return await this.client.GET("/backend/widget/v2/session/{sessionId}", {
      params: { path: { sessionId } },
      signal: abortSignal,
    });
  };

  getSessions = async ({
    cursor,
    filters,
    abortSignal,
  }: {
    cursor: string | undefined;
    filters: Record<string, string>;
    abortSignal?: AbortSignal;
  }) => {
    return await this.client.GET("/backend/widget/v2/sessions", {
      params: { query: { cursor, filters: JSON.stringify(filters) } },
      signal: abortSignal,
    });
  };

  uploadFile = async (
    file: {
      id: string;
      file: File;
    },
    config: Partial<AxiosRequestConfig> = {},
  ) => {
    const formData = new FormData();
    formData.append("file", file.file);

    // Couldn't get this to work with the openapi client... dunno why...
    const { data } = await this.uploadFileClient.post<
      Dto["UploadWidgetFileResponseDto"]
    >("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    return data;
  };

  vote = async (body: VoteInputDto) => {
    return await this.client.POST("/backend/widget/v2/chat/vote", { body });
  };
}
