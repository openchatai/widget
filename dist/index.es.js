"use client";
import { jsx as g } from "react/jsx-runtime";
import { u as d, g as h, L as C, h as m } from "./ChatProvider-DmntKGg_.js";
import { j as b, e as w, B as E, i as F, k as H, C as j, F as A, M as X, l as Y, n as $, m as q, o as O, q as R, d as U, f as z, p as G, w as J } from "./ChatProvider-DmntKGg_.js";
import { useRef as f, useEffect as x, useState as S, useCallback as y } from "react";
function T() {
  const t = f(!0);
  return x(() => () => {
    t.current = !1;
  }, []), () => t.current;
}
function p(t, s = [], e = { loading: !1 }) {
  const o = f(0), r = T(), [c, a] = S(e), l = y((...i) => {
    const u = ++o.current;
    return c.loading || a((n) => ({ ...n, loading: !0 })), t(...i).then(
      (n) => (r() && u === o.current && // @ts-ignore
      a({ value: n, loading: !1 }), n),
      (n) => (r() && u === o.current && a({ error: n, loading: !1 }), n)
    );
  }, s);
  return [c, l];
}
const M = (t) => [(e, o) => {
  if (t.current) {
    const { scrollWidth: r, scrollHeight: c } = t.current, a = r - t.current.clientWidth, l = c - t.current.clientHeight, i = e / 100 * a, u = o / 100 * l;
    t.current.scrollTo(i, u);
  }
}];
function P(t, s) {
  const { axiosInstance: e } = d();
  return p(
    async () => e.post(`/chat/vote/${t}`),
    [e, t, s]
  );
}
function k(t, s) {
  const { axiosInstance: e } = d();
  return p(
    async () => e.delete(`/chat/vote/${t}`),
    [e, t, s]
  );
}
function D({
  children: t,
  options: s
}) {
  return /* @__PURE__ */ g(h, { data: s, children: /* @__PURE__ */ g(C, { children: /* @__PURE__ */ g(m, { children: t }) }) });
}
export {
  b as BotLoadingComponent,
  w as BotMessage,
  E as BotResponseWrapper,
  F as BotTextResponse,
  H as ChatEventComponent,
  j as ComponentRegistry,
  A as FallbackComponent,
  X as MessageTypeEnum,
  D as WidgetRoot,
  Y as createSession,
  $ as getChatSessionById,
  q as getInitData,
  O as getOfficeHours,
  p as useAsyncFn,
  R as useAxiosInstance,
  d as useChat,
  U as useConfigData,
  k as useDownvote,
  z as useLang,
  M as useScrollToPercentage,
  G as useSyncedState,
  P as useUpvote,
  J as workingDays
};
