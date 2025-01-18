import {
  createChat,
  createConfig,
  ApiCaller,
  type MessageType,
  type BotMessageType,
  type CoreOptions,
  Platform,
} from "@core/index";
import { createLogger } from "@core/platform/logger";
import "./index.css";
// DOM Elements
const chatWidget = document.getElementById("chatWidget") as HTMLDivElement;
const toggleChat = document.getElementById("toggleChat") as HTMLButtonElement;
const messageInput = document.getElementById(
  "messageInput",
) as HTMLInputElement;
const sendMessage = document.getElementById("sendMessage") as HTMLButtonElement;
const chatMessages = document.getElementById("chatMessages") as HTMLDivElement;
const errorToast = document.getElementById("errorToast") as HTMLDivElement;
const errorToastMessage = errorToast.querySelector(
  ".error-toast-message",
) as HTMLDivElement;
const errorToastClose = errorToast.querySelector(
  ".error-toast-close",
) as HTMLButtonElement;
const connectionStatus = document.getElementById(
  "connectionStatus",
) as HTMLDivElement;
const connectionStatusText = connectionStatus.querySelector(
  ".connection-status-text",
) as HTMLSpanElement;
const connectionRetryButton = connectionStatus.querySelector(
  ".connection-retry-button",
) as HTMLButtonElement;
const chatError = document.getElementById("chatError") as HTMLDivElement;
const chatErrorMessage = chatError.querySelector(
  ".chat-error-message",
) as HTMLDivElement;
const chatErrorRetry = chatError.querySelector(
  ".chat-error-retry",
) as HTMLButtonElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;
const initialQuestions = document.getElementById(
  "initialQuestions",
) as HTMLDivElement;
const orgName = document.getElementById("orgName") as HTMLSpanElement;
const orgTagline = document.getElementById("orgTagline") as HTMLSpanElement;
const orgLogo = document.getElementById("orgLogo") as HTMLDivElement;
const welcomeMessage = document.getElementById(
  "welcomeMessage",
) as HTMLParagraphElement;

const apiUrl = "http://localhost:8080";

// Error handling utilities
function showErrorToast(message: string, duration = 5000) {
  errorToastMessage.textContent = message;
  errorToast.classList.remove("hidden", "animate__slideOutRight");
  errorToast.classList.add("animate__slideInRight");

  const timeout = setTimeout(() => {
    hideErrorToast();
  }, duration);

  return () => {
    clearTimeout(timeout);
    hideErrorToast();
  };
}

function hideErrorToast() {
  errorToast.classList.remove("animate__slideInRight");
  errorToast.classList.add("animate__slideOutRight");
  setTimeout(() => {
    errorToast.classList.add("hidden");
  }, 300);
}

function showConnectionError(message: string, canRetry = true) {
  connectionStatusText.textContent = message;
  connectionStatus.classList.remove("hidden");
  connectionRetryButton.classList.toggle("hidden", !canRetry);
}

function hideConnectionError() {
  connectionStatus.classList.add("hidden");
}

function showChatError(message: string) {
  chatErrorMessage.textContent = message;
  chatError.classList.remove("hidden");
  chatMessages.classList.add("hidden");
}

function hideChatError() {
  chatError.classList.add("hidden");
  chatMessages.classList.remove("hidden");
}

