import React, { useEffect, useRef, useState } from 'react';
import { Widget } from './src/designs/react';
import { HandoffComponent } from './src/designs/react/components/custom-components/Handoff.component';
// import { OpenCxComponentName } from './src/headless/core';

// const apiUrl = "http://localhost:8080";
const apiUrl = 'https://api.open.cx';
const token = import.meta.env.VITE_ORG_TOKEN;
const apiToken = import.meta.env.VITE_ORG_PUBLIC_API_TOKEN;

export function DevApp() {
  const [userToken, setUserToken] = useState('');
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetch(`${apiUrl}/widget/authenticate-user`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'ali@open.cx',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setUserToken(data.token);
    });
  }, []);

  if (!userToken) return null;

  return (
    <Widget
      components={[{ key: 'handoff', component: HandoffComponent }]}
      options={{
        apiUrl,
        token,
        initialMessages: ['Hi there, how can we help you?'],
        theme: {
          // primaryColor: '#639',
          // screens: {
          //   chat: {
          //     height: '100vh',
          //     width: '50vw',
          //   },
          // },
        },
        // collectUserData: true,
        extraDataCollectionFields: ['Order number'],
        // prefillUserData: {
        //   // name: "ali",
        //   email: "ali@open.cx",
        // },
        // user: {
        //   // externalId: "xyz",
        //   token: userToken,
        //   // data: {
        //   //   name: "ali",
        //   //   email: "ali@open.cx",
        //   // },
        // },
        bot: {
          name: 'Oppy',
          avatar:
            'https://framerusercontent.com/images/LKg2ybzxWutds9WSKpqGtaGw.jpg',
        },
        // theme: {
        //   screens: {
        //     chat: {
        //       height: '100vh',
        //       width: 'clamp(525px, 33vw, 100vw)',
        //     },
        //   },
        // },
        anchorTarget: '_blank',
        // cssOverrides: `
        //     @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        //     * {
        //       font-family: "Roboto", sans-serif;
        //     }

        //     [data-component=${OpenCxComponentName['trigger__button']}] {
        //       background-color: #E32413;
        //     }

        //     [data-component=${OpenCxComponentName['chat-screen__root']}] {
        //       background: linear-gradient(to bottom, #EAF3FE 0%, white 100%);
        //     }

        //     [data-component=${OpenCxComponentName['chat-screen__header']}] {
        //       border-bottom: none;
        //     }

        //     [data-component=${OpenCxComponentName['chat-screen__agent-or-bot-message']}] {
        //       background-color: #FFFFFF;
        //     }
        //   `,
      }}
    />
  );
}
