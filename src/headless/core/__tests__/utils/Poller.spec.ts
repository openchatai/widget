import { Poller } from "../../utils/Poller";

suite(Poller.name, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fire the callback instantly the first time", async () => {
    const poller = new Poller();
    const cb = vi.fn();
    poller.startPolling(cb, 1000);

    expect(cb).toHaveBeenCalledOnce();

    poller.reset();
  });

  it("should poll and respect the interval", async () => {
    const INTERVAL = 1000;
    const poller = new Poller();
    const cb = vi.fn();
    poller.startPolling(cb, INTERVAL);

    // vi.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb).toHaveBeenCalledTimes(3);

    poller.reset();
  });

  it("should stop polling if reset", async () => {
    const INTERVAL = 1000;
    const poller = new Poller();
    const cb = vi.fn();
    poller.startPolling(cb, INTERVAL);

    expect(cb).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb).toHaveBeenCalledTimes(2);

    // Stop polling
    poller.reset();
    // Make sure the callback is not called after the reset
    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb).toHaveBeenCalledTimes(2);

    // Start polling again with a new callback
    const cb2 = vi.fn();
    poller.startPolling(cb2, INTERVAL);
    expect(cb2).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(INTERVAL);
    expect(cb2).toHaveBeenCalledTimes(2);

    // Expect the first callback to not have been called after the second `startPolling`
    expect(cb).toHaveBeenCalledTimes(2);

    poller.reset();
  });
});
