"use strict";"use client";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const C=require("react/jsx-runtime"),e=require("./ChatProvider-4ABtW4jm.cjs"),a=require("react");function f(){const t=a.useRef(!0);return a.useEffect(()=>()=>{t.current=!1},[]),()=>t.current}function p(t,o=[],n={loading:!1}){const r=a.useRef(0),u=f(),[i,c]=a.useState(n),g=a.useCallback((...d)=>{const l=++r.current;return i.loading||c(s=>({...s,loading:!0})),t(...d).then(s=>(u()&&l===r.current&&c({value:s,loading:!1}),s),s=>(u()&&l===r.current&&c({error:s,loading:!1}),s))},o);return[i,g]}const h=t=>[(n,r)=>{if(t.current){const{scrollWidth:u,scrollHeight:i}=t.current,c=u-t.current.clientWidth,g=i-t.current.clientHeight,d=n/100*c,l=r/100*g;t.current.scrollTo(d,l)}}];function y(t,o){const{axiosInstance:n}=e.useChat();return p(async()=>n.post(`/chat/vote/${t}`),[n,t,o])}function S(t,o){const{axiosInstance:n}=e.useChat();return p(async()=>n.delete(`/chat/vote/${t}`),[n,t,o])}function v({children:t,options:o}){return C.jsx(e.ConfigDataProvider,{data:o,children:C.jsx(e.LocaleProvider,{children:C.jsx(e.ChatProvider,{children:t})})})}exports.BotLoadingComponent=e.BotLoadingComponent;exports.BotMessage=e.BotMessage;exports.BotResponseWrapper=e.BotResponseWrapper;exports.BotTextResponse=e.BotTextResponse;exports.ChatEventComponent=e.ChatEventComponent;exports.ComponentRegistry=e.ComponentRegistry;exports.FallbackComponent=e.FallbackComponent;exports.MessageTypeEnum=e.MessageTypeEnum;exports.createSession=e.createSession;exports.getChatSessionById=e.getChatSessionById;exports.getInitData=e.getInitData;exports.getOfficeHours=e.getOfficeHours;exports.useAxiosInstance=e.useAxiosInstance;exports.useChat=e.useChat;exports.useConfigData=e.useConfigData;exports.useLang=e.useLocale;exports.useSyncedState=e.useSyncedState;exports.workingDays=e.workingDays;exports.WidgetRoot=v;exports.useAsyncFn=p;exports.useDownvote=S;exports.useScrollToPercentage=h;exports.useUpvote=y;
