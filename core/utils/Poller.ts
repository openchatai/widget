import { PubSub } from "core/utils/PubSub";

export type PollingState = {
  isPolling: boolean;
  isError: boolean;
};

export class Poller {
  state = new PubSub<PollingState>({
    isPolling: false,
    isError: false,
  });

  reset = () => {
    this.stopPolling?.();
    this.stopPolling = null;
  }

  stopPolling: (() => void) | null = null;

  startPolling = (cb: () => Promise<void>, interval: number) => {
    if (this.stopPolling) return;

    const timeouts: NodeJS.Timeout[] = [];

    const poll = async () => {
      this.state.setPartial({ isPolling: true });

      try {
        await cb();
      } catch (error) {
        console.error("Failed to poll:", error);
        this.state.setPartial({
          isError: true,
        });
      } finally {
        this.state.setPartial({ isPolling: false });
      }

      timeouts.push(setTimeout(poll, interval));
    };

    poll();

    this.stopPolling = () => {
      timeouts.forEach(clearTimeout);
      this.state.reset();
    };
  };
}
