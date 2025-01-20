import { PubSub } from "src/headless/core/utils/PubSub";

export type PollingState = {
  isPolling: boolean;
  isError: boolean;
};

export class Poller {
  state = new PubSub<PollingState>({
    isPolling: false,
    isError: false,
  });
  private abortController = new AbortController();

  reset = () => {
    this.abortController.abort("Resetting poller");
    this.stopPolling?.();
    this.stopPolling = null;
  };

  stopPolling: (() => void) | null = null;

  startPolling = (
    cb: (abortSignal: AbortSignal) => Promise<void>,
    interval: number,
  ) => {
    if (this.stopPolling) return;

    const timeouts: NodeJS.Timeout[] = [];

    const poll = async () => {
      this.abortController = new AbortController();
      this.state.setPartial({ isPolling: true });

      try {
        await cb(this.abortController.signal);
      } catch (error) {
        if (this.abortController.signal.aborted) {
          // If aborted, just return and do not schedule the nest poll
          return;
        } else {
          console.error("Failed to poll:", error);
          this.state.setPartial({ isError: true });
        }  
      } finally {
        this.state.setPartial({ isPolling: false });
      }

      // Another check to stop scheduling polls in case someone removes the early return in the catch above
      if (this.abortController.signal.aborted) {
        console.log("Poller aborted, not scheduling anymore");
      } else {
        timeouts.push(setTimeout(poll, interval));
      }
    };

    poll();

    this.stopPolling = () => {
      timeouts.forEach(clearTimeout);
      this.state.reset();
    };
  };
}
