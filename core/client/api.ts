import { User } from "@core/types";
import { SendChatDto, WidgetVoteDto } from "../types/schemas-v2";
import { NormalizedConfig } from "./config";
import { basicClient, Dto, Endpoint } from "@core/sdk";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiCallerOptions {
  config: NormalizedConfig;
}

export class ApiCaller {
  #client: ReturnType<typeof basicClient>;
  #uploadFileClient: AxiosInstance;

  constructor(private readonly options: ApiCallerOptions) {
    const { baseUrl, headers } = this.constructClientOptions(
      options.config.user,
    );
    this.#client = this.createOpenAPIClient({ baseUrl, headers });
    this.#uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  }

  constructClientOptions = (user: User) => {
    const consumerHeader = {
      claim: "",
      value: "",
    };

    if (user?.email) {
      consumerHeader.claim = "email";
      consumerHeader.value = user.email;
    } else if (user?.phone) {
      consumerHeader.claim = "phone";
      consumerHeader.value = user.phone;
    }

    const baseUrl = this.options.config.apiUrl;
    const headers = {
      "X-Bot-Token": this.options.config.token,
      "X-Consumer-Id": `${consumerHeader.claim}:${consumerHeader.value}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ["Authorization"]: this.options.config.contactToken
        ? `Bearer ${this.options.config.contactToken}`
        : undefined,
    };

    return { baseUrl, headers };
  };

  createOpenAPIClient = ({
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
  createAxiosUploadClient = ({
    baseUrl,
    headers,
  }: ReturnType<typeof this.constructClientOptions>) => {
    const uploadPath = "/backend/widget/v2/upload" satisfies Endpoint;
    return axios.create({
      baseURL: `${baseUrl}${uploadPath}`,
      headers,
    });
  };

  setUser = (user: User) => {
    const { baseUrl, headers } = this.constructClientOptions(user);
    this.#client = this.createOpenAPIClient({ baseUrl, headers });
    this.#uploadFileClient = this.createAxiosUploadClient({ baseUrl, headers });
  };

  me = async () => {
    return await this.#client.GET("/backend/widget/v2/me");
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
    return await this.#client.POST("/backend/widget/v2/me/create", {
      params: { header: { "x-bot-token": this.options.config.token } },
      body,
    });
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
    const { data } = await this.#uploadFileClient.post<Dto["UploadWidgetFileResponseDto"]>(
      "",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      },
    );
    return data;
  };

  vote = async (body: WidgetVoteDto) => {
    return await this.#client.POST("/backend/widget/v2/chat/vote", { body });
  };
}