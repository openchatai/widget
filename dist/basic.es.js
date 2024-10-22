"use client";
import { jsx as e, jsxs as a, Fragment as T } from "react/jsx-runtime";
import * as _ from "@radix-ui/react-popover";
import { SettingsIcon as H, XIcon as S, RotateCcw as A, CircleDashed as q, SendHorizonal as V, MessageSquareDot as $, X as G } from "lucide-react";
import * as K from "react";
import f, { useRef as R, useEffect as F, useState as L, useMemo as J, useId as Q, forwardRef as Z } from "react";
import { c as ee, A as te, a as ne, b as w, u as k, d as se, C as ae, B as z, e as P, f as O } from "./ChatProvider-DmntKGg_.js";
import { motion as I, AnimatePresence as U } from "framer-motion";
import * as j from "@radix-ui/react-switch";
import * as E from "@radix-ui/react-tooltip";
const [D, oe] = ee(), re = () => {
};
function x({
  defaultOpen: s,
  onOpenChange: t,
  open: n,
  children: o,
  isAlert: r
}) {
  const [i, c] = L(s), u = n ?? i ?? !1, m = t ?? c;
  return /* @__PURE__ */ e(
    oe,
    {
      value: {
        open: u,
        setOpen: m,
        onOpenChange: t ?? re,
        isAlert: r || !1
      },
      children: typeof o == "function" ? o({ open: u, setOpen: m }) : o
    }
  );
}
const b = f.forwardRef((s, t) => {
  const { setOpen: n, open: o } = D();
  return /* @__PURE__ */ e(
    "button",
    {
      ...s,
      "data-open": o,
      onClick: () => n(!0),
      ref: t
    }
  );
}), ie = f.forwardRef((s, t) => /* @__PURE__ */ e(
  I.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.1 } },
    transition: { duration: 0.2 },
    className: "absolute inset-0 z-[24] from-gray-100/30 to-gray-50/30 bg-gradient-to-t backdrop-blur-sm",
    ...s,
    ref: t
  }
));
function le(...s) {
  return (t) => {
    s.forEach((n) => {
      typeof n == "function" ? n(t) : n && (n.current = t);
    });
  };
}
const y = f.forwardRef(({ children: s, ...t }, n) => {
  const { open: o, setOpen: r, isAlert: i } = D(), c = R(null), u = R(null), m = le(n, c);
  return F(() => {
    if (!o || i) return;
    const d = (p) => {
      p.key === "Escape" && r(!1);
    };
    return window.addEventListener("keydown", d), () => {
      window.removeEventListener("keydown", d);
    };
  }, [o, r]), F(() => {
    var d;
    o && ((d = c.current) == null || d.focus());
  }, [o]), /* @__PURE__ */ e(U, { children: o && /* @__PURE__ */ a(T, { children: [
    /* @__PURE__ */ e(
      I.div,
      {
        "data-alert": i,
        initial: { opacity: 0, y: 20, x: "-50%" },
        animate: { opacity: 1, y: 0, x: "-50%" },
        exit: { opacity: 0, y: 20, x: "-50%" },
        transition: { type: "spring", damping: 20, stiffness: 300 },
        className: "bg-white rounded-xl grid grid-cols-1 gap-2 border max-w-[90%] bottom-2 w-full absolute left-1/2 p-3 z-[25]",
        ref: m,
        ...t,
        children: s
      }
    ),
    /* @__PURE__ */ e(
      ie,
      {
        onClick: (d) => {
          i || d.target === u.current && r(!1);
        },
        ref: u
      }
    )
  ] }) });
}), N = f.forwardRef((s, t) => {
  const { setOpen: n, open: o } = D();
  return /* @__PURE__ */ e(
    "button",
    {
      ...s,
      "data-open": o,
      onClick: () => {
        n(!1);
      },
      ref: t
    }
  );
});
function ce({
  options: s,
  onKeyboardClick: t
}) {
  return /* @__PURE__ */ e("div", { className: "flex items-center gap-2 p-1.5", children: s.map((n, o) => /* @__PURE__ */ e(
    "button",
    {
      onClick: () => t(n),
      className: "hover:shadow font-semibold transition-all hover:border-secondary border-transparent border text-white bg-primary rounded-md p-1.5 text-sm w-full",
      children: n
    },
    o
  )) });
}
function de({
  children: s,
  user: t
}) {
  return /* @__PURE__ */ a("div", { className: "flex flex-row w-full gap-1 justify-end items-end", children: [
    /* @__PURE__ */ e("div", { className: "w-fit min-w-[50%]", children: /* @__PURE__ */ e(
      "div",
      {
        className: "bg-primary p-2.5 min-w-fit text-white rounded-lg leading-snug font-medium text-sm",
        style: {
          background: "#1883FF",
          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)"
        },
        children: s
      }
    ) }),
    /* @__PURE__ */ e(te, { className: "size-7", children: /* @__PURE__ */ e(ne, { src: t == null ? void 0 : t.avatarUrl }) })
  ] });
}
const v = K.forwardRef(({ className: s, ...t }, n) => /* @__PURE__ */ e(
  j.Root,
  {
    className: w(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary",
      s
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ e(
      j.Thumb,
      {
        className: w(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(100%_-_0.07rem)]",
          "data-[state=unchecked]:translate-x-[0.07rem]",
          "rtl:data-[state=checked]:translate-x-[calc(-100%_+_0.07rem)]",
          "rtl:data-[state=unchecked]:translate-x-[-0.07rem]"
        )
      }
    )
  }
));
v.displayName = j.Root.displayName;
const ue = E.Provider, me = K.forwardRef(({ className: s, sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ e(
  E.Content,
  {
    ref: o,
    sideOffset: t,
    className: w(
      "z-50 overflow-hidden rounded-lg bg-foreground text-background p-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      s
    ),
    ...n
  }
));
me.displayName = E.Content.displayName;
const W = "https://cloud.opencopilot.so/widget/hero-image.png";
function fe() {
  const [s, t] = L(""), n = R(null), { sendMessage: o, info: r, hookState: i, isSessionClosed: c } = k(), u = Q(), m = O(), d = (h) => {
    const C = h.currentTarget.value;
    t(C);
  };
  async function p() {
    s.trim().length !== 0 && (o({
      content: {
        text: s
      }
    }), t(""));
  }
  return /* @__PURE__ */ a("div", { className: "p-2 rounded-lg relative", children: [
    /* @__PURE__ */ e("div", { className: "relative w-full top-0 overflow-hidden h-5 px-1", children: /* @__PURE__ */ e(U, { children: r && /* @__PURE__ */ e(
      I.div,
      {
        className: "absolute w-full text-xs text-accent/60",
        layoutId: u,
        animate: { opacity: 1, translateY: 0 },
        exit: { opacity: 0, translateY: "-100%" },
        initial: { opacity: 0, translateY: "-100%" },
        transition: {
          duration: 0.2,
          ease: "easeInOut"
        },
        style: { top: 0 },
        children: r
      },
      r.toString()
    ) }) }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex rounded-lg items-center gap-2 bg-white border px-2 py-1.5",
        style: {
          border: "1px solid rgba(19, 34, 68, 0.08)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.04)"
        },
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              ref: n,
              disabled: i === "loading" || c,
              value: s,
              className: "flex-1 outline-none p-1 text-accent text-sm bg-transparent !placeholder-text-sm placeholder-font-100 placeholder:text-primary-foreground/50",
              onChange: d,
              autoFocus: !0,
              onKeyDown: async (h) => {
                h.key === "Enter" && !h.shiftKey && (h.preventDefault(), await p());
              },
              placeholder: m.get("write-a-message")
            }
          ),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(
            "button",
            {
              onClick: p,
              disabled: i === "loading",
              className: "rounded-lg border p-[7px] text-white bg-primary shrink-0 disabled:opacity-50",
              style: {
                background: "#1883FF"
              },
              children: i === "loading" ? /* @__PURE__ */ e(q, { className: "size-3.5 animate-spin animate-iteration-infinite" }) : /* @__PURE__ */ e(V, { className: "size-3.5 rtl:-scale-100" })
            }
          ) })
        ]
      }
    )
  ] });
}
function pe() {
  var M, B;
  const {
    initialData: s,
    state: t,
    sendMessage: n,
    noMessages: o,
    hookState: r,
    handleKeyboard: i
  } = k(), c = se(), u = R(null), m = r === "loading";
  function d() {
    setTimeout(() => {
      const l = u.current;
      l && (l.scrollTop = l.scrollHeight);
    }, 0);
  }
  F(() => {
    d();
  }, [t.messages]);
  const p = J(
    () => new ae({
      components: c.components
    }),
    [c]
  ), h = p.getComponent(
    "loading",
    c.debug
  ), C = p.getComponent(
    "text",
    c.debug
  );
  return /* @__PURE__ */ e(ue, { children: /* @__PURE__ */ e("div", { className: "size-full flex flex-col overflow-hidden bg-background z-10 origin-bottom absolute bottom-0 inset-x-0", children: /* @__PURE__ */ a(
    "div",
    {
      className: "w-full mesh-gradient rounded-xl h-full justify-between rounded-t-xl flex flex-col relative",
      style: {
        background: "linear-gradient(333.89deg, rgba(75, 240, 171, 0.8) 58%, rgba(75, 240, 171, 0) 85.74%), linear-gradient(113.43deg, #46B1FF 19.77%, #1883FF 65.81%)"
      },
      children: [
        o ? /* @__PURE__ */ e(ge, {}) : /* @__PURE__ */ e(he, {}),
        /* @__PURE__ */ a(
          "div",
          {
            className: "flex flex-col w-full flex-1 bg-background rounded-t-xl shadow overflow-auto",
            style: {
              background: "#FAFBFB",
              boxShadow: "0px -8px 20px rgba(0, 0, 0, 0.12)",
              borderRadius: " 16px 16px 0px 0px"
            },
            children: [
              /* @__PURE__ */ a(
                "div",
                {
                  "data-messages": !0,
                  ref: u,
                  className: "max-h-full scroll-smooth relative flex-1 py-4 px-3 space-y-3 overflow-auto",
                  children: [
                    ((M = c.initialMessages) == null ? void 0 : M.map((l, g) => /* @__PURE__ */ e(z, { bot: c.bot, children: /* @__PURE__ */ e(
                      C,
                      {
                        component: "TEXT",
                        data: { message: l },
                        id: `${g}`,
                        type: "FROM_BOT",
                        serverId: null
                      }
                    ) }, g))) ?? /* @__PURE__ */ e(z, { bot: c.bot, children: /* @__PURE__ */ e(
                      C,
                      {
                        component: "TEXT",
                        data: { message: "Hello, how can I help?" },
                        id: "123",
                        type: "FROM_BOT",
                        serverId: null
                      }
                    ) }),
                    t.messages.map((l, g) => l.type === "FROM_USER" ? /* @__PURE__ */ e(de, { user: c.user, children: l.content }, l.id) : l.type === "FROM_BOT" ? l.component == "CHAT_EVENT" ? /* @__PURE__ */ e(P, { message: l }, l.id) : /* @__PURE__ */ e(z, { bot: l.bot, children: /* @__PURE__ */ e(P, { message: l }) }, l.id) : null),
                    m && /* @__PURE__ */ e(h, {})
                  ]
                }
              ),
              /* @__PURE__ */ a("footer", { children: [
                t.keyboard && /* @__PURE__ */ e(f.Fragment, { children: /* @__PURE__ */ e(
                  ce,
                  {
                    options: t.keyboard.options,
                    onKeyboardClick: i
                  }
                ) }),
                /* @__PURE__ */ a(f.Fragment, { children: [
                  o && /* @__PURE__ */ e(f.Fragment, { children: /* @__PURE__ */ e("div", { className: "items-center justify-end mb-3 gap-1 flex-wrap p-1", children: (B = s == null ? void 0 : s.initial_questions) == null ? void 0 : B.map((l, g) => /* @__PURE__ */ e(
                    "button",
                    {
                      dir: "auto",
                      className: "px-2 py-1.5 border whitespace-nowrap rounded-lg text-sm font-300",
                      onClick: () => {
                        n({
                          content: { text: l }
                        });
                      },
                      children: l
                    },
                    g
                  )) }) }),
                  /* @__PURE__ */ e(fe, {})
                ] })
              ] })
            ]
          }
        )
      ]
    }
  ) }) });
}
function he() {
  const { session: s, clearSession: t, settings: n, setSettings: o } = k(), r = O();
  return /* @__PURE__ */ e(
    "header",
    {
      className: "p-3 gap-2 flex flex-col",
      style: {
        paddingBottom: "1rem"
      },
      children: /* @__PURE__ */ a("div", { className: "w-full flex items-center justify-between", children: [
        /* @__PURE__ */ a(x, { children: [
          /* @__PURE__ */ e(b, { className: "p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0", children: /* @__PURE__ */ e(H, { className: "size-5" }) }),
          /* @__PURE__ */ a(y, { children: [
            /* @__PURE__ */ a("div", { className: "p-3 flex items-center justify-between", children: [
              /* @__PURE__ */ e("h2", { className: "text-sm font-semibold", dir: "auto", children: r.get("settings") }),
              /* @__PURE__ */ e(N, { className: "bg-transparent text-accent p-1 font-semibold", children: /* @__PURE__ */ e(S, { className: "size-4" }) })
            ] }),
            /* @__PURE__ */ a("div", { className: "p-3 space-y-2", children: [
              /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e("label", { htmlFor: "persist-session::open", dir: "auto", children: r.get("persist-session") }),
                /* @__PURE__ */ e(
                  v,
                  {
                    id: "persist-session::open",
                    disabled: !!s,
                    checked: n == null ? void 0 : n.persistSession,
                    onCheckedChange: (i) => {
                      o({ persistSession: i });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e("label", { htmlFor: "sfx::open", dir: "auto", children: r.get("sound-effects") }),
                /* @__PURE__ */ e(
                  v,
                  {
                    id: "sfx::open",
                    disabled: !!s,
                    checked: n == null ? void 0 : n.useSoundEffects,
                    onCheckedChange: (i) => {
                      o({ useSoundEffects: i });
                    }
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center justify-center -space-x-2", children: /* @__PURE__ */ e("img", { src: W, alt: "Hero image", className: "w-[122px]" }) }),
        /* @__PURE__ */ e(x, { children: ({ setOpen: i }) => /* @__PURE__ */ a(T, { children: [
          /* @__PURE__ */ e(b, { className: "p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0", children: /* @__PURE__ */ e(A, { className: "size-5" }) }),
          /* @__PURE__ */ a(y, { children: [
            /* @__PURE__ */ e("div", { className: "p-4", children: /* @__PURE__ */ e("h2", { className: "text-sm", dir: "auto", children: r.get("reset-conversation-confirm") }) }),
            /* @__PURE__ */ a("div", { className: "p-4 space-x-3 flex items-center justify-end", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  dir: "auto",
                  onClick: () => {
                    t(), i(!1);
                  },
                  className: "bg-rose-400 text-white px-2 py-1 rounded-lg text-sm",
                  children: r.get("yes")
                }
              ),
              /* @__PURE__ */ e(N, { dir: "auto", className: "bg-transparent text-accent border px-2 py-1 rounded-lg text-sm", children: r.get("no") })
            ] })
          ] })
        ] }) })
      ] })
    }
  );
}
function ge() {
  const { session: s, clearSession: t, settings: n, setSettings: o } = k(), r = O();
  return /* @__PURE__ */ a(
    "header",
    {
      className: "p-3 gap-2 flex flex-col",
      style: {
        paddingBottom: "2rem"
      },
      children: [
        /* @__PURE__ */ a("div", { className: "w-full flex items-center justify-between", children: [
          /* @__PURE__ */ a(x, { children: [
            /* @__PURE__ */ e(b, { className: "p-1.5 hidden rounded-full bg-accent/60 text-background", children: /* @__PURE__ */ e(S, { className: "size-5" }) }),
            /* @__PURE__ */ e(y, { children: /* @__PURE__ */ a("div", { className: "p-3 flex items-center justify-between", children: [
              /* @__PURE__ */ e("h2", { className: "text-sm font-semibold", dir: "auto", children: r.get("close-widget") }),
              /* @__PURE__ */ e(N, { className: "bg-transparent text-accent p-2 font-semibold", children: /* @__PURE__ */ e(S, { className: "size-4" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ a(x, { children: [
            /* @__PURE__ */ e(b, { className: "p-1.5 rounded-full bg-accent/60 text-background flex-shrink-0", children: /* @__PURE__ */ e(H, { className: "size-5" }) }),
            /* @__PURE__ */ a(y, { children: [
              /* @__PURE__ */ a("div", { className: "p-3 flex items-center justify-between", children: [
                /* @__PURE__ */ e("h2", { className: "text-sm font-semibold", dir: "auto", children: r.get("settings") }),
                /* @__PURE__ */ e(N, { className: "bg-transparent text-accent p-1 font-semibold", children: /* @__PURE__ */ e(S, { className: "size-4" }) })
              ] }),
              /* @__PURE__ */ a("div", { className: "p-3 space-y-2", children: [
                /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ e("label", { htmlFor: "persist-session::open", dir: "auto", children: r.get("persist-session") }),
                  /* @__PURE__ */ e(
                    v,
                    {
                      id: "persist-session::open",
                      disabled: !!s,
                      checked: n == null ? void 0 : n.persistSession,
                      onCheckedChange: (i) => {
                        o({ persistSession: i });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ e("label", { htmlFor: "sfx::open", dir: "auto", children: r.get("sound-effects") }),
                  /* @__PURE__ */ e(
                    v,
                    {
                      id: "sfx::open",
                      disabled: !!s,
                      checked: n == null ? void 0 : n.useSoundEffects,
                      onCheckedChange: (i) => {
                        o({ useSoundEffects: i });
                      }
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e(x, { children: ({ setOpen: i }) => /* @__PURE__ */ a(T, { children: [
            /* @__PURE__ */ e(b, { className: "p-1.5 rounded-full bg-accent/60 text-background", children: /* @__PURE__ */ e(A, { className: "size-5" }) }),
            /* @__PURE__ */ a(y, { children: [
              /* @__PURE__ */ e("div", { className: "p-4", children: /* @__PURE__ */ e("h2", { className: "text-sm", dir: "auto", children: r.get("reset-conversation-confirm") }) }),
              /* @__PURE__ */ a("div", { className: "p-4 gap-2 flex items-center justify-end", children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => {
                      t(), i(!1);
                    },
                    dir: "auto",
                    className: "bg-rose-400 text-white px-2 py-1 rounded-lg text-sm",
                    children: r.get("yes")
                  }
                ),
                /* @__PURE__ */ e(
                  N,
                  {
                    dir: "auto",
                    className: "bg-transparent text-accent border px-2 py-1 rounded-lg text-sm",
                    children: r.get("no")
                  }
                )
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center justify-center flex-col", children: [
          /* @__PURE__ */ e("div", { className: "flex items-center justify-center -space-x-2", children: /* @__PURE__ */ e("img", { src: W, alt: "Hero image", className: "w-1/2" }) }),
          /* @__PURE__ */ e(
            "h2",
            {
              className: "text-lg font-semibold text-background text-center",
              dir: "auto",
              style: {
                textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)"
              },
              children: r.get("got-any-questions")
            }
          ),
          /* @__PURE__ */ e(
            "span",
            {
              className: "text-sm text-white text-center",
              dir: "auto",
              style: {
                textShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)"
              },
              children: r.get("typical-response-time")
            }
          )
        ] })
      ]
    }
  );
}
const X = `
[--primary:211_65%_59%]
[--foreground:0_0%_0%]
[--background:0_0%_100%]
[--secondary:0_0%_96%]
[--primary-foreground:217_72%_18%]
[--accent:0_0_22%]
[--dark:0_0%_0%]
`;
function ve(s) {
  const [t, n] = f.useState(!1), o = () => {
    n(!t);
  };
  return /* @__PURE__ */ a(_.Root, { open: t, onOpenChange: n, children: [
    /* @__PURE__ */ e(
      _.Content,
      {
        onInteractOutside: (r) => r.preventDefault(),
        side: "top",
        sideOffset: 10,
        "data-chat-widget": !0,
        asChild: !0,
        align: "end",
        style: { zIndex: 1e7 },
        children: /* @__PURE__ */ e(Y, { className: "max-h-[85dvh] w-[350px] h-[600px] font-inter" })
      }
    ),
    /* @__PURE__ */ e(
      _.PopoverTrigger,
      {
        "data-chat-widget": !0,
        className: `${X} shadow-lg bottom-2 right-4 z-[200] fixed p-3 font-inter rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90`,
        onClick: o,
        children: /* @__PURE__ */ e(
          "div",
          {
            className: w(
              "size-6 transition-transform duration-300 ease-in-out",
              { "transform scale-110": t }
            ),
            children: t ? /* @__PURE__ */ e(G, { className: "size-6" }) : /* @__PURE__ */ e($, { className: "size-6 transform -scale-95" })
          }
        )
      }
    )
  ] });
}
const Y = Z(({ className: s, ...t }, n) => {
  const o = k();
  return /* @__PURE__ */ e("div", { style: { display: "contents" }, "data-chat-widget": !0, children: /* @__PURE__ */ e(
    "div",
    {
      ...t,
      ref: n,
      "data-version": o.version,
      "data-chat-widget": !0,
      className: w(
        "rounded-xl size-full overflow-hidden isolate relative font-inter",
        X,
        s
      ),
      children: /* @__PURE__ */ e("div", { className: "size-full absolute antialiased font-inter", children: /* @__PURE__ */ e(pe, {}) })
    }
  ) });
});
Y.displayName = "Widget";
export {
  Y as Widget,
  ve as WidgetPopover
};