// Initialize chat
const configOptions: CoreOptions = {
  token: "6cb3b1b746e45441b4d2a874dd60d44a", // Replace with your bot token
  apiUrl,
  user: {
    email: "test@test.com",
    name: "Test User",
  },
};
const platform: Platform = {
  env: {
    platform: "web",
  },
  storage: {
    getItem: async (key: string) => {
      return localStorage.getItem(key);
    },
    setItem: async (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    removeItem: async (key: string) => {
      localStorage.removeItem(key);
    },
  },
  logger: createLogger({
    level: "debug",
    prefix: "[OpenChat]",
    enabled: true,
  }),
};

const config = createConfig(configOptions, platform);

const api = new ApiCaller({
  config: config.getConfig(),
});

const chat = createChat({
  api,
  config,
  platform,
});
// Fetch and render prelude data
async function initializeWidget() {
  try {
    const prelude = await api.widgetPrelude();

    // Update organization info
    document.title = `Chat with ${prelude.organizationName}`;
    orgName.textContent = prelude.organizationName;

    // Hide tagline and logo since they're not in the schema
    orgTagline.classList.add("hidden");
    orgLogo.innerHTML = "🤖"; // Default icon

    // Set default welcome message
    welcomeMessage.textContent =
      "Start a conversation with our AI assistant. We're here to help!";

    // Render initial questions
    if (prelude.initialQuestions && prelude.initialQuestions.length > 0) {
      initialQuestions.innerHTML = prelude.initialQuestions
        .map(
          (question: string) => `
                    <button class="suggestion-chip animate__animated animate__fadeIn" data-message="${question}">
                        ${question}
                    </button>
                `,
        )
        .join("");

      // Attach event listeners to new suggestion chips
      const newSuggestionChips =
        initialQuestions.querySelectorAll(".suggestion-chip");
      newSuggestionChips.forEach((chip, index) => {
        setTimeout(() => {
          chip.classList.add("animate__fadeInUp");
        }, index * 100); // Stagger the animations

        chip.addEventListener("click", () => {
          const message = chip.getAttribute("data-message");
          if (message) {
            messageInput.value = message;
            handleSendMessage();
          }
        });
      });
    }
  } catch (error) {
    console.error("Failed to fetch widget prelude:", error);
    showErrorToast("Failed to initialize chat widget");
  }
}

chat.chatState.subscribe((state) => {
  // Handle error states first
  if (state.error.hasError) {
    const errorMessage = state.error.message || "An unexpected error occurred";
    switch (state.error.code) {
      case "SESSION_CREATION_FAILED":
      case "NO_ACTIVE_SESSION":
        showConnectionError(
          "Failed to connect to chat service. Please try again.",
        );
        break;
      case "MESSAGE_SEND_FAILED":
        showErrorToast("Failed to send message: " + errorMessage);
        break;
      default:
        showErrorToast(errorMessage);
    }
    return;
  } else {
    hideConnectionError();
    hideChatError();
  }

  // Update messages container
  chatMessages.innerHTML = "";
  state.messages.forEach((message: MessageType) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add(
      "message",
      "animate__animated",
      "animate__fadeIn",
    );

    if (message.type === "FROM_USER") {
      messageElement.classList.add("user");
      messageElement.textContent = message.content;
    } else if (message.type === "FROM_BOT") {
      messageElement.classList.add("bot");
      const botMessage = message as BotMessageType<{ text: string }>;
      messageElement.textContent = botMessage.data.text;
    }

    chatMessages.appendChild(messageElement);
  });

  // Scroll to bottom if new messages were added
  if (state.messages.length > 0) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Toggle empty state visibility
  emptyState.classList.toggle("hidden", state.messages.length > 0);

  // Handle loading state
  if (state.loading.isLoading) {
    sendMessage.disabled = true;
    sendMessage.innerHTML = '<span class="loading-dots">Sending</span>';
    messageInput.disabled = true;
  } else {
    sendMessage.disabled = false;
    sendMessage.textContent = "Send";
    messageInput.disabled = false;
  }
});

// Event Listeners
errorToastClose.addEventListener("click", hideErrorToast);

connectionRetryButton.addEventListener("click", async () => {
  try {
    hideConnectionError();
  } catch {
    showConnectionError("Failed to reconnect. Please try again later.");
  }
});

chatErrorRetry.addEventListener("click", async () => {
  try {
    hideChatError();
    await handleSendMessage();
  } catch {
    showChatError("Still having trouble. Please try again later.");
  }
});

// Initialize widget when chat is opened for the first time
let isInitialized = false;
toggleChat.addEventListener("click", async () => {
  chatWidget.classList.toggle("hidden");
  if (!chatWidget.classList.contains("hidden")) {
    messageInput.focus();
    if (!isInitialized) {
      await initializeWidget();
      isInitialized = true;
    }
  }
});

async function handleSendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  try {
    const success = await chat.sendMessage({
      content: text,
    });

    if (success) {
      messageInput.value = "";
      messageInput.focus();
    } else {
      showErrorToast("Message could not be sent. Please try again.");
    }
  } catch (error) {
    console.error("Failed to send message:", error);
    showChatError("Unable to send message. Please try again.");
  }
}

sendMessage.addEventListener("click", handleSendMessage);

messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
  }
});
