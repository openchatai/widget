import { describe, it, expect, vi } from "vitest";
import {
  Audio,
  isAudioAvailable,
  safeAudioOperation,
} from "../../platform/audio";

describe("Audio Utilities", () => {
  describe("isAudioAvailable", () => {
    it("should return false for undefined audio", () => {
      expect(isAudioAvailable(undefined)).toBe(false);
    });

    it("should return true for audio without isAvailable method", () => {
      const mockAudio: Audio = {
        playNotification: () => Promise.resolve(),
      };
      expect(isAudioAvailable(mockAudio)).toBe(true);
    });

    it("should return true when isAvailable returns true", () => {
      const mockAudio: Audio = {
        playNotification: () => Promise.resolve(),
        isAvailable: () => true,
      };
      expect(isAudioAvailable(mockAudio)).toBe(true);
    });

    it("should return false when isAvailable returns false", () => {
      const mockAudio: Audio = {
        playNotification: () => Promise.resolve(),
        isAvailable: () => false,
      };
      expect(isAudioAvailable(mockAudio)).toBe(false);
    });

    it("should return false when isAvailable throws", () => {
      const mockAudio: Audio = {
        playNotification: () => Promise.resolve(),
        isAvailable: () => {
          throw new Error("Test error");
        },
      };
      expect(isAudioAvailable(mockAudio)).toBe(false);
    });
  });

  describe("safeAudioOperation", () => {
    it("should handle successful operation", async () => {
      const operation = () => Promise.resolve();
      const result = await safeAudioOperation(operation, "Test operation");
      expect(result).toEqual({
        success: true,
        error: null,
      });
    });

    it("should handle operation error", async () => {
      const operation = () => Promise.reject(new Error("Operation failed"));
      const result = await safeAudioOperation(operation, "Test operation");
      expect(result).toEqual({
        success: false,
        error: {
          message: "Operation failed",
          code: "AUDIO_OPERATION_FAILED",
          context: "Test operation",
        },
      });
    });

    it("should handle non-Error exceptions", async () => {
      const operation = () => Promise.reject("String error");
      const result = await safeAudioOperation(operation, "Test operation");
      expect(result).toEqual({
        success: false,
        error: {
          message: "String error",
          code: "AUDIO_OPERATION_FAILED",
          context: "Test operation",
        },
      });
    });

    it("should handle undefined error message", async () => {
      const operation = () => Promise.reject(new Error());
      const result = await safeAudioOperation(operation, "Test operation");
      expect(result).toEqual({
        success: false,
        error: {
          message: "Unknown error",
          code: "AUDIO_OPERATION_FAILED",
          context: "Test operation",
        },
      });
    });
  });
});
