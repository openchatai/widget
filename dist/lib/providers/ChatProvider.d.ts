import { default as React } from 'react';
declare const useChat: () => import('../hooks/useAbstractChat').UseAbstractchatReturnType;
declare function ChatProvider({ children, }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export { useChat, ChatProvider };
