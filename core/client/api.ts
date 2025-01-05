import { ChatSessionType } from "../types/schemas";
import { MessageData } from "../types/transport";

export interface ApiCallerOptions {
  apiUrl: string;
  token: string;
}

export class ApiCaller {
  constructor(private readonly options: ApiCallerOptions) {}

  async createSession(): Promise<ChatSessionType> {
    const response = await fetch(`${this.options.apiUrl}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    return response.json();
  }

  async fetchSession(sessionId: string): Promise<ChatSessionType> {
    const response = await fetch(
      `${this.options.apiUrl}/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${this.options.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    return response.json();
  }

  async ping(): Promise<void> {
    const response = await fetch(`${this.options.apiUrl}/ping`, {
      headers: {
        Authorization: `Bearer ${this.options.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to ping API");
    }
  }

  async getMessages(sessionId?: string): Promise<MessageData[]> {
    const url = sessionId
      ? `${this.options.apiUrl}/messages/${sessionId}`
      : `${this.options.apiUrl}/messages`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.options.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    return response.json();
  }

  async sendMessage(message: MessageData): Promise<void> {
    const response = await fetch(`${this.options.apiUrl}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
  }
}
