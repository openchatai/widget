import { SocketState } from "./socket";

export function representSocketState(state: SocketState) {
  switch (state) {
    case "connected":
      return "🟢 Connected";
    case "connecting":
      return "🟡 Connecting";
    case "reconnecting":
      return "🟡 Reconnecting";
    case "reconnected":
      return "🟢 Reconnected";
    case "disconnecting":
      return "🔴 Disconnecting";
    case "disconnected":
      return "🔴 Disconnected";
    case "error":
      return "❌ Error";
  }
}
