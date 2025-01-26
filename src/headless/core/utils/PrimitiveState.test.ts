import { describe, it, expect, vi } from "vitest";
import { PrimitiveState } from "./PrimitiveState";

describe("PrimitiveState", () => {
  describe("State Management", () => {
    it("should initialize with initial state", () => {
      const initialState = { count: 0 };
      const state = new PrimitiveState(initialState);
      expect(state.get()).toEqual(initialState);
    });

    it("should update state with setState", () => {
      const state = new PrimitiveState({ count: 0 });
      const newState = { count: 1 };
      state.set(newState);
      expect(state.get()).toEqual(newState);
    });

    it("should update partial state with setStatePartial", () => {
      const state = new PrimitiveState({ count: 0, text: "hello" });
      state.setPartial({ count: 1 });
      expect(state.get()).toEqual({ count: 1, text: "hello" });
    });

    it("should handle nested state updates with setStatePartial", () => {
      const state = new PrimitiveState({
        user: { name: "John", age: 30 },
        settings: { theme: "dark" },
      });
      state.setPartial({
        user: { name: "Jane", age: 30 },
      });
      expect(state.get()).toEqual({
        user: { name: "Jane", age: 30 },
        settings: { theme: "dark" },
      });
    });
  });

  describe("Subscriptions", () => {
    it("should notify subscribers when state changes", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber = vi.fn();
      state.subscribe(subscriber);

      state.set({ count: 1 });
      expect(subscriber).toHaveBeenCalledWith({ count: 1 });
    });

    it("should notify subscribers on partial state updates", () => {
      const state = new PrimitiveState({ count: 0, text: "hello" });
      const subscriber = vi.fn();
      state.subscribe(subscriber);

      state.setPartial({ count: 1 });
      expect(subscriber).toHaveBeenCalledWith({ count: 1, text: "hello" });
    });

    it("should allow multiple subscribers", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();

      state.subscribe(subscriber1);
      state.subscribe(subscriber2);

      state.set({ count: 1 });
      expect(subscriber1).toHaveBeenCalledWith({ count: 1 });
      expect(subscriber2).toHaveBeenCalledWith({ count: 1 });
    });

    it("should unsubscribe correctly", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber = vi.fn();
      const unsubscribe = state.subscribe(subscriber);

      unsubscribe();
      state.set({ count: 1 });
      expect(subscriber).not.toHaveBeenCalled();
    });

    it("should handle multiple subscriptions and unsubscriptions", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();
      const subscriber3 = vi.fn();

      const unsubscribe1 = state.subscribe(subscriber1);
      const unsubscribe2 = state.subscribe(subscriber2);
      const unsubscribe3 = state.subscribe(subscriber3);

      unsubscribe2();
      state.set({ count: 1 });

      expect(subscriber1).toHaveBeenCalledWith({ count: 1 });
      expect(subscriber2).not.toHaveBeenCalled();
      expect(subscriber3).toHaveBeenCalledWith({ count: 1 });
    });
  });

  describe("Clear Functionality", () => {
    it("should clear all subscribers", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();

      state.subscribe(subscriber1);
      state.subscribe(subscriber2);

      state.clear();
      state.set({ count: 1 });

      expect(subscriber1).not.toHaveBeenCalled();
      expect(subscriber2).not.toHaveBeenCalled();
    });

    it("should maintain state after clearing subscribers", () => {
      const state = new PrimitiveState({ count: 0 });
      state.set({ count: 1 });
      state.clear();
      expect(state.get()).toEqual({ count: 1 });
    });

    it("should allow new subscriptions after clearing", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber = vi.fn();

      state.clear();
      state.subscribe(subscriber);
      state.set({ count: 1 });

      expect(subscriber).toHaveBeenCalledWith({ count: 1 });
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined state updates", () => {
      const state = new PrimitiveState({ count: 0 });
      state.setPartial(undefined as any);
      expect(state.get()).toEqual({ count: 0 });
    });

    it("should handle null state updates", () => {
      const state = new PrimitiveState({ count: 0 });
      state.setPartial(null as any);
      expect(state.get()).toEqual({ count: 0 });
    });

    it("should handle subscriber errors gracefully", () => {
      const state = new PrimitiveState({ count: 0 });
      const errorSubscriber = () => {
        throw new Error("Subscriber error");
      };
      const normalSubscriber = vi.fn();

      state.subscribe(errorSubscriber);
      state.subscribe(normalSubscriber);

      // This should not throw
      state.set({ count: 1 });
      expect(normalSubscriber).toHaveBeenCalledWith({ count: 1 });
    });

    it("should handle unsubscribe being called multiple times", () => {
      const state = new PrimitiveState({ count: 0 });
      const subscriber = vi.fn();
      const unsubscribe = state.subscribe(subscriber);

      unsubscribe();
      unsubscribe(); // Should not throw or cause issues
      state.set({ count: 1 });
      expect(subscriber).not.toHaveBeenCalled();
    });
  });
});
