import { initOpenScript } from "./index";

const socketUrl = "http://localhost:8080";
const apiUrl = "http://localhost:8080/backend";
initOpenScript({
  token: "aa9793f3a20c6bb95414577cd91933c3",
  apiUrl: apiUrl,
  socketUrl: socketUrl,
  initialMessage: ["Hey man!", "How can we help you?"],
  user: {
    avatarUrl: "https://i.pravatar.cc/300",
    name: "John Doe",
  },
  organizationName: "Demo inc.",
});
