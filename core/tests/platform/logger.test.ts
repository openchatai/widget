import { describe, it, expect, vi, beforeEach } from "vitest";
import { createLogger, LoggerOptions } from "../../platform/logger";

describe("Logger", () => {
  let consoleSpy: {
    debug: ReturnType<typeof vi.spyOn>;
    info: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      debug: vi.spyOn(console, "debug").mockImplementation(vi.fn()),
      info: vi.spyOn(console, "info").mockImplementation(vi.fn()),
      warn: vi.spyOn(console, "warn").mockImplementation(vi.fn()),
      error: vi.spyOn(console, "error").mockImplementation(vi.fn()),
    };
  });

  describe("Log Levels", () => {
    it("should log debug messages when level is debug", () => {
      const logger = createLogger({ level: "debug" });
      logger.debug("Debug message");
      expect(consoleSpy.debug).toHaveBeenCalledWith("[openCx] Debug message");
    });

    it("should log info messages when level is info", () => {
      const logger = createLogger({ level: "info" });
      logger.info("Info message");
      expect(consoleSpy.info).toHaveBeenCalledWith("[openCx] Info message");
    });

    it("should log warning messages when level is warn", () => {
      const logger = createLogger({ level: "warn" });
      logger.warn("Warning message");
      expect(consoleSpy.warn).toHaveBeenCalledWith("[openCx] Warning message");
    });

    it("should log error messages when level is error", () => {
      const logger = createLogger({ level: "error" });
      logger.error("Error message");
      expect(consoleSpy.error).toHaveBeenCalledWith("[openCx] Error message");
    });
  });

  describe("Log Level Filtering", () => {
    it("should not log debug messages when level is info", () => {
      const logger = createLogger({ level: "info" });
      logger.debug("Debug message");
      expect(consoleSpy.debug).not.toHaveBeenCalled();
    });

    it("should not log info messages when level is warn", () => {
      const logger = createLogger({ level: "warn" });
      logger.info("Info message");
      expect(consoleSpy.info).not.toHaveBeenCalled();
    });

    it("should not log warning messages when level is error", () => {
      const logger = createLogger({ level: "error" });
      logger.warn("Warning message");
      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it("should log error messages regardless of level", () => {
      const logger = createLogger({ level: "debug" });
      logger.error("Error message");
      expect(consoleSpy.error).toHaveBeenCalledWith("[openCx] Error message");
    });
  });

  describe("setLevel", () => {
    it("should update logging level", () => {
      const logger = createLogger({ level: "error" });
      logger.debug("Debug message");
      expect(consoleSpy.debug).not.toHaveBeenCalled();

      logger.setLevel("debug");
      logger.debug("Debug message");
      expect(consoleSpy.debug).toHaveBeenCalledWith("[openCx] Debug message");
    });
  });

  describe("Additional Parameters", () => {
    it("should log additional parameters for debug", () => {
      const logger = createLogger({ level: "debug" });
      logger.debug("Debug message", { key: "value" });
      expect(consoleSpy.debug).toHaveBeenCalledWith(
        "[openCx] Debug message",
        '{\n  "key": "value"\n}',
      );
    });

    it("should log additional parameters for info", () => {
      const logger = createLogger({ level: "info" });
      logger.info("Info message", { key: "value" });
      expect(consoleSpy.info).toHaveBeenCalledWith(
        "[openCx] Info message",
        '{\n  "key": "value"\n}',
      );
    });

    it("should log additional parameters for warn", () => {
      const logger = createLogger({ level: "warn" });
      logger.warn("Warning message", { key: "value" });
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        "[openCx] Warning message",
        '{\n  "key": "value"\n}',
      );
    });

    it("should log additional parameters for error", () => {
      const logger = createLogger({ level: "error" });
      logger.error("Error message", { key: "value" });
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "[openCx] Error message",
        '{\n  "key": "value"\n}',
      );
    });

    it("should handle multiple additional parameters", () => {
      const logger = createLogger({ level: "debug" });
      logger.debug("Message", { key1: "value1" }, { key2: "value2" });
      expect(consoleSpy.debug).toHaveBeenCalledWith(
        "[openCx] Message",
        '{\n  "key1": "value1"\n}',
        '{\n  "key2": "value2"\n}',
      );
    });

    it("should handle Error objects in parameters", () => {
      const logger = createLogger({ level: "error" });
      const error = new Error("Test error");
      logger.error("Error occurred", error);
      expect(consoleSpy.error).toHaveBeenCalledWith("[openCx] Error occurred", {
        name: "Error",
        message: "Test error",
        stack: error.stack,
      });
    });
  });

  describe("Logger Configuration", () => {
    it("should use custom prefix", () => {
      const logger = createLogger({ level: "info", prefix: "[TEST]" });
      logger.info("Test message");
      expect(consoleSpy.info).toHaveBeenCalledWith("[TEST] Test message");
    });

    it("should respect enabled flag", () => {
      const logger = createLogger({ level: "debug", enabled: false });
      logger.debug("Debug message");
      logger.info("Info message");
      logger.warn("Warning message");
      logger.error("Error message");

      expect(consoleSpy.debug).not.toHaveBeenCalled();
      expect(consoleSpy.info).not.toHaveBeenCalled();
      expect(consoleSpy.warn).not.toHaveBeenCalled();
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });
  });
});
