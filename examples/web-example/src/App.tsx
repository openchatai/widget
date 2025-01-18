import React, { useState, useRef } from "react";
import { BotMessageType } from "../../../core";
import usePubsub from "./usePubsub";
import { ChatProvider, useChat } from "./ChatContext";
import "./App.css";

function ChatWidget() {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chat, prelude, isLoading } = useChat();

  const chatState = usePubsub(chat.chatState);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !chat) return;

    try {
      const success = await chat.sendMessage({
        content: messageInput,
      });

      if (success) {
        setMessageInput("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    setMessageInput(question);
  };

  if (isLoading) {
    return (
      <div className="chat-widget">
        <div className="chat-header">
          <div className="chat-header-icon">🤖</div>
          <div className="chat-header-content">
            <span className="chat-header-title">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-header-icon">🤖</div>
        <div className="chat-header-content">
          <span className="chat-header-title">
            {prelude?.organizationName || "Chat Assistant"}
          </span>
        </div>
      </div>

      <div className="chat-messages" ref={messagesEndRef}>
        {!chatState?.messages.length && prelude?.initialQuestions && (
          <div className="initial-questions">
            <div className="welcome-message">
              Welcome! Here are some questions you can ask:
            </div>
            <div className="questions-list">
              {prelude.initialQuestions.map((question, index) => (
                <button
                  key={index}
                  className="question-chip"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatState?.messages.map((message) => (
          <div
            key={message.id}
            className={`message animate__animated animate__fadeIn ${
              message.type === "FROM_USER" ? "user" : "bot"
            }`}
          >
            {message.type === "FROM_USER"
              ? message.content
              : (message as BotMessageType<{ message: string }>).data.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          aria-label="Message input"
          disabled={chatState?.loading.isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={chatState?.loading.isLoading}
        >
          {chatState?.loading.isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && !isInitialized) {
      setIsInitialized(true);
    }
  };

  return (
    <ChatProvider>
      <div className="app">
        <h1 className="app-title">OpenChat Widget</h1>
        <p className="app-description">
          Experience our modern chat interface. Click the chat button in the
          bottom right corner to start a conversation!
        </p>

        <button
          className="toggle-chat"
          onClick={toggleChat}
          aria-label="Toggle chat"
        >
          💬
        </button>

        {isChatOpen && <ChatWidget />}
      </div>
    </ChatProvider>
  );
}

export default App;
