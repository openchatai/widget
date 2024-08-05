import { initOpenScript } from "./index";

const socketUrl = "http://localhost:8080";
const apiUrl = "http://localhost:8080/backend";
initOpenScript({
  token: "b6faec7038aca8b8f5e33488aac73f3e",
  apiUrl: apiUrl,
  socketUrl: socketUrl,
  initialMessage: ["Hey man!", "How can we help you?"],
  user: {
    avatarUrl: "https://i.pravatar.cc/300",
    name: "John Doe",
  },
  debug: true,
  organizationName: "Demo inc.",
});
