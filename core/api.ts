import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Dto, Endpoint, basicClient } from "./sdk";
import { WidgetConfig } from "./types/WidgetConfig";
import { SendChatDto, WidgetVoteDto } from "./types/schemas";

export interface ApiCallerOptions {
  config: WidgetConfig;
}

export class ApiCaller {
  #client: ReturnType<typeof basicClient>;
  #uploadFileClient: AxiosInstance;

  constructor(private readonly options: ApiCallerOptions) {
    const { baseUrl, headers } = this.constructClientOptions(
      options.config.contactToken,
    );
    this.#client = this.createOpenAPIClient({ baseUrl, headers });
    this.#uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  }

  private constructClientOptions = (token: string | null | undefined) => {
    const baseUrl = this.options.config.apiUrl || "https://api.open.cx";
    const headers = {
      "X-Bot-Token": this.options.config.token,
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
    this.#client = this.createOpenAPIClient({ baseUrl, headers });
    this.#uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  };

  widgetPrelude = async () => {
    return await this.#client.GET("/backend/widget/v2/prelude", {
      params: { header: { "X-Bot-Token": this.options.config.token } },
    });
  };

  handleMessage = async (body: SendChatDto, abortSignal?: AbortSignal) => {
    return await this.#client.POST("/backend/widget/v2/chat/send", {
      body,
      signal: abortSignal,
    });
  };

  getSessionHistory = async (
    sessionId: string,
    lastMessageTimestamp?: string,
  ) => {
    const query = lastMessageTimestamp ? { lastMessageTimestamp } : undefined;
    return await this.#client.GET(
      "/backend/widget/v2/session/history/{sessionId}",
      { params: { path: { sessionId }, query } },
    );
  };

  createContact = async (body: Dto["CreateContactDto"]) => {
    return await this.#client.POST(
      "/backend/widget/v2/contact/create-unverified",
      {
        params: { header: { "x-bot-token": this.options.config.token } },
        body,
      },
    );
  };

  createSession = async () => {
    return await this.#client.POST("/backend/widget/v2/create-session");
  };

  getSession = async (sessionId: string) => {
    return await this.#client.GET("/backend/widget/v2/session/{sessionId}", {
      params: { path: { sessionId } },
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
    const { data } = await this.#uploadFileClient.post<
      Dto["UploadWidgetFileResponseDto"]
    >("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    return data;
  };

  vote = async (body: WidgetVoteDto) => {
    return await this.#client.POST("/backend/widget/v2/chat/vote", { body });
  };
}
