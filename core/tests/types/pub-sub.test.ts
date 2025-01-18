import { describe, it, expect, vi } from "vitest";
import { PubSub } from "../../types/pub-sub";

describe("PubSub", () => {
  describe("State Management", () => {
    it("should initialize with initial state", () => {
      const initialState = { count: 0 };
      const pubSub = new PubSub(initialState);
      expect(pubSub.getState()).toEqual(initialState);
    });

    it("should update state with setState", () => {
      const pubSub = new PubSub({ count: 0 });
      const newState = { count: 1 };
      pubSub.setState(newState);
      expect(pubSub.getState()).toEqual(newState);
    });

    it("should update partial state with setStatePartial", () => {
      const pubSub = new PubSub({ count: 0, text: "hello" });
      pubSub.setStatePartial({ count: 1 });
      expect(pubSub.getState()).toEqual({ count: 1, text: "hello" });
    });

    it("should handle nested state updates with setStatePartial", () => {
      const pubSub = new PubSub({
        user: { name: "John", age: 30 },
        settings: { theme: "dark" },
      });
      pubSub.setStatePartial({
        user: { name: "Jane", age: 30 },
      });
      expect(pubSub.getState()).toEqual({
        user: { name: "Jane", age: 30 },
        settings: { theme: "dark" },
      });
    });
  });

  describe("Subscriptions", () => {
    it("should notify subscribers when state changes", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber = vi.fn();
      pubSub.subscribe(subscriber);

      pubSub.setState({ count: 1 });
      expect(subscriber).toHaveBeenCalledWith({ count: 1 });
    });

    it("should notify subscribers on partial state updates", () => {
      const pubSub = new PubSub({ count: 0, text: "hello" });
      const subscriber = vi.fn();
      pubSub.subscribe(subscriber);

      pubSub.setStatePartial({ count: 1 });
      expect(subscriber).toHaveBeenCalledWith({ count: 1, text: "hello" });
    });

    it("should allow multiple subscribers", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();

      pubSub.subscribe(subscriber1);
      pubSub.subscribe(subscriber2);

      pubSub.setState({ count: 1 });
      expect(subscriber1).toHaveBeenCalledWith({ count: 1 });
      expect(subscriber2).toHaveBeenCalledWith({ count: 1 });
    });

    it("should unsubscribe correctly", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber = vi.fn();
      const unsubscribe = pubSub.subscribe(subscriber);

      unsubscribe();
      pubSub.setState({ count: 1 });
      expect(subscriber).not.toHaveBeenCalled();
    });

    it("should handle multiple subscriptions and unsubscriptions", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();
      const subscriber3 = vi.fn();

      const unsubscribe1 = pubSub.subscribe(subscriber1);
      const unsubscribe2 = pubSub.subscribe(subscriber2);
      const unsubscribe3 = pubSub.subscribe(subscriber3);

      unsubscribe2();
      pubSub.setState({ count: 1 });

      expect(subscriber1).toHaveBeenCalledWith({ count: 1 });
      expect(subscriber2).not.toHaveBeenCalled();
      expect(subscriber3).toHaveBeenCalledWith({ count: 1 });
    });
  });

  describe("Clear Functionality", () => {
    it("should clear all subscribers", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();

      pubSub.subscribe(subscriber1);
      pubSub.subscribe(subscriber2);

      pubSub.clear();
      pubSub.setState({ count: 1 });

      expect(subscriber1).not.toHaveBeenCalled();
      expect(subscriber2).not.toHaveBeenCalled();
    });

    it("should maintain state after clearing subscribers", () => {
      const pubSub = new PubSub({ count: 0 });
      pubSub.setState({ count: 1 });
      pubSub.clear();
      expect(pubSub.getState()).toEqual({ count: 1 });
    });

    it("should allow new subscriptions after clearing", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber = vi.fn();

      pubSub.clear();
      pubSub.subscribe(subscriber);
      pubSub.setState({ count: 1 });

      expect(subscriber).toHaveBeenCalledWith({ count: 1 });
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined state updates", () => {
      const pubSub = new PubSub({ count: 0 });
      pubSub.setStatePartial(undefined as any);
      expect(pubSub.getState()).toEqual({ count: 0 });
    });

    it("should handle null state updates", () => {
      const pubSub = new PubSub({ count: 0 });
      pubSub.setStatePartial(null as any);
      expect(pubSub.getState()).toEqual({ count: 0 });
    });

    it("should handle subscriber errors gracefully", () => {
      const pubSub = new PubSub({ count: 0 });
      const errorSubscriber = () => {
        throw new Error("Subscriber error");
      };
      const normalSubscriber = vi.fn();

      pubSub.subscribe(errorSubscriber);
      pubSub.subscribe(normalSubscriber);

      // This should not throw
      pubSub.setState({ count: 1 });
      expect(normalSubscriber).toHaveBeenCalledWith({ count: 1 });
    });

    it("should handle unsubscribe being called multiple times", () => {
      const pubSub = new PubSub({ count: 0 });
      const subscriber = vi.fn();
      const unsubscribe = pubSub.subscribe(subscriber);

      unsubscribe();
      unsubscribe(); // Should not throw or cause issues
      pubSub.setState({ count: 1 });
      expect(subscriber).not.toHaveBeenCalled();
    });
  });
});
