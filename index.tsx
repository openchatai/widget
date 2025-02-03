import React, { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/designs/react";

const apiUrl = "http://localhost:8080";
const token = import.meta.env.VITE_ORG_TOKEN;
const apiToken = import.meta.env.VITE_ORG_PUBLIC_API_TOKEN;

function App() {
  const [userToken, setUserToken] = useState("");
  const didFetchRef = useRef(false);
  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetch("http://localhost:8080/widget/authenticate-user", {
      method: "POST",
      body: JSON.stringify({
        email: "ali@open.cx",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setUserToken(data.token);
    });
  }, []);

  if (!userToken) return null;

  return (
    <div
      data-chat-widget
      style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
    >
      <Widget
        options={{
          apiUrl,
          token,
          initialMessages: ["Hi there, how can we help you?"],
          settings: {
            persistSession: true,
            playSoundEffects: true,
          },
          // theme: {
          //   primaryColor: "#639"
          // },
          // collectUserData: true,
          user: {
            // externalId: "xyz",
            token: userToken,
            // data: {
            //   name: "arkhameedis",
            //   email: "arkhameedis@open.cx"
            // },
            // data: {
            //   name: "ali",
            //   email: "ali@open.cx",
            // },
          },
          bot: {
            name: "Oppy",
            avatar:
              "https://framerusercontent.com/images/LKg2ybzxWutds9WSKpqGtaGw.jpg",
            id: null,
            isAi: true,
          },
        }}
      />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
