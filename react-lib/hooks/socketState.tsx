import { SocketState } from "./socket";

export function representSocketState(state: SocketState, getter: Function) {
  switch (state) {
    case "connected":
      return getter("connected", "🟢");
    case "connecting":
      return getter("connecting", "🟡");
    case "reconnecting":
      return getter("reconnecting", "🟡");
    case "reconnected":
      return getter("reconnected", "🟢");
    case "disconnecting":
      return getter("disconnecting", "🔴");
    case "disconnected":
      return getter("disconnected", "🔴");
    case "error":
      return getter("error", "❌");
  }
}
