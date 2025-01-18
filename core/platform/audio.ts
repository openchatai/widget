/**
 * Platform-agnostic audio interface that can be implemented
 * for different environments (web, mobile, desktop, etc.)
 */
export interface Audio {
  /**
   * Plays a notification sound
   * @returns Promise that resolves when the sound finishes playing or rejects on error
   */
  playNotification(): Promise<void>;

  /**
   * Checks if audio playback is available and working
   * @returns true if audio is available and working
   */
  isAvailable?(): boolean;
}

/**
 * Helper function to check if audio is available and working
 */
export function isAudioAvailable(audio: Audio | undefined): audio is Audio {
  if (!audio) return false;
  try {
    return typeof audio.isAvailable === "function" ? audio.isAvailable() : true; // If isAvailable is not implemented, assume audio is available
  } catch {
    return false;
  }
}

/**
 * Type for the result of a safe audio operation
 */
export type AudioOperationResult =
  | { success: true; error: null }
  | {
      success: false;
      error: { message: string; code: string; context: string };
    };

/**
 * Helper function to safely perform audio operations
 */
export async function safeAudioOperation(
  operation: () => Promise<void>,
  errorContext: string,
): Promise<AudioOperationResult> {
  try {
    await operation();
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message || "Unknown error"
            : error?.toString() || "Unknown error",
        code: "AUDIO_OPERATION_FAILED",
        context: errorContext,
      },
    };
  }
}
