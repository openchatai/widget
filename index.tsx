import React, { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/designs/react";
import { HandoffComponent } from "./src/designs/react/components/custom-components/Handoff.component";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.open.cx";
const token = import.meta.env.VITE_ORG_TOKEN;
const apiToken = import.meta.env.VITE_ORG_PUBLIC_API_TOKEN;

function App() {
  const [userToken, setUserToken] = useState("");
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetch(`${apiUrl}/widget/authenticate-user`, {
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
      data-opencx-widget
      style={{ width: "100vw", height: "100vh", backgroundColor: "beige" }}
    >
      <Widget
        components={[{ key: "handoff", component: HandoffComponent }]}
        options={{
          apiUrl,
          token,
          initialMessages: ["Hi there, how can we help you?"],
          // theme: {
          //   primaryColor: "#639"
          // },
          // collectUserData: true,
          // extraDataCollectionFields: ["Order number"],
          // prefillUserData: {
          //   // name: "ali",
          //   email: "ali@open.cx",
          // },
          user: {
            // externalId: "xyz",
            token: userToken,
            // data: {
            //   name: "ali",
            //   email: "ali@open.cx",
            // },
          },
          bot: {
            name: "Oppy",
            avatar:
              "https://framerusercontent.com/images/LKg2ybzxWutds9WSKpqGtaGw.jpg",
          },
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No root element found");
}
createRoot(rootElement).render(<App />);
