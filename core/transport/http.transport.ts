import { Platform, DefaultPlatform } from "../platform";
import { MessageData, TransportOptions } from "../types/transport";
import { MessagingTransport } from "./transport";

interface HttpTransportOptions extends TransportOptions {
  pollingInterval: number;
}

export class HttpTransport extends MessagingTransport {
  private pollingInterval?: NodeJS.Timeout;

  constructor(
    private readonly httpOptions: HttpTransportOptions,
    private readonly platform: Platform = new DefaultPlatform(),
  ) {
    super(httpOptions);
  }

  async connect(): Promise<void> {
    this.setState({ connected: true });
    this.startPolling();
  }

  disconnect(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    this.setState({ connected: false });
  }

  async sendMessage(message: MessageData): Promise<void> {
    if (!this.isConnected()) {
      const error = new Error("Transport not connected");
      this.publish("transport:error", { error });
      throw error;
    }

    try {
      await this.httpOptions.api.sendMessage(message);
    } catch (error) {
      this.publish("transport:error", { error: error as Error });
      throw error;
    }
  }

  private startPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = setInterval(async () => {
      if (!this.isConnected()) return;

      try {
        const session =
          await this.httpOptions.sessionManager.getOrCreateSession();
        const messages = await this.httpOptions.api.getMessages(session.id);

        messages.forEach((message) => {
          this.publish("transport:message:received", message);
        });
      } catch (error) {
        this.publish("transport:error", { error: error as Error });
      }
    }, this.httpOptions.pollingInterval);
  }
}
