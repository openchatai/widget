"use strict";"use client";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),M=require("@radix-ui/react-popover"),x=require("lucide-react"),l=require("react"),i=require("./ChatProvider-4ABtW4jm.cjs"),N=require("framer-motion"),D=require("@radix-ui/react-switch"),B=require("@radix-ui/react-tooltip");function C(n){const s=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(n){for(const t in n)if(t!=="default"){const a=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(s,t,a.get?a:{enumerable:!0,get:()=>n[t]})}}return s.default=n,Object.freeze(s)}const S=C(M),I=C(l),R=C(D),_=C(B),[z,q]=i.createSafeContext(),H=()=>{};function j({defaultOpen:n,onOpenChange:s,open:t,children:a,isAlert:o}){const[r,d]=l.useState(n),f=t??r??!1,m=s??d;return e.jsx(q,{value:{open:f,setOpen:m,onOpenChange:s??H,isAlert:o||!1},children:typeof a=="function"?a({open:f,setOpen:m}):a})}const b=l.forwardRef((n,s)=>{const{setOpen:t,open:a}=z();return e.jsx("button",{...n,"data-open":a,onClick:()=>t(!0),ref:s})}),W=l.forwardRef((n,s)=>e.jsx(N.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{delay:.1}},transition:{duration:.2},className:"absolute inset-0 z-[24] from-gray-100/30 to-gray-50/30 bg-gradient-to-t backdrop-blur-sm",...n,ref:s}));function A(...n){return s=>{n.forEach(t=>{typeof t=="function"?t(s):t&&(t.current=s)})}}const y=l.forwardRef(({children:n,...s},t)=>{const{open:a,setOpen:o,isAlert:r}=z(),d=l.useRef(null),f=l.useRef(null),m=A(t,d);return l.useEffect(()=>{if(!a||r)return;const u=p=>{p.key==="Escape"&&o(!1)};return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}},[a,o]),l.useEffect(()=>{var u;a&&((u=d.current)==null||u.focus())},[a]),e.jsx(N.AnimatePresence,{children:a&&e.jsxs(e.Fragment,{children:[e.jsx(N.motion.div,{"data-alert":r,initial:{opacity:0,y:20,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:20,x:"-50%"},transition:{type:"spring",damping:20,stiffness:300},className:"bg-white rounded-xl grid grid-cols-1 gap-2 border max-w-[90%] bottom-2 w-full absolute left-1/2 p-3 z-[25]",ref:m,...s,children:n}),e.jsx(W,{onClick:u=>{r||u.target===f.current&&o(!1)},ref:f})]})})}),v=l.forwardRef((n,s)=>{const{setOpen:t,open:a}=z();return e.jsx("button",{...n,"data-open":a,onClick:()=>{t(!1)},ref:s})});function X({options:n,onKeyboardClick:s}){return e.jsx("div",{className:"flex items-center gap-2 p-1.5",children:n.map((t,a)=>e.jsx("button",{onClick:()=>s(t),className:"hover:shadow font-semibold transition-all hover:border-secondary border-transparent border text-white bg-primary rounded-md p-1.5 text-sm w-full",children:t},a))})}function L({children:n,user:s}){return e.jsxs("div",{className:"flex flex-row w-full gap-1 justify-end items-end",children:[e.jsx("div",{className:"w-fit min-w-[50%]",children:e.jsx("div",{className:"bg-primary p-2.5 min-w-fit text-white rounded-lg leading-snug font-medium text-sm",style:{background:"#1883FF",boxShadow:"0px 8px 12px rgba(0, 0, 0, 0.04)"},children:n})}),e.jsx(i.Avatar,{className:"size-7",children:e.jsx(i.AvatarImage,{src:s==null?void 0:s.avatarUrl})})]})}const w=I.forwardRef(({className:n,...s},t)=>e.jsx(R.Root,{className:i.cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary",n),...s,ref:t,children:e.jsx(R.Thumb,{className:i.cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform","data-[state=checked]:translate-x-[calc(100%_-_0.07rem)]","data-[state=unchecked]:translate-x-[0.07rem]","rtl:data-[state=checked]:translate-x-[calc(-100%_+_0.07rem)]","rtl:data-[state=unchecked]:translate-x-[-0.07rem]")})}));w.displayName=R.Root.displayName;const K=_.Provider,U=I.forwardRef(({className:n,sideOffset:s=4,...t},a)=>e.jsx(_.Content,{ref:a,sideOffset:s,className:i.cn("z-50 overflow-hidden rounded-lg bg-foreground text-background p-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",n),...t}));U.displayName=_.Content.displayName;const P="https://cloud.opencopilot.so/widget/hero-image.png";function Y(){const[n,s]=l.useState(""),t=l.useRef(null),{sendMessage:a,info:o,hookState:r,isSessionClosed:d}=i.useChat(),f=l.useId(),m=i.useLocale(),u=h=>{const k=h.currentTarget.value;s(k)};async function p(){n.trim().length!==0&&(a({content:{text:n}}),s(""))}return e.jsxs("div",{className:"p-2 rounded-lg relative",children:[e.jsx("div",{className:"relative w-full top-0 overflow-hidden h-5 px-1",children:e.jsx(N.AnimatePresence,{children:o&&e.jsx(N.motion.div,{className:"absolute w-full text-xs text-accent/60",layoutId:f,animate:{opacity:1,translateY:0},exit:{opacity:0,translateY:"-100%"},initial:{opacity:0,translateY:"-100%"},transition:{duration:.2,ease:"easeInOut"},style:{top:0},children:o},o.toString())})}),e.jsxs("div",{className:"flex rounded-lg items-center gap-2 bg-white border px-2 py-1.5",style:{border:"1px solid rgba(19, 34, 68, 0.08)",boxShadow:"0px 8px 20px rgba(0, 0, 0, 0.04)"},children:[e.jsx("input",{ref:t,disabled:r==="loading"||d,value:n,className:"flex-1 outline-none p-1 text-accent text-sm bg-transparent !placeholder-text-sm placeholder-font-100 placeholder:text-primary-foreground/50",onChange:u,autoFocus:!0,onKeyDown:async h=>{h.key==="Enter"&&!h.shiftKey&&(h.preventDefault(),await p())},placeholder:m.get("write-a-message")}),e.jsx("div",{children:e.jsx("button",{onClick:p,disabled:r==="loading",className:"rounded-lg border p-[7px] text-white bg-primary shrink-0 disabled:opacity-50",style:{background:"#1883FF"},children:r==="loading"?e.jsx(x.CircleDashed,{className:"size-3.5 animate-spin animate-iteration-infinite"}):e.jsx(x.SendHorizonal,{className:"size-3.5 rtl:-scale-100"})})})]})]})}function V(){var O,T;const{initialData:n,state:s,sendMessage:t,noMessages:a,hookState:o,handleKeyboard:r}=i.useChat(),d=i.useConfigData(),f=l.useRef(null),m=o==="loading";function u(){setTimeout(()=>{const c=f.current;c&&(c.scrollTop=c.scrollHeight)},0)}l.useEffect(()=>{u()},[s.messages]);const p=l.useMemo(()=>new i.ComponentRegistry({components:d.components}),[d]),h=p.getComponent("loading",d.debug),k=p.getComponent("text",d.debug);return e.jsx(K,{children:e.jsx("div",{className:"size-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0",children:e.jsxs("div",{className:"w-full mesh-gradient rounded-xl h-full justify-between rounded-t-xl flex flex-col relative",style:{background:"linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)"},children:[a?e.jsx(G,{}):e.jsx($,{}),e.jsxs("div",{className:"flex flex-col w-full flex-1 bg-background rounded-t-xl shadow overflow-auto",style:{background:"#FAFBFB",boxShadow:"0px -8px 20px rgba(0, 0, 0, 0.12)",borderRadius:" 16px 16px 0px 0px"},children:[e.jsxs("div",{"data-messages":!0,ref:f,className:"max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto",children:[((O=d.initialMessages)==null?void 0:O.map((c,g)=>e.jsx(i.BotResponseWrapper,{bot:d.bot,children:e.jsx(k,{component:"TEXT",data:{message:c},id:`${g}`,type:"FROM_BOT",serverId:null})},g)))??e.jsx(i.BotResponseWrapper,{bot:d.bot,children:e.jsx(k,{component:"TEXT",data:{message:"Hello, how can I help?"},id:"123",type:"FROM_BOT",serverId:null})}),s.messages.map((c,g)=>c.type==="FROM_USER"?e.jsx(L,{user:d.user,children:c.content},c.id):c.type==="FROM_BOT"?c.component=="CHAT_EVENT"?e.jsx(i.BotMessage,{message:c},c.id):e.jsx(i.BotResponseWrapper,{bot:c.bot,children:e.jsx(i.BotMessage,{message:c})},c.id):null),m&&e.jsx(h,{})]}),e.jsxs("footer",{children:[s.keyboard&&e.jsx(l.Fragment,{children:e.jsx(X,{options:s.keyboard.options,onKeyboardClick:r})}),e.jsxs(l.Fragment,{children:[a&&e.jsx(l.Fragment,{children:e.jsx("div",{className:"items-center justify-end mb-3 gap-1 flex-wrap p-1",children:(T=n==null?void 0:n.initial_questions)==null?void 0:T.map((c,g)=>e.jsx("button",{dir:"auto",className:"px-2 py-1.5 border whitespace-nowrap rounded-lg text-sm font-300",onClick:()=>{t({content:{text:c}})},children:c},g))})}),e.jsx(Y,{})]})]})]})]})})})}function $(){const{session:n,clearSession:s,settings:t,setSettings:a}=i.useChat(),o=i.useLocale();return e.jsx("header",{className:"p-3 gap-2 flex flex-col",style:{paddingBottom:"1rem"},children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs(j,{children:[e.jsx(b,{className:"p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0",children:e.jsx(x.SettingsIcon,{className:"size-5"})}),e.jsxs(y,{children:[e.jsxs("div",{className:"p-3 flex items-center justify-between",children:[e.jsx("h2",{className:"text-sm font-semibold",dir:"auto",children:o.get("settings")}),e.jsx(v,{className:"bg-transparent text-accent p-1 font-semibold",children:e.jsx(x.XIcon,{className:"size-4"})})]}),e.jsxs("div",{className:"p-3 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("label",{htmlFor:"persist-session::open",dir:"auto",children:o.get("persist-session")}),e.jsx(w,{id:"persist-session::open",disabled:!!n,checked:t==null?void 0:t.persistSession,onCheckedChange:r=>{a({persistSession:r})}})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("label",{htmlFor:"sfx::open",dir:"auto",children:o.get("sound-effects")}),e.jsx(w,{id:"sfx::open",disabled:!!n,checked:t==null?void 0:t.useSoundEffects,onCheckedChange:r=>{a({useSoundEffects:r})}})]})]})]})]}),e.jsx("div",{className:"flex items-center justify-center -space-x-2",children:e.jsx("img",{src:P,alt:"Hero image",className:"w-[122px]"})}),e.jsx(j,{children:({setOpen:r})=>e.jsxs(e.Fragment,{children:[e.jsx(b,{className:"p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0",children:e.jsx(x.RotateCcw,{className:"size-5"})}),e.jsxs(y,{children:[e.jsx("div",{className:"p-4",children:e.jsx("h2",{className:"text-sm",dir:"auto",children:o.get("reset-conversation-confirm")})}),e.jsxs("div",{className:"p-4 space-x-3 flex items-center justify-end",children:[e.jsx("button",{dir:"auto",onClick:()=>{s(),r(!1)},className:"bg-rose-400 text-white px-2 py-1 rounded-lg text-sm",children:o.get("yes")}),e.jsx(v,{dir:"auto",className:"bg-transparent text-accent border px-2 py-1 rounded-lg text-sm",children:o.get("no")})]})]})]})})]})})}function G(){const{session:n,clearSession:s,settings:t,setSettings:a}=i.useChat(),o=i.useLocale();return e.jsxs("header",{className:"p-3 gap-2 flex flex-col",style:{paddingBottom:"2rem"},children:[e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs(j,{children:[e.jsx(b,{className:"p-1.5 hidden rounded-full bg-accent/60 text-background",children:e.jsx(x.XIcon,{className:"size-5"})}),e.jsx(y,{children:e.jsxs("div",{className:"p-3 flex items-center justify-between",children:[e.jsx("h2",{className:"text-sm font-semibold",dir:"auto",children:o.get("close-widget")}),e.jsx(v,{className:"bg-transparent text-accent p-2 font-semibold",children:e.jsx(x.XIcon,{className:"size-4"})})]})})]}),e.jsxs(j,{children:[e.jsx(b,{className:"p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0",children:e.jsx(x.SettingsIcon,{className:"size-5"})}),e.jsxs(y,{children:[e.jsxs("div",{className:"p-3 flex items-center justify-between",children:[e.jsx("h2",{className:"text-sm font-semibold",dir:"auto",children:o.get("settings")}),e.jsx(v,{className:"bg-transparent text-accent p-1 font-semibold",children:e.jsx(x.XIcon,{className:"size-4"})})]}),e.jsxs("div",{className:"p-3 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("label",{htmlFor:"persist-session::open",dir:"auto",children:o.get("persist-session")}),e.jsx(w,{id:"persist-session::open",disabled:!!n,checked:t==null?void 0:t.persistSession,onCheckedChange:r=>{a({persistSession:r})}})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("label",{htmlFor:"sfx::open",dir:"auto",children:o.get("sound-effects")}),e.jsx(w,{id:"sfx::open",disabled:!!n,checked:t==null?void 0:t.useSoundEffects,onCheckedChange:r=>{a({useSoundEffects:r})}})]})]})]})]}),e.jsx(j,{children:({setOpen:r})=>e.jsxs(e.Fragment,{children:[e.jsx(b,{className:"p-1.5 rounded-full bg-accent/60 text-background",children:e.jsx(x.RotateCcw,{className:"size-5"})}),e.jsxs(y,{children:[e.jsx("div",{className:"p-4",children:e.jsx("h2",{className:"text-sm",dir:"auto",children:o.get("reset-conversation-confirm")})}),e.jsxs("div",{className:"p-4 gap-2 flex items-center justify-end",children:[e.jsx("button",{onClick:()=>{s(),r(!1)},dir:"auto",className:"bg-rose-400 text-white px-2 py-1 rounded-lg text-sm",children:o.get("yes")}),e.jsx(v,{dir:"auto",className:"bg-transparent text-accent border px-2 py-1 rounded-lg text-sm",children:o.get("no")})]})]})]})})]}),e.jsxs("div",{className:"flex items-center justify-center flex-col",children:[e.jsx("div",{className:"flex items-center justify-center -space-x-2",children:e.jsx("img",{src:P,alt:"Hero image",className:"w-1/2"})}),e.jsx("h2",{className:"text-lg font-semibold text-background text-center",dir:"auto",style:{textShadow:"0px 2px 8px rgba(0, 0, 0, 0.12)"},children:o.get("got-any-questions")}),e.jsx("span",{className:"text-sm text-white text-center",dir:"auto",style:{textShadow:"0px 2px 8px rgba(0, 0, 0, 0.12)"},children:o.get("typical-response-time")})]})]})}const E=`
[--primary:211_65%_59%]
[--foreground:0_0%_0%]
[--background:0_0%_100%]
[--secondary:0_0%_96%]
[--primary-foreground:217_72%_18%]
[--accent:0_0_22%]
[--dark:0_0%_0%]
`;function J(n){const[s,t]=l.useState(!1),a=()=>{t(!s)};return e.jsxs(S.Root,{open:s,onOpenChange:t,children:[e.jsx(S.Content,{onInteractOutside:o=>o.preventDefault(),side:"top",sideOffset:10,"data-chat-widget":!0,asChild:!0,align:"end",style:{zIndex:1e7},children:e.jsx(F,{className:"max-h-[85dvh] w-[350px] h-[600px] font-inter"})}),e.jsx(S.PopoverTrigger,{"data-chat-widget":!0,className:`${E} shadow-lg bottom-2 right-4 z-[200] fixed p-3 font-inter rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90`,onClick:a,children:e.jsx("div",{className:i.cn("size-6 transition-transform duration-300 ease-in-out",{"transform scale-110":s}),children:s?e.jsx(x.X,{className:"size-6"}):e.jsx(x.MessageSquareDot,{className:"size-6 transform -scale-95"})})})]})}const F=l.forwardRef(({className:n,...s},t)=>{const a=i.useChat();return e.jsx("div",{style:{display:"contents"},"data-chat-widget":!0,children:e.jsx("div",{...s,ref:t,"data-version":a.version,"data-chat-widget":!0,className:i.cn("rounded-xl size-full overflow-hidden isolate relative font-inter",E,n),children:e.jsx("div",{className:"size-full absolute antialiased font-inter",children:e.jsx(V,{})})})})});F.displayName="Widget";exports.Widget=F;exports.WidgetPopover=J;
