"use client";
var xl = Object.defineProperty;
var kl = (e, t, n) => t in e ? xl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Di = (e, t, n) => kl(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as ue, Fragment as Sl, jsxs as Nn } from "react/jsx-runtime";
import * as $r from "react";
import _t, { createContext as cs, useContext as fs, useMemo as Jt, createElement as El, useEffect as He, useLayoutEffect as vl, useRef as pt, useCallback as be, useDebugValue as Cl, useState as vn, useReducer as Al } from "react";
import * as Ot from "@radix-ui/react-avatar";
import { clsx as _l } from "clsx";
import { produce as Ol } from "immer";
import A from "zod";
function ei(e) {
  const t = cs({});
  return [() => {
    const r = fs(t);
    if (r === void 0)
      throw new Error("useSafeContext must be used within a Provider");
    return r;
  }, t.Provider];
}
const Tl = {
  ok: "حسنا",
  yes: "نعم",
  no: "لا",
  agree: "موافق",
  cancel: "إلغاء",
  "yes-exit": "نعم، اخرج",
  "yes-reset": "نعم، إعادة تعيين",
  "no-cancel": "لا، إلغاء",
  "are-you-sure": "هل أنت متأكد؟",
  recording: "تسجيل",
  "thank-you": "شكرا",
  "sorry-try-again": "عذرا، حاول مرة أخرى",
  "error-occurred": "حدث خطأ",
  "please-try-again": "يرجى المحاولة مرة أخرى",
  "write-a-message": "اكتب رسالة...",
  "send-message": "إرسال رسالة",
  connected: "متصل",
  connecting: "جاري الاتصال",
  reconnecting: "جاري إعادة الاتصال",
  reconnected: "تم إعادة الاتصال",
  disconnecting: "جاري قطع الاتصال",
  disconnected: "قطع الاتصال",
  error: "خطأ",
  "persist-session": "حفظ الجلسة",
  settings: "إعدادات",
  close: "إغلاق",
  help: "مساعدة",
  chat: "محادثة",
  send: "إرسال",
  copy: "نسخ",
  copied: "تم النسخ",
  "sound-effects": "التاثيرات الصوتية",
  language: "اللغة",
  select: "اختر",
  agent: "الوكيل",
  user: "المستخدم",
  bot: "البوت",
  "reset-conversation-confirm": "هل أنت متأكد من أنك تريد إعادة تعيين المحادثة؟",
  "close-widget": "إغلاق الودجة",
  "got-any-questions": "هل لديك أي أسئلة؟ تحدث معنا!",
  "typical-response-time": "عادة ما نرد في أقل من دقيقة واحدة",
  "session-closed-lead": "تم حل مشكلتك!"
}, Rl = {
  ok: "OK",
  yes: "Ja",
  no: "Nein",
  agree: "Zustimmen",
  cancel: "Stornieren",
  "yes-exit": "Ja, beenden",
  "yes-reset": "Ja, zurücksetzen",
  "no-cancel": "Nein, abbrechen",
  "are-you-sure": "Sind Sie sicher?",
  recording: "Aufnahme läuft",
  "thank-you": "Vielen Dank",
  "sorry-try-again": "Entschuldigung, bitte versuchen Sie es erneut",
  "error-occurred": "Ein Fehler ist aufgetreten",
  "please-try-again": "Bitte versuchen Sie es erneut",
  "write-a-message": "Nachricht schreiben...",
  "send-message": "Nachricht senden",
  connected: "Verbunden",
  connecting: "Verbindung wird hergestellt",
  reconnecting: "Verbindung wird wiederhergestellt",
  reconnected: "Wieder verbunden",
  disconnecting: "Verbindung wird getrennt",
  disconnected: "Verbindung getrennt",
  error: "Fehler",
  "persist-session": "Sitzung beibehalten",
  settings: "Einstellungen",
  close: "Schließen",
  help: "Hilfe",
  chat: "Chat",
  send: "Senden",
  copy: "Kopieren",
  copied: "Kopiert",
  "sound-effects": "Soundeffekte",
  language: "Sprache",
  select: "Auswählen",
  agent: "Agent",
  user: "Benutzer",
  bot: "Bot",
  "got-any-questions": "Haben Sie Fragen? Chatten Sie mit uns!",
  "typical-response-time": "Üblicherweise antworten wir in weniger als 1 Minute",
  "reset-conversation-confirm": "Möchten Sie die Konversation wirklich zurücksetzen?",
  "close-widget": "Widget schließen",
  "session-closed-lead": "Ihr Problem wurde gelöst!"
}, Il = {
  ok: "OK",
  yes: "Yes",
  no: "No",
  agree: "Agree",
  cancel: "Cancel",
  "yes-exit": "Yes, exit",
  "yes-reset": "Yes, reset",
  "no-cancel": "No, cancel",
  "are-you-sure": "Are you sure?",
  recording: "Recording...",
  "thank-you": "Thank you",
  "sorry-try-again": "Sorry, please try again",
  "error-occurred": "An error occurred",
  "please-try-again": "Please try again",
  "write-a-message": "Write a message...",
  "send-message": "Send message",
  connected: "Connected",
  connecting: "Connecting",
  reconnecting: "Reconnecting",
  reconnected: "Reconnected",
  disconnecting: "Disconnecting",
  disconnected: "Disconnected",
  error: "Error",
  "persist-session": "Persist session",
  settings: "Settings",
  close: "Close",
  help: "Help",
  chat: "Chat",
  send: "Send",
  copy: "Copy",
  copied: "Copied",
  "sound-effects": "Sound effects",
  language: "Language",
  select: "Select",
  agent: "Agent",
  user: "User",
  bot: "Bot",
  "reset-conversation-confirm": "Are you sure you want to reset the conversation?",
  "close-widget": "Close widget",
  "got-any-questions": "Got any questions? Chat with us!",
  "typical-response-time": "Typically respond in less than 1 minute",
  "session-closed-lead": "Your issue has been resolved!"
}, Ll = {
  ok: "D'accord",
  yes: "Oui",
  no: "Non",
  agree: "Accepter",
  cancel: "Annuler",
  "yes-exit": "Oui, quitter",
  "yes-reset": "Oui, réinitialiser",
  "no-cancel": "Non, annuler",
  "are-you-sure": "Êtes-vous sûr ?",
  recording: "Enregistrement...",
  "thank-you": "Merci",
  "sorry-try-again": "Désolé, veuillez réessayer",
  "error-occurred": "Une erreur s'est produite",
  "please-try-again": "Veuillez réessayer",
  "write-a-message": "Écrivez un message...",
  "send-message": "Envoyer le message",
  connected: "Connecté",
  connecting: "Connexion en cours",
  reconnecting: "Reconnexion en cours",
  reconnected: "Reconnecté",
  disconnecting: "Déconnexion en cours",
  disconnected: "Déconnecté",
  error: "Erreur",
  "persist-session": "Conserver la session",
  settings: "Paramètres",
  close: "Fermer",
  help: "Aide",
  chat: "Chat",
  send: "Envoyer",
  copy: "Copier",
  copied: "Copié",
  "sound-effects": "Effets sonores",
  language: "Langue",
  select: "Sélectionner",
  agent: "Agent",
  user: "Utilisateur",
  bot: "Bot",
  "reset-conversation-confirm": "Êtes-vous sûr de vouloir réinitialiser la conversation ?",
  "close-widget": "Fermer le widget",
  "got-any-questions": "Vous avez des questions ? Chattez avec nous !",
  "typical-response-time": "Nous répondons généralement en moins d'une minute",
  "session-closed-lead": "Votre problème a été résolu !"
}, Nl = {
  ok: "OK",
  yes: "Ja",
  no: "Nee",
  agree: "Akkoord",
  cancel: "Annuleren",
  "yes-exit": "Ja, afsluiten",
  "yes-reset": "Ja, resetten",
  "no-cancel": "Nee, annuleren",
  "are-you-sure": "Weet u het zeker?",
  recording: "Opname...",
  "thank-you": "Dank u",
  "sorry-try-again": "Sorry, probeer het opnieuw",
  "error-occurred": "Er is een fout opgetreden",
  "please-try-again": "Probeer het opnieuw",
  "write-a-message": "Schrijf een bericht...",
  "send-message": "Bericht verzenden",
  connected: "Verbonden",
  connecting: "Verbinding maken",
  reconnecting: "Opnieuw verbinding maken",
  reconnected: "Opnieuw verbonden",
  disconnecting: "Verbinding verbreken",
  disconnected: "Verbinding verbroken",
  error: "Fout",
  "persist-session": "Sessie behouden",
  settings: "Instellingen",
  close: "Sluiten",
  help: "Help",
  chat: "Chat",
  send: "Verzenden",
  copy: "Kopiëren",
  copied: "Gekopieerd",
  "sound-effects": "Geluidseffecten",
  language: "Taal",
  select: "Selecteren",
  agent: "Agent",
  user: "Gebruiker",
  bot: "Bot",
  "reset-conversation-confirm": "Weet u zeker dat u het gesprek wilt resetten?",
  "close-widget": "Widget sluiten",
  "got-any-questions": "Heeft u vragen? Chat met ons!",
  "typical-response-time": "We reageren doorgaans binnen 1 minuut",
  "session-closed-lead": "Your issue has been resolved!"
}, Pl = {
  ok: "OK",
  yes: "Sim",
  no: "Não",
  agree: "Concordo",
  cancel: "Cancelar",
  "yes-exit": "Sim, sair",
  "yes-reset": "Sim, redefinir",
  "no-cancel": "Não, cancelar",
  "are-you-sure": "Você tem certeza?",
  recording: "Gravando...",
  "thank-you": "Obrigado",
  "sorry-try-again": "Desculpe, tente novamente",
  "error-occurred": "Ocorreu um erro",
  "please-try-again": "Por favor, tente novamente",
  "write-a-message": "Escreva uma mensagem...",
  "send-message": "Enviar mensagem",
  connected: "Conectado",
  connecting: "Conectando",
  reconnecting: "Reconectando",
  reconnected: "Reconectado",
  disconnecting: "Desconectando",
  disconnected: "Desconectado",
  error: "Erro",
  "persist-session": "Persistir sessão",
  settings: "Configurações",
  close: "Fechar",
  help: "Ajuda",
  chat: "Bate-papo",
  send: "Enviar",
  copy: "Copiar",
  copied: "Copiado",
  "sound-effects": "Efeitos sonoros",
  language: "Idioma",
  select: "Selecionar",
  agent: "Agente",
  user: "Usuário",
  bot: "Bot",
  "reset-conversation-confirm": "Você tem certeza de que deseja redefinir a conversa?",
  "close-widget": "Fechar widget",
  "got-any-questions": "Tem alguma dúvida? Converse conosco!",
  "typical-response-time": "Geralmente respondemos em menos de 1 minuto",
  "session-closed-lead": "Seu problema foi resolvido!"
}, Dl = {
  en: Il,
  ar: Tl,
  nl: Nl,
  fr: Ll,
  de: Rl,
  pt: Pl
};
function Fl(e, t) {
  const n = Dl[t];
  return n && n[e] || "";
}
const [zl, Bl] = ei();
function Ml({ children: e }) {
  const t = ti();
  return /* @__PURE__ */ ue(
    Bl,
    {
      value: {
        get: (n, r) => Fl(n, t.language ?? "en") + (r ?? ""),
        lang: t.language
      },
      children: e
    }
  );
}
const [ti, jl] = ei(), Ul = "en";
function rx({
  children: e,
  data: t
}) {
  const n = Jt(() => ({
    ...t,
    language: t.language ?? Ul
  }), [t]);
  return /* @__PURE__ */ ue(jl, { value: n, children: /* @__PURE__ */ ue(Ml, { children: e }) });
}
function Fi(e, t) {
  const n = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; )
    r++, i = n.indexOf(t, i + t.length);
  return r;
}
const ke = ct(/[A-Za-z]/), we = ct(/[\dA-Za-z]/), ql = ct(/[#-'*+\--9=?A-Z^-~]/);
function Cn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Er = ct(/\d/), Vl = ct(/[\dA-Fa-f]/), Hl = ct(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function te(e) {
  return e !== null && (e < 0 || e === 32);
}
function W(e) {
  return e === -2 || e === -1 || e === 32;
}
const Pn = ct(new RegExp("\\p{P}|\\p{S}", "u")), bt = ct(/\s/);
function ct(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Gl(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
const Dn = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return Kl;
    if (typeof e == "function")
      return Fn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Wl(e) : Yl(e);
    if (typeof e == "string")
      return Xl(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Wl(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Dn(e[n]);
  return Fn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function Yl(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Fn(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function Xl(e) {
  return Fn(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Fn(e) {
  return t;
  function t(n, r, i) {
    return !!(Ql(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Kl() {
  return !0;
}
function Ql(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const hs = [], Jl = !0, vr = !1, Zl = "skip";
function ps(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = Dn(i), s = r ? -1 : 1;
  a(e, void 0, [])();
  function a(l, u, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof c.type == "string") {
      const h = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (l.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let h = hs, p, y, w;
      if ((!t || o(l, u, f[f.length - 1] || void 0)) && (h = $l(n(l, f)), h[0] === vr))
        return h;
      if ("children" in l && l.children) {
        const m = (
          /** @type {UnistParent} */
          l
        );
        if (m.children && h[0] !== Zl)
          for (y = (r ? m.children.length : -1) + s, w = f.concat(m); y > -1 && y < m.children.length; ) {
            const v = m.children[y];
            if (p = a(v, y, w)(), p[0] === vr)
              return p;
            y = typeof p[1] == "number" ? p[1] : y + s;
          }
      }
      return h;
    }
  }
}
function $l(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Jl, e] : e == null ? hs : [e];
}
function eu(e, t, n) {
  const i = Dn((n || {}).ignore || []), o = tu(t);
  let s = -1;
  for (; ++s < o.length; )
    ps(e, "text", a);
  function a(u, f) {
    let c = -1, d;
    for (; ++c < f.length; ) {
      const h = f[c], p = d ? d.children : void 0;
      if (i(
        h,
        p ? p.indexOf(h) : void 0,
        d
      ))
        return;
      d = h;
    }
    if (d)
      return l(u, f);
  }
  function l(u, f) {
    const c = f[f.length - 1], d = o[s][0], h = o[s][1];
    let p = 0;
    const w = c.children.indexOf(u);
    let m = !1, v = [];
    d.lastIndex = 0;
    let S = d.exec(u.value);
    for (; S; ) {
      const O = S.index, _ = {
        index: S.index,
        input: S.input,
        stack: [...f, u]
      };
      let x = h(...S, _);
      if (typeof x == "string" && (x = x.length > 0 ? { type: "text", value: x } : void 0), x === !1 ? d.lastIndex = O + 1 : (p !== O && v.push({
        type: "text",
        value: u.value.slice(p, O)
      }), Array.isArray(x) ? v.push(...x) : x && v.push(x), p = O + S[0].length, m = !0), !d.global)
        break;
      S = d.exec(u.value);
    }
    return m ? (p < u.value.length && v.push({ type: "text", value: u.value.slice(p) }), c.children.splice(w, 1, ...v)) : v = [u], w + v.length;
  }
}
function tu(e) {
  const t = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([nu(i[0]), ru(i[1])]);
  }
  return t;
}
function nu(e) {
  return typeof e == "string" ? new RegExp(Gl(e), "g") : e;
}
function ru(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Yn = "phrasing", Xn = ["autolink", "link", "image", "label"];
function iu() {
  return {
    transforms: [fu],
    enter: {
      literalAutolink: su,
      literalAutolinkEmail: Kn,
      literalAutolinkHttp: Kn,
      literalAutolinkWww: Kn
    },
    exit: {
      literalAutolink: cu,
      literalAutolinkEmail: uu,
      literalAutolinkHttp: au,
      literalAutolinkWww: lu
    }
  };
}
function ou() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Yn,
        notInConstruct: Xn
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Yn,
        notInConstruct: Xn
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Yn,
        notInConstruct: Xn
      }
    ]
  };
}
function su(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Kn(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function au(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function lu(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e);
}
function uu(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function cu(e) {
  this.exit(e);
}
function fu(e) {
  eu(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, hu],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), pu]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function hu(e, t, n, r, i) {
  let o = "";
  if (!ds(i) || (/^w/i.test(t) && (n = t + n, t = "", o = "http://"), !du(n)))
    return !1;
  const s = mu(n + r);
  if (!s[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + t + s[0],
    children: [{ type: "text", value: t + s[0] }]
  };
  return s[1] ? [a, { type: "text", value: s[1] }] : a;
}
function pu(e, t, n, r) {
  return (
    // Not an expected previous character.
    !ds(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(n) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + t + "@" + n,
      children: [{ type: "text", value: t + "@" + n }]
    }
  );
}
function du(e) {
  const t = e.split(".");
  return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function mu(e) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!t)
    return [e, void 0];
  e = e.slice(0, t.index);
  let n = t[0], r = n.indexOf(")");
  const i = Fi(e, "(");
  let o = Fi(e, ")");
  for (; r !== -1 && i > o; )
    e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), o++;
  return [e, n];
}
function ds(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || bt(n) || Pn(n)) && // If it’s an email, the previous character should not be a slash.
  (!t || n !== 47);
}
function Ge(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
ms.peek = Au;
function gu() {
  return {
    enter: {
      gfmFootnoteDefinition: bu,
      gfmFootnoteDefinitionLabelString: wu,
      gfmFootnoteCall: Su,
      gfmFootnoteCallString: Eu
    },
    exit: {
      gfmFootnoteDefinition: ku,
      gfmFootnoteDefinitionLabelString: xu,
      gfmFootnoteCall: Cu,
      gfmFootnoteCallString: vu
    }
  };
}
function yu() {
  return {
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["phrasing", "label", "reference"] }],
    handlers: { footnoteDefinition: _u, footnoteReference: ms }
  };
}
function bu(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function wu() {
  this.buffer();
}
function xu(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.label = t, n.identifier = Ge(
    this.sliceSerialize(e)
  ).toLowerCase();
}
function ku(e) {
  this.exit(e);
}
function Su(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Eu() {
  this.buffer();
}
function vu(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.label = t, n.identifier = Ge(
    this.sliceSerialize(e)
  ).toLowerCase();
}
function Cu(e) {
  this.exit(e);
}
function ms(e, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const s = n.enter("footnoteReference"), a = n.enter("reference");
  return o += i.move(
    n.safe(n.associationId(e), {
      ...i.current(),
      before: o,
      after: "]"
    })
  ), a(), s(), o += i.move("]"), o;
}
function Au() {
  return "[";
}
function _u(e, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const s = n.enter("footnoteDefinition"), a = n.enter("label");
  return o += i.move(
    n.safe(n.associationId(e), {
      ...i.current(),
      before: o,
      after: "]"
    })
  ), a(), o += i.move(
    "]:" + (e.children && e.children.length > 0 ? " " : "")
  ), i.shift(4), o += i.move(
    n.indentLines(n.containerFlow(e, i.current()), Ou)
  ), s(), o;
}
function Ou(e, t, n) {
  return t === 0 ? e : (n ? "" : "    ") + e;
}
const Tu = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
gs.peek = Pu;
function Ru() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Lu },
    exit: { strikethrough: Nu }
  };
}
function Iu() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Tu
      }
    ],
    handlers: { delete: gs }
  };
}
function Lu(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Nu(e) {
  this.exit(e);
}
function gs(e, t, n, r) {
  const i = n.createTracker(r), o = n.enter("strikethrough");
  let s = i.move("~~");
  return s += n.containerPhrasing(e, {
    ...i.current(),
    before: s,
    after: "~"
  }), s += i.move("~~"), o(), s;
}
function Pu() {
  return "~";
}
function Du(e, t = {}) {
  const n = (t.align || []).concat(), r = t.stringLength || zu, i = [], o = [], s = [], a = [];
  let l = 0, u = -1;
  for (; ++u < e.length; ) {
    const p = [], y = [];
    let w = -1;
    for (e[u].length > l && (l = e[u].length); ++w < e[u].length; ) {
      const m = Fu(e[u][w]);
      if (t.alignDelimiters !== !1) {
        const v = r(m);
        y[w] = v, (a[w] === void 0 || v > a[w]) && (a[w] = v);
      }
      p.push(m);
    }
    o[u] = p, s[u] = y;
  }
  let f = -1;
  if (typeof n == "object" && "length" in n)
    for (; ++f < l; )
      i[f] = zi(n[f]);
  else {
    const p = zi(n);
    for (; ++f < l; )
      i[f] = p;
  }
  f = -1;
  const c = [], d = [];
  for (; ++f < l; ) {
    const p = i[f];
    let y = "", w = "";
    p === 99 ? (y = ":", w = ":") : p === 108 ? y = ":" : p === 114 && (w = ":");
    let m = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      a[f] - y.length - w.length
    );
    const v = y + "-".repeat(m) + w;
    t.alignDelimiters !== !1 && (m = y.length + m + w.length, m > a[f] && (a[f] = m), d[f] = m), c[f] = v;
  }
  o.splice(1, 0, c), s.splice(1, 0, d), u = -1;
  const h = [];
  for (; ++u < o.length; ) {
    const p = o[u], y = s[u];
    f = -1;
    const w = [];
    for (; ++f < l; ) {
      const m = p[f] || "";
      let v = "", S = "";
      if (t.alignDelimiters !== !1) {
        const O = a[f] - (y[f] || 0), _ = i[f];
        _ === 114 ? v = " ".repeat(O) : _ === 99 ? O % 2 ? (v = " ".repeat(O / 2 + 0.5), S = " ".repeat(O / 2 - 0.5)) : (v = " ".repeat(O / 2), S = v) : S = " ".repeat(O);
      }
      t.delimiterStart !== !1 && !f && w.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && m === "") && (t.delimiterStart !== !1 || f) && w.push(" "), t.alignDelimiters !== !1 && w.push(v), w.push(m), t.alignDelimiters !== !1 && w.push(S), t.padding !== !1 && w.push(" "), (t.delimiterEnd !== !1 || f !== l - 1) && w.push("|");
    }
    h.push(
      t.delimiterEnd === !1 ? w.join("").replace(/ +$/, "") : w.join("")
    );
  }
  return h.join(`
`);
}
function Fu(e) {
  return e == null ? "" : String(e);
}
function zu(e) {
  return e.length;
}
function zi(e) {
  const t = typeof e == "string" ? e.codePointAt(0) : 0;
  return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function Bu(e, t, n, r) {
  const i = n.enter("blockquote"), o = n.createTracker(r);
  o.move("> "), o.shift(2);
  const s = n.indentLines(
    n.containerFlow(e, o.current()),
    Mu
  );
  return i(), s;
}
function Mu(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function ju(e, t) {
  return Bi(e, t.inConstruct, !0) && !Bi(e, t.notInConstruct, !1);
}
function Bi(e, t, n) {
  if (typeof t == "string" && (t = [t]), !t || t.length === 0)
    return n;
  let r = -1;
  for (; ++r < t.length; )
    if (e.includes(t[r]))
      return !0;
  return !1;
}
function Mi(e, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; )
    if (n.unsafe[i].character === `
` && ju(n.stack, n.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Uu(e, t) {
  const n = String(e);
  let r = n.indexOf(t), i = r, o = 0, s = 0;
  if (typeof t != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > s && (s = o) : o = 1, i = r + t.length, r = n.indexOf(t, i);
  return s;
}
function qu(e, t) {
  return !!(t.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Vu(e) {
  const t = e.options.fence || "`";
  if (t !== "`" && t !== "~")
    throw new Error(
      "Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return t;
}
function Hu(e, t, n, r) {
  const i = Vu(n), o = e.value || "", s = i === "`" ? "GraveAccent" : "Tilde";
  if (qu(e, n)) {
    const c = n.enter("codeIndented"), d = n.indentLines(o, Gu);
    return c(), d;
  }
  const a = n.createTracker(r), l = i.repeat(Math.max(Uu(o, i) + 1, 3)), u = n.enter("codeFenced");
  let f = a.move(l);
  if (e.lang) {
    const c = n.enter(`codeFencedLang${s}`);
    f += a.move(
      n.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = n.enter(`codeFencedMeta${s}`);
    f += a.move(" "), f += a.move(
      n.safe(e.meta, {
        before: f,
        after: `
`,
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  return f += a.move(`
`), o && (f += a.move(o + `
`)), f += a.move(l), u(), f;
}
function Gu(e, t, n) {
  return (n ? "" : "    ") + e;
}
function ni(e) {
  const t = e.options.quote || '"';
  if (t !== '"' && t !== "'")
    throw new Error(
      "Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`"
    );
  return t;
}
function Wu(e, t, n, r) {
  const i = ni(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.enter("definition");
  let a = n.enter("label");
  const l = n.createTracker(r);
  let u = l.move("[");
  return u += l.move(
    n.safe(n.associationId(e), {
      before: u,
      after: "]",
      ...l.current()
    })
  ), u += l.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), u += l.move("<"), u += l.move(
    n.safe(e.url, { before: u, after: ">", ...l.current() })
  ), u += l.move(">")) : (a = n.enter("destinationRaw"), u += l.move(
    n.safe(e.url, {
      before: u,
      after: e.title ? " " : `
`,
      ...l.current()
    })
  )), a(), e.title && (a = n.enter(`title${o}`), u += l.move(" " + i), u += l.move(
    n.safe(e.title, {
      before: u,
      after: i,
      ...l.current()
    })
  ), u += l.move(i), a()), s(), u;
}
function Yu(e) {
  const t = e.options.emphasis || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return t;
}
ys.peek = Xu;
function ys(e, t, n, r) {
  const i = Yu(n), o = n.enter("emphasis"), s = n.createTracker(r);
  let a = s.move(i);
  return a += s.move(
    n.containerPhrasing(e, {
      before: a,
      after: i,
      ...s.current()
    })
  ), a += s.move(i), o(), a;
}
function Xu(e, t, n) {
  return n.options.emphasis || "*";
}
function ri(e, t, n, r) {
  let i, o, s;
  typeof t == "function" && typeof n != "function" ? (o = void 0, s = t, i = n) : (o = t, s = n, i = r), ps(e, o, a, i);
  function a(l, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(l) : void 0;
    return s(l, c, f);
  }
}
const Ku = {};
function ii(e, t) {
  const n = Ku, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return bs(e, r, i);
}
function bs(e, t, n) {
  if (Qu(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return ji(e.children, t, n);
  }
  return Array.isArray(e) ? ji(e, t, n) : "";
}
function ji(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = bs(e[i], t, n);
  return r.join("");
}
function Qu(e) {
  return !!(e && typeof e == "object");
}
function Ju(e, t) {
  let n = !1;
  return ri(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return n = !0, vr;
  }), !!((!e.depth || e.depth < 3) && ii(e) && (t.options.setext || n));
}
function Zu(e, t, n, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = n.createTracker(r);
  if (Ju(e, n)) {
    const f = n.enter("headingSetext"), c = n.enter("phrasing"), d = n.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), d + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      d.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(d.lastIndexOf("\r"), d.lastIndexOf(`
`)) + 1)
    );
  }
  const s = "#".repeat(i), a = n.enter("headingAtx"), l = n.enter("phrasing");
  o.move(s + " ");
  let u = n.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(u) && (u = "&#x" + u.charCodeAt(0).toString(16).toUpperCase() + ";" + u.slice(1)), u = u ? s + " " + u : s, n.options.closeAtx && (u += " " + s), l(), a(), u;
}
ws.peek = $u;
function ws(e) {
  return e.value || "";
}
function $u() {
  return "<";
}
xs.peek = ec;
function xs(e, t, n, r) {
  const i = ni(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.enter("image");
  let a = n.enter("label");
  const l = n.createTracker(r);
  let u = l.move("![");
  return u += l.move(
    n.safe(e.alt, { before: u, after: "]", ...l.current() })
  ), u += l.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), u += l.move("<"), u += l.move(
    n.safe(e.url, { before: u, after: ">", ...l.current() })
  ), u += l.move(">")) : (a = n.enter("destinationRaw"), u += l.move(
    n.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...l.current()
    })
  )), a(), e.title && (a = n.enter(`title${o}`), u += l.move(" " + i), u += l.move(
    n.safe(e.title, {
      before: u,
      after: i,
      ...l.current()
    })
  ), u += l.move(i), a()), u += l.move(")"), s(), u;
}
function ec() {
  return "!";
}
ks.peek = tc;
function ks(e, t, n, r) {
  const i = e.referenceType, o = n.enter("imageReference");
  let s = n.enter("label");
  const a = n.createTracker(r);
  let l = a.move("![");
  const u = n.safe(e.alt, {
    before: l,
    after: "]",
    ...a.current()
  });
  l += a.move(u + "]["), s();
  const f = n.stack;
  n.stack = [], s = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: l,
    after: "]",
    ...a.current()
  });
  return s(), n.stack = f, o(), i === "full" || !u || u !== c ? l += a.move(c + "]") : i === "shortcut" ? l = l.slice(0, -1) : l += a.move("]"), l;
}
function tc() {
  return "!";
}
Ss.peek = nc;
function Ss(e, t, n) {
  let r = e.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < n.unsafe.length; ) {
    const s = n.unsafe[o], a = n.compilePattern(s);
    let l;
    if (s.atBreak)
      for (; l = a.exec(r); ) {
        let u = l.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(l.index + 1);
      }
  }
  return i + r + i;
}
function nc() {
  return "`";
}
function Es(e, t) {
  const n = ii(e);
  return !!(!t.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (n === e.url || "mailto:" + n === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
vs.peek = rc;
function vs(e, t, n, r) {
  const i = ni(n), o = i === '"' ? "Quote" : "Apostrophe", s = n.createTracker(r);
  let a, l;
  if (Es(e, n)) {
    const f = n.stack;
    n.stack = [], a = n.enter("autolink");
    let c = s.move("<");
    return c += s.move(
      n.containerPhrasing(e, {
        before: c,
        after: ">",
        ...s.current()
      })
    ), c += s.move(">"), a(), n.stack = f, c;
  }
  a = n.enter("link"), l = n.enter("label");
  let u = s.move("[");
  return u += s.move(
    n.containerPhrasing(e, {
      before: u,
      after: "](",
      ...s.current()
    })
  ), u += s.move("]("), l(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (l = n.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    n.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (l = n.enter("destinationRaw"), u += s.move(
    n.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), l(), e.title && (l = n.enter(`title${o}`), u += s.move(" " + i), u += s.move(
    n.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), l()), u += s.move(")"), a(), u;
}
function rc(e, t, n) {
  return Es(e, n) ? "<" : "[";
}
Cs.peek = ic;
function Cs(e, t, n, r) {
  const i = e.referenceType, o = n.enter("linkReference");
  let s = n.enter("label");
  const a = n.createTracker(r);
  let l = a.move("[");
  const u = n.containerPhrasing(e, {
    before: l,
    after: "]",
    ...a.current()
  });
  l += a.move(u + "]["), s();
  const f = n.stack;
  n.stack = [], s = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: l,
    after: "]",
    ...a.current()
  });
  return s(), n.stack = f, o(), i === "full" || !u || u !== c ? l += a.move(c + "]") : i === "shortcut" ? l = l.slice(0, -1) : l += a.move("]"), l;
}
function ic() {
  return "[";
}
function oi(e) {
  const t = e.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return t;
}
function oc(e) {
  const t = oi(e), n = e.options.bulletOther;
  if (!n)
    return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (n === t)
    throw new Error(
      "Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different"
    );
  return n;
}
function sc(e) {
  const t = e.options.bulletOrdered || ".";
  if (t !== "." && t !== ")")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return t;
}
function As(e) {
  const t = e.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_")
    throw new Error(
      "Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return t;
}
function ac(e, t, n, r) {
  const i = n.enter("list"), o = n.bulletCurrent;
  let s = e.ordered ? sc(n) : oi(n);
  const a = e.ordered ? s === "." ? ")" : "." : oc(n);
  let l = t && n.bulletLastUsed ? s === n.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (s === "*" || s === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && // That are each the first child.
      n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (l = !0), As(n) === s && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const d = e.children[c];
        if (d && d.type === "listItem" && d.children && d.children[0] && d.children[0].type === "thematicBreak") {
          l = !0;
          break;
        }
      }
    }
  }
  l && (s = a), n.bulletCurrent = s;
  const u = n.containerFlow(e, r);
  return n.bulletLastUsed = s, n.bulletCurrent = o, i(), u;
}
function lc(e) {
  const t = e.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return t;
}
function uc(e, t, n, r) {
  const i = lc(n);
  let o = n.bulletCurrent || oi(n);
  t && t.type === "list" && t.ordered && (o = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + o);
  let s = o.length + 1;
  (i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (s = Math.ceil(s / 4) * 4);
  const a = n.createTracker(r);
  a.move(o + " ".repeat(s - o.length)), a.shift(s);
  const l = n.enter("listItem"), u = n.indentLines(
    n.containerFlow(e, a.current()),
    f
  );
  return l(), u;
  function f(c, d, h) {
    return d ? (h ? "" : " ".repeat(s)) + c : (h ? o : o + " ".repeat(s - o.length)) + c;
  }
}
function cc(e, t, n, r) {
  const i = n.enter("paragraph"), o = n.enter("phrasing"), s = n.containerPhrasing(e, r);
  return o(), i(), s;
}
const fc = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Dn([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function hc(e, t, n, r) {
  return (e.children.some(function(s) {
    return fc(s);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
function pc(e) {
  const t = e.options.strong || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`"
    );
  return t;
}
_s.peek = dc;
function _s(e, t, n, r) {
  const i = pc(n), o = n.enter("strong"), s = n.createTracker(r);
  let a = s.move(i + i);
  return a += s.move(
    n.containerPhrasing(e, {
      before: a,
      after: i,
      ...s.current()
    })
  ), a += s.move(i + i), o(), a;
}
function dc(e, t, n) {
  return n.options.strong || "*";
}
function mc(e, t, n, r) {
  return n.safe(e.value, r);
}
function gc(e) {
  const t = e.options.ruleRepetition || 3;
  if (t < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return t;
}
function yc(e, t, n) {
  const r = (As(n) + (n.options.ruleSpaces ? " " : "")).repeat(gc(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Os = {
  blockquote: Bu,
  break: Mi,
  code: Hu,
  definition: Wu,
  emphasis: ys,
  hardBreak: Mi,
  heading: Zu,
  html: ws,
  image: xs,
  imageReference: ks,
  inlineCode: Ss,
  link: vs,
  linkReference: Cs,
  list: ac,
  listItem: uc,
  paragraph: cc,
  root: hc,
  strong: _s,
  text: mc,
  thematicBreak: yc
}, Ui = document.createElement("i");
function si(e) {
  const t = "&" + e + ";";
  Ui.innerHTML = t;
  const n = Ui.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
function Ts(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
const bc = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function wc(e) {
  return e.replace(bc, xc);
}
function xc(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Ts(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return si(n) || e;
}
function kc() {
  return {
    enter: {
      table: Sc,
      tableData: qi,
      tableHeader: qi,
      tableRow: vc
    },
    exit: {
      codeText: Cc,
      table: Ec,
      tableData: Qn,
      tableHeader: Qn,
      tableRow: Qn
    }
  };
}
function Sc(e) {
  const t = e._align;
  this.enter(
    {
      type: "table",
      align: t.map(function(n) {
        return n === "none" ? null : n;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function Ec(e) {
  this.exit(e), this.data.inTable = void 0;
}
function vc(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function Qn(e) {
  this.exit(e);
}
function qi(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function Cc(e) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, Ac));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e);
}
function Ac(e, t) {
  return t === "|" ? t : e;
}
function _c(e) {
  const t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, o = n ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: d,
      table: s,
      tableCell: l,
      tableRow: a
    }
  };
  function s(h, p, y, w) {
    return u(f(h, y, w), h.align);
  }
  function a(h, p, y, w) {
    const m = c(h, y, w), v = u([m]);
    return v.slice(0, v.indexOf(`
`));
  }
  function l(h, p, y, w) {
    const m = y.enter("tableCell"), v = y.enter("phrasing"), S = y.containerPhrasing(h, {
      ...w,
      before: o,
      after: o
    });
    return v(), m(), S;
  }
  function u(h, p) {
    return Du(h, {
      align: p,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: n,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(h, p, y) {
    const w = h.children;
    let m = -1;
    const v = [], S = p.enter("table");
    for (; ++m < w.length; )
      v[m] = c(w[m], p, y);
    return S(), v;
  }
  function c(h, p, y) {
    const w = h.children;
    let m = -1;
    const v = [], S = p.enter("tableRow");
    for (; ++m < w.length; )
      v[m] = l(w[m], h, p, y);
    return S(), v;
  }
  function d(h, p, y) {
    let w = Os.inlineCode(h, p, y);
    return y.stack.includes("tableCell") && (w = w.replace(/\|/g, "\\$&")), w;
  }
}
function Oc() {
  return {
    exit: {
      taskListCheckValueChecked: Vi,
      taskListCheckValueUnchecked: Vi,
      paragraph: Rc
    }
  };
}
function Tc() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Ic }
  };
}
function Vi(e) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function Rc(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = t.children;
      let o = -1, s;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          s = a;
          break;
        }
      }
      s === n && (r.value = r.value.slice(1), r.value.length === 0 ? n.children.shift() : n.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, n.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function Ic(e, t, n, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", s = "[" + (e.checked ? "x" : " ") + "] ", a = n.createTracker(r);
  o && a.move(s);
  let l = Os.listItem(e, t, n, {
    ...r,
    ...a.current()
  });
  return o && (l = l.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), l;
  function u(f) {
    return f + s;
  }
}
function Lc() {
  return [
    iu(),
    gu(),
    Ru(),
    kc(),
    Oc()
  ];
}
function Nc(e) {
  return {
    extensions: [
      ou(),
      yu(),
      Iu(),
      _c(e),
      Tc()
    ]
  };
}
function Me(e, t, n, r) {
  const i = e.length;
  let o = 0, s;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    s = Array.from(r), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); o < r.length; )
      s = r.slice(o, o + 1e4), s.unshift(t, 0), e.splice(...s), o += 1e4, t += 1e4;
}
function Fe(e, t) {
  return e.length > 0 ? (Me(e, e.length, 0, t), e) : t;
}
const Hi = {}.hasOwnProperty;
function Rs(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Pc(t, e[n]);
  return t;
}
function Pc(e, t) {
  let n;
  for (n in t) {
    const i = (Hi.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let s;
    if (o)
      for (s in o) {
        Hi.call(i, s) || (i[s] = []);
        const a = o[s];
        Dc(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Dc(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Me(e, 0, 0, r);
}
const Fc = {
  tokenize: qc,
  partial: !0
}, Is = {
  tokenize: Vc,
  partial: !0
}, Ls = {
  tokenize: Hc,
  partial: !0
}, Ns = {
  tokenize: Gc,
  partial: !0
}, zc = {
  tokenize: Wc,
  partial: !0
}, Ps = {
  name: "wwwAutolink",
  tokenize: jc,
  previous: Fs
}, Ds = {
  name: "protocolAutolink",
  tokenize: Uc,
  previous: zs
}, nt = {
  name: "emailAutolink",
  tokenize: Mc,
  previous: Bs
}, Qe = {};
function Bc() {
  return {
    text: Qe
  };
}
let dt = 48;
for (; dt < 123; )
  Qe[dt] = nt, dt++, dt === 58 ? dt = 65 : dt === 91 && (dt = 97);
Qe[43] = nt;
Qe[45] = nt;
Qe[46] = nt;
Qe[95] = nt;
Qe[72] = [nt, Ds];
Qe[104] = [nt, Ds];
Qe[87] = [nt, Ps];
Qe[119] = [nt, Ps];
function Mc(e, t, n) {
  const r = this;
  let i, o;
  return s;
  function s(c) {
    return !Cr(c) || !Bs.call(r, r.previous) || ai(r.events) ? n(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return Cr(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), l) : n(c);
  }
  function l(c) {
    return c === 46 ? e.check(zc, f, u)(c) : c === 45 || c === 95 || we(c) ? (o = !0, e.consume(c), l) : f(c);
  }
  function u(c) {
    return e.consume(c), i = !0, l;
  }
  function f(c) {
    return o && i && ke(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(c)) : n(c);
  }
}
function jc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s !== 87 && s !== 119 || !Fs.call(r, r.previous) || ai(r.events) ? n(s) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Fc, e.attempt(Is, e.attempt(Ls, o), n), n)(s));
  }
  function o(s) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(s);
  }
}
function Uc(e, t, n) {
  const r = this;
  let i = "", o = !1;
  return s;
  function s(c) {
    return (c === 72 || c === 104) && zs.call(r, r.previous) && !ai(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), a) : n(c);
  }
  function a(c) {
    if (ke(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const d = i.toLowerCase();
      if (d === "http" || d === "https")
        return e.consume(c), l;
    }
    return n(c);
  }
  function l(c) {
    return c === 47 ? (e.consume(c), o ? u : (o = !0, l)) : n(c);
  }
  function u(c) {
    return c === null || Cn(c) || te(c) || bt(c) || Pn(c) ? n(c) : e.attempt(Is, e.attempt(Ls, f), n)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(c);
  }
}
function qc(e, t, n) {
  let r = 0;
  return i;
  function i(s) {
    return (s === 87 || s === 119) && r < 3 ? (r++, e.consume(s), i) : s === 46 && r === 3 ? (e.consume(s), o) : n(s);
  }
  function o(s) {
    return s === null ? n(s) : t(s);
  }
}
function Vc(e, t, n) {
  let r, i, o;
  return s;
  function s(u) {
    return u === 46 || u === 95 ? e.check(Ns, l, a)(u) : u === null || te(u) || bt(u) || u !== 45 && Pn(u) ? l(u) : (o = !0, e.consume(u), s);
  }
  function a(u) {
    return u === 95 ? r = !0 : (i = r, r = void 0), e.consume(u), s;
  }
  function l(u) {
    return i || r || !o ? n(u) : t(u);
  }
}
function Hc(e, t) {
  let n = 0, r = 0;
  return i;
  function i(s) {
    return s === 40 ? (n++, e.consume(s), i) : s === 41 && r < n ? o(s) : s === 33 || s === 34 || s === 38 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 60 || s === 63 || s === 93 || s === 95 || s === 126 ? e.check(Ns, t, o)(s) : s === null || te(s) || bt(s) ? t(s) : (e.consume(s), i);
  }
  function o(s) {
    return s === 41 && r++, e.consume(s), i;
  }
}
function Gc(e, t, n) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || te(a) || bt(a) ? t(a) : n(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || te(a) || bt(a) ? t(a) : r(a);
  }
  function o(a) {
    return ke(a) ? s(a) : n(a);
  }
  function s(a) {
    return a === 59 ? (e.consume(a), r) : ke(a) ? (e.consume(a), s) : n(a);
  }
}
function Wc(e, t, n) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return we(o) ? n(o) : t(o);
  }
}
function Fs(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || te(e);
}
function zs(e) {
  return !ke(e);
}
function Bs(e) {
  return !(e === 47 || Cr(e));
}
function Cr(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || we(e);
}
function ai(e) {
  let t = e.length, n = !1;
  for (; t--; ) {
    const r = e[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
function Tt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const o = e.charCodeAt(n);
    let s = "";
    if (o === 37 && we(e.charCodeAt(n + 1)) && we(e.charCodeAt(n + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (s = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344 ? (s = String.fromCharCode(o, a), i = 1) : s = "�";
    } else
      s = String.fromCharCode(o);
    s && (t.push(e.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function An(e) {
  if (e === null || te(e) || bt(e))
    return 1;
  if (Pn(e))
    return 2;
}
function zn(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Ar = {
  name: "attention",
  tokenize: Xc,
  resolveAll: Yc
};
function Yc(e, t) {
  let n = -1, r, i, o, s, a, l, u, f;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          l = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const c = Object.assign({}, e[r][1].end), d = Object.assign({}, e[n][1].start);
          Gi(c, -l), Gi(d, l), s = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: Object.assign({}, e[r][1].end)
          }, a = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, e[n][1].start),
            end: d
          }, o = {
            type: l > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, e[r][1].end),
            end: Object.assign({}, e[n][1].start)
          }, i = {
            type: l > 1 ? "strong" : "emphasis",
            start: Object.assign({}, s.start),
            end: Object.assign({}, a.end)
          }, e[r][1].end = Object.assign({}, s.start), e[n][1].start = Object.assign({}, a.end), u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Fe(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Fe(u, [["enter", i, t], ["enter", s, t], ["exit", s, t], ["enter", o, t]]), u = Fe(u, zn(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Fe(u, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (f = 2, u = Fe(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : f = 0, Me(e, r - 1, n - r + 3, u), n = r + u.length - f - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Xc(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = An(r);
  let o;
  return s;
  function s(l) {
    return o = l, e.enter("attentionSequence"), a(l);
  }
  function a(l) {
    if (l === o)
      return e.consume(l), a;
    const u = e.exit("attentionSequence"), f = An(l), c = !f || f === 2 && i || n.includes(l), d = !i || i === 2 && f || n.includes(r);
    return u._open = !!(o === 42 ? c : c && (i || !d)), u._close = !!(o === 42 ? d : d && (f || !c)), t(l);
  }
}
function Gi(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Kc = {
  name: "autolink",
  tokenize: Qc
};
function Qc(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return ke(h) ? (e.consume(h), s) : h === 64 ? n(h) : u(h);
  }
  function s(h) {
    return h === 43 || h === 45 || h === 46 || we(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, l) : (h === 43 || h === 45 || h === 46 || we(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function l(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Cn(h) ? n(h) : (e.consume(h), l);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), f) : ql(h) ? (e.consume(h), u) : n(h);
  }
  function f(h) {
    return we(h) ? c(h) : n(h);
  }
  function c(h) {
    return h === 46 ? (e.consume(h), r = 0, f) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : d(h);
  }
  function d(h) {
    if ((h === 45 || we(h)) && r++ < 63) {
      const p = h === 45 ? d : c;
      return e.consume(h), p;
    }
    return n(h);
  }
}
function K(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return s;
  function s(l) {
    return W(l) ? (e.enter(n), a(l)) : t(l);
  }
  function a(l) {
    return W(l) && o++ < i ? (e.consume(l), a) : (e.exit(n), t(l));
  }
}
const Zt = {
  tokenize: Jc,
  partial: !0
};
function Jc(e, t, n) {
  return r;
  function r(o) {
    return W(o) ? K(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || z(o) ? t(o) : n(o);
  }
}
const Ms = {
  name: "blockQuote",
  tokenize: Zc,
  continuation: {
    tokenize: $c
  },
  exit: ef
};
function Zc(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(s), e.exit("blockQuoteMarker"), o;
    }
    return n(s);
  }
  function o(s) {
    return W(s) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(s), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(s));
  }
}
function $c(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return W(s) ? K(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s) : o(s);
  }
  function o(s) {
    return e.attempt(Ms, t, n)(s);
  }
}
function ef(e) {
  e.exit("blockQuote");
}
const js = {
  name: "characterEscape",
  tokenize: tf
};
function tf(e, t, n) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return Hl(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
}
const Us = {
  name: "characterReference",
  tokenize: nf
};
function nf(e, t, n) {
  const r = this;
  let i = 0, o, s;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), l;
  }
  function l(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, s = we, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, s = Vl, f) : (e.enter("characterReferenceValue"), o = 7, s = Er, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const d = e.exit("characterReferenceValue");
      return s === we && !si(r.sliceSerialize(d)) ? n(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return s(c) && i++ < o ? (e.consume(c), f) : n(c);
  }
}
const Wi = {
  tokenize: of,
  partial: !0
}, Yi = {
  name: "codeFenced",
  tokenize: rf,
  concrete: !0
};
function rf(e, t, n) {
  const r = this, i = {
    tokenize: _,
    partial: !0
  };
  let o = 0, s = 0, a;
  return l;
  function l(x) {
    return u(x);
  }
  function u(x) {
    const P = r.events[r.events.length - 1];
    return o = P && P[1].type === "linePrefix" ? P[2].sliceSerialize(P[1], !0).length : 0, a = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(x);
  }
  function f(x) {
    return x === a ? (s++, e.consume(x), f) : s < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), W(x) ? K(e, c, "whitespace")(x) : c(x));
  }
  function c(x) {
    return x === null || z(x) ? (e.exit("codeFencedFence"), r.interrupt ? t(x) : e.check(Wi, y, O)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), d(x));
  }
  function d(x) {
    return x === null || z(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(x)) : W(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), K(e, h, "whitespace")(x)) : x === 96 && x === a ? n(x) : (e.consume(x), d);
  }
  function h(x) {
    return x === null || z(x) ? c(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), p(x));
  }
  function p(x) {
    return x === null || z(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(x)) : x === 96 && x === a ? n(x) : (e.consume(x), p);
  }
  function y(x) {
    return e.attempt(i, O, w)(x);
  }
  function w(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), m;
  }
  function m(x) {
    return o > 0 && W(x) ? K(e, v, "linePrefix", o + 1)(x) : v(x);
  }
  function v(x) {
    return x === null || z(x) ? e.check(Wi, y, O)(x) : (e.enter("codeFlowValue"), S(x));
  }
  function S(x) {
    return x === null || z(x) ? (e.exit("codeFlowValue"), v(x)) : (e.consume(x), S);
  }
  function O(x) {
    return e.exit("codeFenced"), t(x);
  }
  function _(x, P, N) {
    let F = 0;
    return k;
    function k(q) {
      return x.enter("lineEnding"), x.consume(q), x.exit("lineEnding"), L;
    }
    function L(q) {
      return x.enter("codeFencedFence"), W(q) ? K(x, R, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(q) : R(q);
    }
    function R(q) {
      return q === a ? (x.enter("codeFencedFenceSequence"), M(q)) : N(q);
    }
    function M(q) {
      return q === a ? (F++, x.consume(q), M) : F >= s ? (x.exit("codeFencedFenceSequence"), W(q) ? K(x, G, "whitespace")(q) : G(q)) : N(q);
    }
    function G(q) {
      return q === null || z(q) ? (x.exit("codeFencedFence"), P(q)) : N(q);
    }
  }
}
function of(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null ? n(s) : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const Jn = {
  name: "codeIndented",
  tokenize: af
}, sf = {
  tokenize: lf,
  partial: !0
};
function af(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), K(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? s(u) : n(u);
  }
  function s(u) {
    return u === null ? l(u) : z(u) ? e.attempt(sf, s, l)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || z(u) ? (e.exit("codeFlowValue"), s(u)) : (e.consume(u), a);
  }
  function l(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function lf(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : z(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i) : K(e, o, "linePrefix", 5)(s);
  }
  function o(s) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(s) : z(s) ? i(s) : n(s);
  }
}
const uf = {
  name: "codeText",
  tokenize: hf,
  resolve: cf,
  previous: ff
};
function cf(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function ff(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function hf(e, t, n) {
  let r = 0, i, o;
  return s;
  function s(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), l(c));
  }
  function l(c) {
    return c === null ? n(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), l) : c === 96 ? (o = e.enter("codeTextSequence"), i = 0, f(c)) : z(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e.exit("codeTextData"), l(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(c)) : (o.type = "codeTextData", u(c));
  }
}
class pf {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && zt(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), zt(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), zt(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        zt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        zt(this.left, n.reverse());
      }
  }
}
function zt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function qs(e) {
  const t = {};
  let n = -1, r, i, o, s, a, l, u;
  const f = new pf(e);
  for (; ++n < f.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (l = r[1]._tokenizer.events, o = 0, o < l.length && l[o][1].type === "lineEndingBlank" && (o += 2), o < l.length && l[o][1].type === "content"))
      for (; ++o < l.length && l[o][1].type !== "content"; )
        l[o][1].type === "chunkText" && (l[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, df(f, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o-- && (s = f.get(o), s[1].type === "lineEnding" || s[1].type === "lineEndingBlank"); )
        s[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), s[1].type = "lineEnding", i = o);
      i && (r[1].end = Object.assign({}, f.get(i)[1].start), a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return Me(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function df(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const o = [], s = n._tokenizer || r.parser[n.contentType](n.start), a = s.events, l = [], u = {};
  let f, c, d = -1, h = n, p = 0, y = 0;
  const w = [y];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    o.push(i), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && s.defineSkip(h.start), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(f), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = n; ++d < a.length; )
    // Find a void token that includes a break.
    a[d][0] === "exit" && a[d - 1][0] === "enter" && a[d][1].type === a[d - 1][1].type && a[d][1].start.line !== a[d][1].end.line && (y = d + 1, w.push(y), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (s.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : w.pop(), d = w.length; d--; ) {
    const m = a.slice(w[d], w[d + 1]), v = o.pop();
    l.push([v, v + m.length - 1]), e.splice(v, 2, m);
  }
  for (l.reverse(), d = -1; ++d < l.length; )
    u[p + l[d][0]] = p + l[d][1], p += l[d][1] - l[d][0] - 1;
  return u;
}
const mf = {
  tokenize: bf,
  resolve: yf
}, gf = {
  tokenize: wf,
  partial: !0
};
function yf(e) {
  return qs(e), e;
}
function bf(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : z(a) ? e.check(gf, s, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function s(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function wf(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), K(e, o, "linePrefix");
  }
  function o(s) {
    if (s === null || z(s))
      return n(s);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(s) : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function Vs(e, t, n, r, i, o, s, a, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(m) {
    return m === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(m), e.exit(o), d) : m === null || m === 32 || m === 41 || Cn(m) ? n(m) : (e.enter(r), e.enter(s), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), y(m));
  }
  function d(m) {
    return m === 62 ? (e.enter(o), e.consume(m), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(m));
  }
  function h(m) {
    return m === 62 ? (e.exit("chunkString"), e.exit(a), d(m)) : m === null || m === 60 || z(m) ? n(m) : (e.consume(m), m === 92 ? p : h);
  }
  function p(m) {
    return m === 60 || m === 62 || m === 92 ? (e.consume(m), h) : h(m);
  }
  function y(m) {
    return !f && (m === null || m === 41 || te(m)) ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), t(m)) : f < u && m === 40 ? (e.consume(m), f++, y) : m === 41 ? (e.consume(m), f--, y) : m === null || m === 32 || m === 40 || Cn(m) ? n(m) : (e.consume(m), m === 92 ? w : y);
  }
  function w(m) {
    return m === 40 || m === 41 || m === 92 ? (e.consume(m), y) : y(m);
  }
}
function Hs(e, t, n, r, i, o) {
  const s = this;
  let a = 0, l;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), f;
  }
  function f(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in s.parser.constructs ? n(h) : h === 93 ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : z(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || z(h) || a++ > 999 ? (e.exit("chunkString"), f(h)) : (e.consume(h), l || (l = !W(h)), h === 92 ? d : c);
  }
  function d(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, c) : c(h);
  }
}
function Gs(e, t, n, r, i, o) {
  let s;
  return a;
  function a(d) {
    return d === 34 || d === 39 || d === 40 ? (e.enter(r), e.enter(i), e.consume(d), e.exit(i), s = d === 40 ? 41 : d, l) : n(d);
  }
  function l(d) {
    return d === s ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), t) : (e.enter(o), u(d));
  }
  function u(d) {
    return d === s ? (e.exit(o), l(s)) : d === null ? n(d) : z(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), K(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === s || d === null || z(d) ? (e.exit("chunkString"), u(d)) : (e.consume(d), d === 92 ? c : f);
  }
  function c(d) {
    return d === s || d === 92 ? (e.consume(d), f) : f(d);
  }
}
function Gt(e, t) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : W(i) ? K(
      e,
      r,
      n ? "linePrefix" : "lineSuffix"
    )(i) : t(i);
  }
}
const xf = {
  name: "definition",
  tokenize: Sf
}, kf = {
  tokenize: Ef,
  partial: !0
};
function Sf(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(h) {
    return e.enter("definition"), s(h);
  }
  function s(h) {
    return Hs.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function a(h) {
    return i = Ge(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), l) : n(h);
  }
  function l(h) {
    return te(h) ? Gt(e, u)(h) : u(h);
  }
  function u(h) {
    return Vs(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function f(h) {
    return e.attempt(kf, c, c)(h);
  }
  function c(h) {
    return W(h) ? K(e, d, "whitespace")(h) : d(h);
  }
  function d(h) {
    return h === null || z(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function Ef(e, t, n) {
  return r;
  function r(a) {
    return te(a) ? Gt(e, i)(a) : n(a);
  }
  function i(a) {
    return Gs(e, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return W(a) ? K(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || z(a) ? t(a) : n(a);
  }
}
const vf = {
  name: "hardBreakEscape",
  tokenize: Cf
};
function Cf(e, t, n) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return z(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const Af = {
  name: "headingAtx",
  tokenize: Of,
  resolve: _f
};
function _f(e, t) {
  let n = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, Me(e, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e;
}
function Of(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), s(f);
  }
  function s(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), s) : f === null || te(f) ? (e.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), l(f)) : f === null || z(f) ? (e.exit("atxHeading"), t(f)) : W(f) ? K(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function l(f) {
    return f === 35 ? (e.consume(f), l) : (e.exit("atxHeadingSequence"), a(f));
  }
  function u(f) {
    return f === null || f === 35 || te(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), u);
  }
}
const Tf = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Xi = ["pre", "script", "style", "textarea"], Rf = {
  name: "htmlFlow",
  tokenize: Pf,
  resolveTo: Nf,
  concrete: !0
}, If = {
  tokenize: Ff,
  partial: !0
}, Lf = {
  tokenize: Df,
  partial: !0
};
function Nf(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Pf(e, t, n) {
  const r = this;
  let i, o, s, a, l;
  return u;
  function u(g) {
    return f(g);
  }
  function f(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), d) : g === 47 ? (e.consume(g), o = !0, y) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : b) : ke(g) ? (e.consume(g), s = String.fromCharCode(g), w) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), i = 2, h) : g === 91 ? (e.consume(g), i = 5, a = 0, p) : ke(g) ? (e.consume(g), i = 4, r.interrupt ? t : b) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : b) : n(g);
  }
  function p(g) {
    const de = "CDATA[";
    return g === de.charCodeAt(a++) ? (e.consume(g), a === de.length ? r.interrupt ? t : R : p) : n(g);
  }
  function y(g) {
    return ke(g) ? (e.consume(g), s = String.fromCharCode(g), w) : n(g);
  }
  function w(g) {
    if (g === null || g === 47 || g === 62 || te(g)) {
      const de = g === 47, Se = s.toLowerCase();
      return !de && !o && Xi.includes(Se) ? (i = 1, r.interrupt ? t(g) : R(g)) : Tf.includes(s.toLowerCase()) ? (i = 6, de ? (e.consume(g), m) : r.interrupt ? t(g) : R(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : o ? v(g) : S(g));
    }
    return g === 45 || we(g) ? (e.consume(g), s += String.fromCharCode(g), w) : n(g);
  }
  function m(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : R) : n(g);
  }
  function v(g) {
    return W(g) ? (e.consume(g), v) : k(g);
  }
  function S(g) {
    return g === 47 ? (e.consume(g), k) : g === 58 || g === 95 || ke(g) ? (e.consume(g), O) : W(g) ? (e.consume(g), S) : k(g);
  }
  function O(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || we(g) ? (e.consume(g), O) : _(g);
  }
  function _(g) {
    return g === 61 ? (e.consume(g), x) : W(g) ? (e.consume(g), _) : S(g);
  }
  function x(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), l = g, P) : W(g) ? (e.consume(g), x) : N(g);
  }
  function P(g) {
    return g === l ? (e.consume(g), l = null, F) : g === null || z(g) ? n(g) : (e.consume(g), P);
  }
  function N(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || te(g) ? _(g) : (e.consume(g), N);
  }
  function F(g) {
    return g === 47 || g === 62 || W(g) ? S(g) : n(g);
  }
  function k(g) {
    return g === 62 ? (e.consume(g), L) : n(g);
  }
  function L(g) {
    return g === null || z(g) ? R(g) : W(g) ? (e.consume(g), L) : n(g);
  }
  function R(g) {
    return g === 45 && i === 2 ? (e.consume(g), J) : g === 60 && i === 1 ? (e.consume(g), re) : g === 62 && i === 4 ? (e.consume(g), D) : g === 63 && i === 3 ? (e.consume(g), b) : g === 93 && i === 5 ? (e.consume(g), ae) : z(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(If, V, M)(g)) : g === null || z(g) ? (e.exit("htmlFlowData"), M(g)) : (e.consume(g), R);
  }
  function M(g) {
    return e.check(Lf, G, V)(g);
  }
  function G(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), q;
  }
  function q(g) {
    return g === null || z(g) ? M(g) : (e.enter("htmlFlowData"), R(g));
  }
  function J(g) {
    return g === 45 ? (e.consume(g), b) : R(g);
  }
  function re(g) {
    return g === 47 ? (e.consume(g), s = "", ie) : R(g);
  }
  function ie(g) {
    if (g === 62) {
      const de = s.toLowerCase();
      return Xi.includes(de) ? (e.consume(g), D) : R(g);
    }
    return ke(g) && s.length < 8 ? (e.consume(g), s += String.fromCharCode(g), ie) : R(g);
  }
  function ae(g) {
    return g === 93 ? (e.consume(g), b) : R(g);
  }
  function b(g) {
    return g === 62 ? (e.consume(g), D) : g === 45 && i === 2 ? (e.consume(g), b) : R(g);
  }
  function D(g) {
    return g === null || z(g) ? (e.exit("htmlFlowData"), V(g)) : (e.consume(g), D);
  }
  function V(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function Df(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return z(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o) : n(s);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function Ff(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Zt, t, n);
  }
}
const zf = {
  name: "htmlText",
  tokenize: Bf
};
function Bf(e, t, n) {
  const r = this;
  let i, o, s;
  return a;
  function a(b) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(b), l;
  }
  function l(b) {
    return b === 33 ? (e.consume(b), u) : b === 47 ? (e.consume(b), _) : b === 63 ? (e.consume(b), S) : ke(b) ? (e.consume(b), N) : n(b);
  }
  function u(b) {
    return b === 45 ? (e.consume(b), f) : b === 91 ? (e.consume(b), o = 0, p) : ke(b) ? (e.consume(b), v) : n(b);
  }
  function f(b) {
    return b === 45 ? (e.consume(b), h) : n(b);
  }
  function c(b) {
    return b === null ? n(b) : b === 45 ? (e.consume(b), d) : z(b) ? (s = c, re(b)) : (e.consume(b), c);
  }
  function d(b) {
    return b === 45 ? (e.consume(b), h) : c(b);
  }
  function h(b) {
    return b === 62 ? J(b) : b === 45 ? d(b) : c(b);
  }
  function p(b) {
    const D = "CDATA[";
    return b === D.charCodeAt(o++) ? (e.consume(b), o === D.length ? y : p) : n(b);
  }
  function y(b) {
    return b === null ? n(b) : b === 93 ? (e.consume(b), w) : z(b) ? (s = y, re(b)) : (e.consume(b), y);
  }
  function w(b) {
    return b === 93 ? (e.consume(b), m) : y(b);
  }
  function m(b) {
    return b === 62 ? J(b) : b === 93 ? (e.consume(b), m) : y(b);
  }
  function v(b) {
    return b === null || b === 62 ? J(b) : z(b) ? (s = v, re(b)) : (e.consume(b), v);
  }
  function S(b) {
    return b === null ? n(b) : b === 63 ? (e.consume(b), O) : z(b) ? (s = S, re(b)) : (e.consume(b), S);
  }
  function O(b) {
    return b === 62 ? J(b) : S(b);
  }
  function _(b) {
    return ke(b) ? (e.consume(b), x) : n(b);
  }
  function x(b) {
    return b === 45 || we(b) ? (e.consume(b), x) : P(b);
  }
  function P(b) {
    return z(b) ? (s = P, re(b)) : W(b) ? (e.consume(b), P) : J(b);
  }
  function N(b) {
    return b === 45 || we(b) ? (e.consume(b), N) : b === 47 || b === 62 || te(b) ? F(b) : n(b);
  }
  function F(b) {
    return b === 47 ? (e.consume(b), J) : b === 58 || b === 95 || ke(b) ? (e.consume(b), k) : z(b) ? (s = F, re(b)) : W(b) ? (e.consume(b), F) : J(b);
  }
  function k(b) {
    return b === 45 || b === 46 || b === 58 || b === 95 || we(b) ? (e.consume(b), k) : L(b);
  }
  function L(b) {
    return b === 61 ? (e.consume(b), R) : z(b) ? (s = L, re(b)) : W(b) ? (e.consume(b), L) : F(b);
  }
  function R(b) {
    return b === null || b === 60 || b === 61 || b === 62 || b === 96 ? n(b) : b === 34 || b === 39 ? (e.consume(b), i = b, M) : z(b) ? (s = R, re(b)) : W(b) ? (e.consume(b), R) : (e.consume(b), G);
  }
  function M(b) {
    return b === i ? (e.consume(b), i = void 0, q) : b === null ? n(b) : z(b) ? (s = M, re(b)) : (e.consume(b), M);
  }
  function G(b) {
    return b === null || b === 34 || b === 39 || b === 60 || b === 61 || b === 96 ? n(b) : b === 47 || b === 62 || te(b) ? F(b) : (e.consume(b), G);
  }
  function q(b) {
    return b === 47 || b === 62 || te(b) ? F(b) : n(b);
  }
  function J(b) {
    return b === 62 ? (e.consume(b), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(b);
  }
  function re(b) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), ie;
  }
  function ie(b) {
    return W(b) ? K(e, ae, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(b) : ae(b);
  }
  function ae(b) {
    return e.enter("htmlTextData"), s(b);
  }
}
const li = {
  name: "labelEnd",
  tokenize: Hf,
  resolveTo: Vf,
  resolveAll: qf
}, Mf = {
  tokenize: Gf
}, jf = {
  tokenize: Wf
}, Uf = {
  tokenize: Yf
};
function qf(e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const n = e[t][1];
    (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
  }
  return e;
}
function Vf(e, t) {
  let n = e.length, r = 0, i, o, s, a;
  for (; n--; )
    if (i = e[n][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (s) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (s = n);
  const l = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, e[o][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, u = {
    type: "label",
    start: Object.assign({}, e[o][1].start),
    end: Object.assign({}, e[s][1].end)
  }, f = {
    type: "labelText",
    start: Object.assign({}, e[o + r + 2][1].end),
    end: Object.assign({}, e[s - 2][1].start)
  };
  return a = [["enter", l, t], ["enter", u, t]], a = Fe(a, e.slice(o + 1, o + r + 3)), a = Fe(a, [["enter", f, t]]), a = Fe(a, zn(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, s - 3), t)), a = Fe(a, [["exit", f, t], e[s - 2], e[s - 1], ["exit", u, t]]), a = Fe(a, e.slice(s + 1)), a = Fe(a, [["exit", l, t]]), Me(e, o, e.length, a), e;
}
function Hf(e, t, n) {
  const r = this;
  let i = r.events.length, o, s;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(d) {
    return o ? o._inactive ? c(d) : (s = r.parser.defined.includes(Ge(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(d), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(d);
  }
  function l(d) {
    return d === 40 ? e.attempt(Mf, f, s ? f : c)(d) : d === 91 ? e.attempt(jf, f, s ? u : c)(d) : s ? f(d) : c(d);
  }
  function u(d) {
    return e.attempt(Uf, f, c)(d);
  }
  function f(d) {
    return t(d);
  }
  function c(d) {
    return o._balanced = !0, n(d);
  }
}
function Gf(e, t, n) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return te(c) ? Gt(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : Vs(e, s, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function s(c) {
    return te(c) ? Gt(e, l)(c) : f(c);
  }
  function a(c) {
    return n(c);
  }
  function l(c) {
    return c === 34 || c === 39 || c === 40 ? Gs(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return te(c) ? Gt(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), t) : n(c);
  }
}
function Wf(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Hs.call(r, e, o, s, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Ge(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function Yf(e, t, n) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
}
const Xf = {
  name: "labelStartImage",
  tokenize: Kf,
  resolveAll: li.resolveAll
};
function Kf(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), s) : n(a);
  }
  function s(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Qf = {
  name: "labelStartLink",
  tokenize: Jf,
  resolveAll: li.resolveAll
};
function Jf(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : t(s);
  }
}
const Zn = {
  name: "lineEnding",
  tokenize: Zf
};
function Zf(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), K(e, t, "linePrefix");
  }
}
const mn = {
  name: "thematicBreak",
  tokenize: $f
};
function $f(e, t, n) {
  let r = 0, i;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), s(u);
  }
  function s(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), l(u)) : r >= 3 && (u === null || z(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function l(u) {
    return u === i ? (e.consume(u), r++, l) : (e.exit("thematicBreakSequence"), W(u) ? K(e, a, "whitespace")(u) : a(u));
  }
}
const Ce = {
  name: "list",
  tokenize: nh,
  continuation: {
    tokenize: rh
  },
  exit: oh
}, eh = {
  tokenize: sh,
  partial: !0
}, th = {
  tokenize: ih,
  partial: !0
};
function nh(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return a;
  function a(h) {
    const p = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (p === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Er(h)) {
      if (r.containerState.type || (r.containerState.type = p, e.enter(p, {
        _container: !0
      })), p === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(mn, n, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(h);
    }
    return n(h);
  }
  function l(h) {
    return Er(h) && ++s < 10 ? (e.consume(h), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      Zt,
      // Can’t be empty when interrupting.
      r.interrupt ? n : f,
      e.attempt(eh, d, c)
    );
  }
  function f(h) {
    return r.containerState.initialBlankLine = !0, o++, d(h);
  }
  function c(h) {
    return W(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), d) : n(h);
  }
  function d(h) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function rh(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Zt, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, K(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !W(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(th, t, s)(a));
  }
  function s(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, K(e, e.attempt(Ce, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function ih(e, t, n) {
  const r = this;
  return K(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "listItemIndent" && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? t(o) : n(o);
  }
}
function oh(e) {
  e.exit(this.containerState.type);
}
function sh(e, t, n) {
  const r = this;
  return K(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !W(o) && s && s[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const Ki = {
  name: "setextUnderline",
  tokenize: lh,
  resolveTo: ah
};
function ah(e, t) {
  let n = e.length, r, i, o;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !o && e[n][1].type === "definition" && (o = n);
  const s = {
    type: "setextHeading",
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", s, t]), e.splice(o + 1, 0, ["exit", e[r][1], t]), e[r][1].end = Object.assign({}, e[o][1].end)) : e[r][1] = s, e.push(["exit", s, t]), e;
}
function lh(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = u, s(u)) : n(u);
  }
  function s(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), W(u) ? K(e, l, "lineSuffix")(u) : l(u));
  }
  function l(u) {
    return u === null || z(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const uh = {
  tokenize: yh,
  partial: !0
};
function ch() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: dh,
        continuation: {
          tokenize: mh
        },
        exit: gh
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: ph
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: fh,
        resolveTo: hh
      }
    }
  };
}
function fh(e, t, n) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let s;
  for (; i--; ) {
    const l = r.events[i][1];
    if (l.type === "labelImage") {
      s = l;
      break;
    }
    if (l.type === "gfmFootnoteCall" || l.type === "labelLink" || l.type === "label" || l.type === "image" || l.type === "link")
      break;
  }
  return a;
  function a(l) {
    if (!s || !s._balanced)
      return n(l);
    const u = Ge(r.sliceSerialize({
      start: s.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !o.includes(u.slice(1)) ? n(l) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(l), e.exit("gfmFootnoteCallLabelMarker"), t(l));
  }
}
function hh(e, t) {
  let n = e.length;
  for (; n--; )
    if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
      e[n][1];
      break;
    }
  e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[n + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[n + 3][1].end),
    end: Object.assign({}, e[n + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, s = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[n + 1],
    e[n + 2],
    ["enter", r, t],
    // The `[`
    e[n + 3],
    e[n + 4],
    // The `^`.
    ["enter", i, t],
    ["exit", i, t],
    // Everything in between.
    ["enter", o, t],
    ["enter", s, t],
    ["exit", s, t],
    ["exit", o, t],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, t]
  ];
  return e.splice(n, e.length - n + 1, ...a), e;
}
function ph(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, s;
  return a;
  function a(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), l;
  }
  function l(c) {
    return c !== 94 ? n(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u);
  }
  function u(c) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      c === 93 && !s || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || te(c)
    )
      return n(c);
    if (c === 93) {
      e.exit("chunkString");
      const d = e.exit("gfmFootnoteCallString");
      return i.includes(Ge(r.sliceSerialize(d))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(c);
    }
    return te(c) || (s = !0), o++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, u) : u(c);
  }
}
function dh(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, s = 0, a;
  return l;
  function l(p) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(p), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(p) {
    return p === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(p), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : n(p);
  }
  function f(p) {
    if (
      // Too long.
      s > 999 || // Closing brace with nothing.
      p === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      p === null || p === 91 || te(p)
    )
      return n(p);
    if (p === 93) {
      e.exit("chunkString");
      const y = e.exit("gfmFootnoteDefinitionLabelString");
      return o = Ge(r.sliceSerialize(y)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(p), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), d;
    }
    return te(p) || (a = !0), s++, e.consume(p), p === 92 ? c : f;
  }
  function c(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), s++, f) : f(p);
  }
  function d(p) {
    return p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), i.includes(o) || i.push(o), K(e, h, "gfmFootnoteDefinitionWhitespace")) : n(p);
  }
  function h(p) {
    return t(p);
  }
}
function mh(e, t, n) {
  return e.check(Zt, t, e.attempt(uh, t, n));
}
function gh(e) {
  e.exit("gfmFootnoteDefinition");
}
function yh(e, t, n) {
  const r = this;
  return K(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "gfmFootnoteDefinitionIndent" && s[2].sliceSerialize(s[1], !0).length === 4 ? t(o) : n(o);
  }
}
function bh(e) {
  let n = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
  };
  return n == null && (n = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(s, a) {
    let l = -1;
    for (; ++l < s.length; )
      if (s[l][0] === "enter" && s[l][1].type === "strikethroughSequenceTemporary" && s[l][1]._close) {
        let u = l;
        for (; u--; )
          if (s[u][0] === "exit" && s[u][1].type === "strikethroughSequenceTemporary" && s[u][1]._open && // If the sizes are the same:
          s[l][1].end.offset - s[l][1].start.offset === s[u][1].end.offset - s[u][1].start.offset) {
            s[l][1].type = "strikethroughSequence", s[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, s[u][1].start),
              end: Object.assign({}, s[l][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, s[u][1].end),
              end: Object.assign({}, s[l][1].start)
            }, d = [["enter", f, a], ["enter", s[u][1], a], ["exit", s[u][1], a], ["enter", c, a]], h = a.parser.constructs.insideSpan.null;
            h && Me(d, d.length, 0, zn(h, s.slice(u + 1, l), a)), Me(d, d.length, 0, [["exit", c, a], ["enter", s[l][1], a], ["exit", s[l][1], a], ["exit", f, a]]), Me(s, u - 1, l - u + 3, d), l = u + d.length - 2;
            break;
          }
      }
    for (l = -1; ++l < s.length; )
      s[l][1].type === "strikethroughSequenceTemporary" && (s[l][1].type = "data");
    return s;
  }
  function o(s, a, l) {
    const u = this.previous, f = this.events;
    let c = 0;
    return d;
    function d(p) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? l(p) : (s.enter("strikethroughSequenceTemporary"), h(p));
    }
    function h(p) {
      const y = An(u);
      if (p === 126)
        return c > 1 ? l(p) : (s.consume(p), c++, h);
      if (c < 2 && !n) return l(p);
      const w = s.exit("strikethroughSequenceTemporary"), m = An(p);
      return w._open = !m || m === 2 && !!y, w._close = !y || y === 2 && !!m, a(p);
    }
  }
}
class wh {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(t, n, r) {
    xh(this, t, n, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(t) {
    if (this.map.sort(function(o, s) {
      return o[0] - s[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      n -= 1, r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), t.length = this.map[n][0];
    r.push([...t]), t.length = 0;
    let i = r.pop();
    for (; i; )
      t.push(...i), i = r.pop();
    this.map.length = 0;
  }
}
function xh(e, t, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === t) {
        e.map[i][1] += n, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([t, n, r]);
  }
}
function kh(e, t) {
  let n = !1;
  const r = [];
  for (; t < e.length; ) {
    const i = e[t];
    if (n) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[t - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
    t += 1;
  }
  return r;
}
function Sh() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Eh,
        resolveAll: vh
      }
    }
  };
}
function Eh(e, t, n) {
  const r = this;
  let i = 0, o = 0, s;
  return a;
  function a(k) {
    let L = r.events.length - 1;
    for (; L > -1; ) {
      const G = r.events[L][1].type;
      if (G === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      G === "linePrefix") L--;
      else break;
    }
    const R = L > -1 ? r.events[L][1].type : null, M = R === "tableHead" || R === "tableRow" ? x : l;
    return M === x && r.parser.lazy[r.now().line] ? n(k) : M(k);
  }
  function l(k) {
    return e.enter("tableHead"), e.enter("tableRow"), u(k);
  }
  function u(k) {
    return k === 124 || (s = !0, o += 1), f(k);
  }
  function f(k) {
    return k === null ? n(k) : z(k) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), h) : n(k) : W(k) ? K(e, f, "whitespace")(k) : (o += 1, s && (s = !1, i += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), s = !0, f) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || te(k) ? (e.exit("data"), f(k)) : (e.consume(k), k === 92 ? d : c);
  }
  function d(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function h(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(k) : (e.enter("tableDelimiterRow"), s = !1, W(k) ? K(e, p, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : p(k));
  }
  function p(k) {
    return k === 45 || k === 58 ? w(k) : k === 124 ? (s = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), y) : _(k);
  }
  function y(k) {
    return W(k) ? K(e, w, "whitespace")(k) : w(k);
  }
  function w(k) {
    return k === 58 ? (o += 1, s = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), m) : k === 45 ? (o += 1, m(k)) : k === null || z(k) ? O(k) : _(k);
  }
  function m(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), v(k)) : _(k);
  }
  function v(k) {
    return k === 45 ? (e.consume(k), v) : k === 58 ? (s = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), S) : (e.exit("tableDelimiterFiller"), S(k));
  }
  function S(k) {
    return W(k) ? K(e, O, "whitespace")(k) : O(k);
  }
  function O(k) {
    return k === 124 ? p(k) : k === null || z(k) ? !s || i !== o ? _(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(k)) : _(k);
  }
  function _(k) {
    return n(k);
  }
  function x(k) {
    return e.enter("tableRow"), P(k);
  }
  function P(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), P) : k === null || z(k) ? (e.exit("tableRow"), t(k)) : W(k) ? K(e, P, "whitespace")(k) : (e.enter("data"), N(k));
  }
  function N(k) {
    return k === null || k === 124 || te(k) ? (e.exit("data"), P(k)) : (e.consume(k), k === 92 ? F : N);
  }
  function F(k) {
    return k === 92 || k === 124 ? (e.consume(k), N) : N(k);
  }
}
function vh(e, t) {
  let n = -1, r = !0, i = 0, o = [0, 0, 0, 0], s = [0, 0, 0, 0], a = !1, l = 0, u, f, c;
  const d = new wh();
  for (; ++n < e.length; ) {
    const h = e[n], p = h[1];
    h[0] === "enter" ? p.type === "tableHead" ? (a = !1, l !== 0 && (Qi(d, t, l, u, f), f = void 0, l = 0), u = {
      type: "table",
      start: Object.assign({}, p.start),
      // Note: correct end is set later.
      end: Object.assign({}, p.end)
    }, d.add(n, 0, [["enter", u, t]])) : p.type === "tableRow" || p.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], s = [0, n + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, p.start),
      // Note: correct end is set later.
      end: Object.assign({}, p.end)
    }, d.add(n, 0, [["enter", f, t]])), i = p.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (p.type === "data" || p.type === "tableDelimiterMarker" || p.type === "tableDelimiterFiller") ? (r = !1, s[2] === 0 && (o[1] !== 0 && (s[0] = s[1], c = an(d, t, o, i, void 0, c), o = [0, 0, 0, 0]), s[2] = n)) : p.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (s[0] = s[1], c = an(d, t, o, i, void 0, c)), o = s, s = [o[1], n, 0, 0])) : p.type === "tableHead" ? (a = !0, l = n) : p.type === "tableRow" || p.type === "tableDelimiterRow" ? (l = n, o[1] !== 0 ? (s[0] = s[1], c = an(d, t, o, i, n, c)) : s[1] !== 0 && (c = an(d, t, s, i, n, c)), i = 0) : i && (p.type === "data" || p.type === "tableDelimiterMarker" || p.type === "tableDelimiterFiller") && (s[3] = n);
  }
  for (l !== 0 && Qi(d, t, l, u, f), d.consume(t.events), n = -1; ++n < t.events.length; ) {
    const h = t.events[n];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = kh(t.events, n));
  }
  return e;
}
function an(e, t, n, r, i, o) {
  const s = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  n[0] !== 0 && (o.end = Object.assign({}, Et(t.events, n[0])), e.add(n[0], 0, [["exit", o, t]]));
  const l = Et(t.events, n[1]);
  if (o = {
    type: s,
    start: Object.assign({}, l),
    // Note: correct end is set later.
    end: Object.assign({}, l)
  }, e.add(n[1], 0, [["enter", o, t]]), n[2] !== 0) {
    const u = Et(t.events, n[2]), f = Et(t.events, n[3]), c = {
      type: a,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(n[2], 0, [["enter", c, t]]), r !== 2) {
      const d = t.events[n[2]], h = t.events[n[3]];
      if (d[1].end = Object.assign({}, h[1].end), d[1].type = "chunkText", d[1].contentType = "text", n[3] > n[2] + 1) {
        const p = n[2] + 1, y = n[3] - n[2] - 1;
        e.add(p, y, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, Et(t.events, i)), e.add(i, 0, [["exit", o, t]]), o = void 0), o;
}
function Qi(e, t, n, r, i) {
  const o = [], s = Et(t.events, n);
  i && (i.end = Object.assign({}, s), o.push(["exit", i, t])), r.end = Object.assign({}, s), o.push(["exit", r, t]), e.add(n + 1, 0, o);
}
function Et(e, t) {
  const n = e[t], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const Ch = {
  name: "tasklistCheck",
  tokenize: _h
};
function Ah() {
  return {
    text: {
      91: Ch
    }
  };
}
function _h(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(l) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(l), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(l) {
    return te(l) ? (e.enter("taskListCheckValueUnchecked"), e.consume(l), e.exit("taskListCheckValueUnchecked"), s) : l === 88 || l === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(l), e.exit("taskListCheckValueChecked"), s) : n(l);
  }
  function s(l) {
    return l === 93 ? (e.enter("taskListCheckMarker"), e.consume(l), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : n(l);
  }
  function a(l) {
    return z(l) ? t(l) : W(l) ? e.check({
      tokenize: Oh
    }, t, n)(l) : n(l);
  }
}
function Oh(e, t, n) {
  return K(e, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function Th(e) {
  return Rs([
    Bc(),
    ch(),
    bh(e),
    Sh(),
    Ah()
  ]);
}
const Rh = {};
function Ih(e) {
  const t = (
    /** @type {Processor} */
    this
  ), n = e || Rh, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), s = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(Th(n)), o.push(Lc()), s.push(Nc(n));
}
function Lh(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Nh = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ph = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Dh = {};
function Ji(e, t) {
  return (Dh.jsx ? Ph : Nh).test(e);
}
const Fh = /[ \t\n\f\r]/g;
function zh(e) {
  return typeof e == "object" ? e.type === "text" ? Zi(e.value) : !1 : Zi(e);
}
function Zi(e) {
  return e.replace(Fh, "") === "";
}
class $t {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(t, n, r) {
    this.property = t, this.normal = n, r && (this.space = r);
  }
}
$t.prototype.property = {};
$t.prototype.normal = {};
$t.prototype.space = null;
function Ws(e, t) {
  const n = {}, r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new $t(n, r, t);
}
function _r(e) {
  return e.toLowerCase();
}
class je {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
je.prototype.space = null;
je.prototype.boolean = !1;
je.prototype.booleanish = !1;
je.prototype.overloadedBoolean = !1;
je.prototype.number = !1;
je.prototype.commaSeparated = !1;
je.prototype.spaceSeparated = !1;
je.prototype.commaOrSpaceSeparated = !1;
je.prototype.mustUseProperty = !1;
je.prototype.defined = !1;
let Bh = 0;
const j = xt(), fe = xt(), Ys = xt(), T = xt(), ne = xt(), vt = xt(), Le = xt();
function xt() {
  return 2 ** ++Bh;
}
const Or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: j,
  booleanish: fe,
  commaOrSpaceSeparated: Le,
  commaSeparated: vt,
  number: T,
  overloadedBoolean: Ys,
  spaceSeparated: ne
}, Symbol.toStringTag, { value: "Module" })), $n = Object.keys(Or);
class ui extends je {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), $i(this, "space", i), typeof r == "number")
      for (; ++o < $n.length; ) {
        const s = $n[o];
        $i(this, $n[o], (r & Or[s]) === Or[s]);
      }
  }
}
ui.prototype.defined = !0;
function $i(e, t, n) {
  n && (e[t] = n);
}
const Mh = {}.hasOwnProperty;
function Rt(e) {
  const t = {}, n = {};
  let r;
  for (r in e.properties)
    if (Mh.call(e.properties, r)) {
      const i = e.properties[r], o = new ui(
        r,
        e.transform(e.attributes || {}, r),
        i,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[_r(r)] = r, n[_r(o.attribute)] = r;
    }
  return new $t(t, n, e.space);
}
const Xs = Rt({
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), Ks = Rt({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function Qs(e, t) {
  return t in e ? e[t] : t;
}
function Js(e, t) {
  return Qs(e, t.toLowerCase());
}
const Zs = Rt({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Js,
  properties: { xmlns: null, xmlnsXLink: null }
}), $s = Rt({
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: fe,
    ariaAutoComplete: null,
    ariaBusy: fe,
    ariaChecked: fe,
    ariaColCount: T,
    ariaColIndex: T,
    ariaColSpan: T,
    ariaControls: ne,
    ariaCurrent: null,
    ariaDescribedBy: ne,
    ariaDetails: null,
    ariaDisabled: fe,
    ariaDropEffect: ne,
    ariaErrorMessage: null,
    ariaExpanded: fe,
    ariaFlowTo: ne,
    ariaGrabbed: fe,
    ariaHasPopup: null,
    ariaHidden: fe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ne,
    ariaLevel: T,
    ariaLive: null,
    ariaModal: fe,
    ariaMultiLine: fe,
    ariaMultiSelectable: fe,
    ariaOrientation: null,
    ariaOwns: ne,
    ariaPlaceholder: null,
    ariaPosInSet: T,
    ariaPressed: fe,
    ariaReadOnly: fe,
    ariaRelevant: null,
    ariaRequired: fe,
    ariaRoleDescription: ne,
    ariaRowCount: T,
    ariaRowIndex: T,
    ariaRowSpan: T,
    ariaSelected: fe,
    ariaSetSize: T,
    ariaSort: null,
    ariaValueMax: T,
    ariaValueMin: T,
    ariaValueNow: T,
    ariaValueText: null,
    role: null
  }
}), jh = Rt({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Js,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: vt,
    acceptCharset: ne,
    accessKey: ne,
    action: null,
    allow: null,
    allowFullScreen: j,
    allowPaymentRequest: j,
    allowUserMedia: j,
    alt: null,
    as: null,
    async: j,
    autoCapitalize: null,
    autoComplete: ne,
    autoFocus: j,
    autoPlay: j,
    blocking: ne,
    capture: null,
    charSet: null,
    checked: j,
    cite: null,
    className: ne,
    cols: T,
    colSpan: null,
    content: null,
    contentEditable: fe,
    controls: j,
    controlsList: ne,
    coords: T | vt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: j,
    defer: j,
    dir: null,
    dirName: null,
    disabled: j,
    download: Ys,
    draggable: fe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: j,
    formTarget: null,
    headers: ne,
    height: T,
    hidden: j,
    high: T,
    href: null,
    hrefLang: null,
    htmlFor: ne,
    httpEquiv: ne,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: j,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: j,
    itemId: null,
    itemProp: ne,
    itemRef: ne,
    itemScope: j,
    itemType: ne,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: j,
    low: T,
    manifest: null,
    max: null,
    maxLength: T,
    media: null,
    method: null,
    min: null,
    minLength: T,
    multiple: j,
    muted: j,
    name: null,
    nonce: null,
    noModule: j,
    noValidate: j,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: j,
    optimum: T,
    pattern: null,
    ping: ne,
    placeholder: null,
    playsInline: j,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: j,
    referrerPolicy: null,
    rel: ne,
    required: j,
    reversed: j,
    rows: T,
    rowSpan: T,
    sandbox: ne,
    scope: null,
    scoped: j,
    seamless: j,
    selected: j,
    shadowRootClonable: j,
    shadowRootDelegatesFocus: j,
    shadowRootMode: null,
    shape: null,
    size: T,
    sizes: null,
    slot: null,
    span: T,
    spellCheck: fe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: T,
    step: null,
    style: null,
    tabIndex: T,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: j,
    useMap: null,
    value: fe,
    width: T,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ne,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: T,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: T,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: j,
    // Lists. Use CSS to reduce space between items instead
    declare: j,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: T,
    // `<img>` and `<object>`
    leftMargin: T,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: T,
    // `<body>`
    marginWidth: T,
    // `<body>`
    noResize: j,
    // `<frame>`
    noHref: j,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: j,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: j,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: T,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: fe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: T,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: T,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: j,
    disableRemotePlayback: j,
    prefix: null,
    property: null,
    results: T,
    security: null,
    unselectable: null
  }
}), Uh = Rt({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: Qs,
  properties: {
    about: Le,
    accentHeight: T,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: T,
    amplitude: T,
    arabicForm: null,
    ascent: T,
    attributeName: null,
    attributeType: null,
    azimuth: T,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: T,
    by: null,
    calcMode: null,
    capHeight: T,
    className: ne,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: T,
    diffuseConstant: T,
    direction: null,
    display: null,
    dur: null,
    divisor: T,
    dominantBaseline: null,
    download: j,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: T,
    enableBackground: null,
    end: null,
    event: null,
    exponent: T,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: T,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: vt,
    g2: vt,
    glyphName: vt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: T,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: T,
    horizOriginX: T,
    horizOriginY: T,
    id: null,
    ideographic: T,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: T,
    k: T,
    k1: T,
    k2: T,
    k3: T,
    k4: T,
    kernelMatrix: Le,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: T,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: T,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: T,
    overlineThickness: T,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: T,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ne,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: T,
    pointsAtY: T,
    pointsAtZ: T,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Le,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Le,
    rev: Le,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Le,
    requiredFeatures: Le,
    requiredFonts: Le,
    requiredFormats: Le,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: T,
    specularExponent: T,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: T,
    strikethroughThickness: T,
    string: null,
    stroke: null,
    strokeDashArray: Le,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: T,
    strokeOpacity: T,
    strokeWidth: null,
    style: null,
    surfaceScale: T,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Le,
    tabIndex: T,
    tableValues: null,
    target: null,
    targetX: T,
    targetY: T,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Le,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: T,
    underlineThickness: T,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: T,
    values: null,
    vAlphabetic: T,
    vMathematical: T,
    vectorEffect: null,
    vHanging: T,
    vIdeographic: T,
    version: null,
    vertAdvY: T,
    vertOriginX: T,
    vertOriginY: T,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: T,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), qh = /^data[-\w.:]+$/i, eo = /-[a-z]/g, Vh = /[A-Z]/g;
function Hh(e, t) {
  const n = _r(t);
  let r = t, i = je;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && qh.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(eo, Wh);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!eo.test(o)) {
        let s = o.replace(Vh, Gh);
        s.charAt(0) !== "-" && (s = "-" + s), t = "data" + s;
      }
    }
    i = ui;
  }
  return new i(r, t);
}
function Gh(e) {
  return "-" + e.toLowerCase();
}
function Wh(e) {
  return e.charAt(1).toUpperCase();
}
const Yh = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Xh = Ws([Ks, Xs, Zs, $s, jh], "html"), ci = Ws([Ks, Xs, Zs, $s, Uh], "svg");
function Kh(e) {
  return e.join(" ").trim();
}
var to = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ea = {}, no = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Jh = /\n/g, Zh = /^\s*/, $h = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, ep = /^:\s*/, tp = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, np = /^[;\s]*/, rp = /^\s+|\s+$/g, ip = `
`, ro = "/", io = "*", mt = "", op = "comment", sp = "declaration", ap = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(p) {
    var y = p.match(Jh);
    y && (n += y.length);
    var w = p.lastIndexOf(ip);
    r = ~w ? p.length - w : r + p.length;
  }
  function o() {
    var p = { line: n, column: r };
    return function(y) {
      return y.position = new s(p), u(), y;
    };
  }
  function s(p) {
    this.start = p, this.end = { line: n, column: r }, this.source = t.source;
  }
  s.prototype.content = e;
  function a(p) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + p
    );
    if (y.reason = p, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function l(p) {
    var y = p.exec(e);
    if (y) {
      var w = y[0];
      return i(w), e = e.slice(w.length), y;
    }
  }
  function u() {
    l(Zh);
  }
  function f(p) {
    var y;
    for (p = p || []; y = c(); )
      y !== !1 && p.push(y);
    return p;
  }
  function c() {
    var p = o();
    if (!(ro != e.charAt(0) || io != e.charAt(1))) {
      for (var y = 2; mt != e.charAt(y) && (io != e.charAt(y) || ro != e.charAt(y + 1)); )
        ++y;
      if (y += 2, mt === e.charAt(y - 1))
        return a("End of comment missing");
      var w = e.slice(2, y - 2);
      return r += 2, i(w), e = e.slice(y), r += 2, p({
        type: op,
        comment: w
      });
    }
  }
  function d() {
    var p = o(), y = l($h);
    if (y) {
      if (c(), !l(ep)) return a("property missing ':'");
      var w = l(tp), m = p({
        type: sp,
        property: oo(y[0].replace(no, mt)),
        value: w ? oo(w[0].replace(no, mt)) : mt
      });
      return l(np), m;
    }
  }
  function h() {
    var p = [];
    f(p);
    for (var y; y = d(); )
      y !== !1 && (p.push(y), f(p));
    return p;
  }
  return u(), h();
};
function oo(e) {
  return e ? e.replace(rp, mt) : mt;
}
var lp = to && to.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ea, "__esModule", { value: !0 });
var so = ea.default = cp, up = lp(ap);
function cp(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  var r = (0, up.default)(e), i = typeof t == "function";
  return r.forEach(function(o) {
    if (o.type === "declaration") {
      var s = o.property, a = o.value;
      i ? t(s, a, o) : a && (n = n || {}, n[s] = a);
    }
  }), n;
}
const fp = so.default || so, ta = na("end"), fi = na("start");
function na(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function hp(e) {
  const t = fi(e), n = ta(e);
  if (t && n)
    return { start: t, end: n };
}
function Wt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ao(e.position) : "start" in e || "end" in e ? ao(e) : "line" in e || "column" in e ? Tr(e) : "";
}
function Tr(e) {
  return lo(e && e.line) + ":" + lo(e && e.column);
}
function ao(e) {
  return Tr(e && e.start) + "-" + Tr(e && e.end);
}
function lo(e) {
  return e && typeof e == "number" ? e : 1;
}
class xe extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", o = {}, s = !1;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = {
      ancestors: [n],
      place: n.position
    } : o = { ...n }), typeof t == "string" ? i = t : !o.cause && t && (s = !0, i = t.message, o.cause = t), !o.ruleId && !o.source && typeof r == "string") {
      const l = r.indexOf(":");
      l === -1 ? o.ruleId = r : (o.source = r.slice(0, l), o.ruleId = r.slice(l + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const l = o.ancestors[o.ancestors.length - 1];
      l && (o.place = l.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = a ? a.line : void 0, this.name = Wt(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = s && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
xe.prototype.file = "";
xe.prototype.name = "";
xe.prototype.reason = "";
xe.prototype.message = "";
xe.prototype.stack = "";
xe.prototype.column = void 0;
xe.prototype.line = void 0;
xe.prototype.ancestors = void 0;
xe.prototype.cause = void 0;
xe.prototype.fatal = void 0;
xe.prototype.place = void 0;
xe.prototype.ruleId = void 0;
xe.prototype.source = void 0;
const hi = {}.hasOwnProperty, pp = /* @__PURE__ */ new Map(), dp = /[A-Z]/g, mp = /-([a-z])/g, gp = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), yp = /* @__PURE__ */ new Set(["td", "th"]), ra = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function bp(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ap(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Cp(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? ci : Xh,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, o = ia(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function ia(e, t, n) {
  if (t.type === "element")
    return wp(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return xp(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Sp(e, t, n);
  if (t.type === "mdxjsEsm")
    return kp(e, t);
  if (t.type === "root")
    return Ep(e, t, n);
  if (t.type === "text")
    return vp(e, t);
}
function wp(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = ci, e.schema = i), e.ancestors.push(t);
  const o = sa(e, t.tagName, !1), s = _p(e, t);
  let a = di(e, t);
  return gp.has(t.tagName) && (a = a.filter(function(l) {
    return typeof l == "string" ? !zh(l) : !0;
  })), oa(e, s, o, t), pi(s, a), e.ancestors.pop(), e.schema = r, e.create(t, o, s, n);
}
function xp(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Yt(e, t.position);
}
function kp(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Yt(e, t.position);
}
function Sp(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = ci, e.schema = i), e.ancestors.push(t);
  const o = t.name === null ? e.Fragment : sa(e, t.name, !0), s = Op(e, t), a = di(e, t);
  return oa(e, s, o, t), pi(s, a), e.ancestors.pop(), e.schema = r, e.create(t, o, s, n);
}
function Ep(e, t, n) {
  const r = {};
  return pi(r, di(e, t)), e.create(t, e.Fragment, r, n);
}
function vp(e, t) {
  return t.value;
}
function oa(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function pi(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Cp(e, t, n) {
  return r;
  function r(i, o, s, a) {
    const u = Array.isArray(s.children) ? n : t;
    return a ? u(o, s, a) : u(o, s);
  }
}
function Ap(e, t) {
  return n;
  function n(r, i, o, s) {
    const a = Array.isArray(o.children), l = fi(r);
    return t(
      i,
      o,
      s,
      a,
      {
        columnNumber: l ? l.column - 1 : void 0,
        fileName: e,
        lineNumber: l ? l.line : void 0
      },
      void 0
    );
  }
}
function _p(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && hi.call(t.properties, i)) {
      const o = Tp(e, i, t.properties[i]);
      if (o) {
        const [s, a] = o;
        e.tableCellAlignToStyle && s === "align" && typeof a == "string" && yp.has(t.tagName) ? r = a : n[s] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Op(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const s = o.expression;
        s.type;
        const a = s.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Yt(e, t.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Yt(e, t.position);
      else
        o = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return n;
}
function di(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : pp;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let s;
    if (e.passKeys) {
      const l = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (l) {
        const u = i.get(l) || 0;
        s = l + "-" + u, i.set(l, u + 1);
      }
    }
    const a = ia(e, o, s);
    a !== void 0 && n.push(a);
  }
  return n;
}
function Tp(e, t, n) {
  const r = Hh(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Lh(n) : Kh(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Rp(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = Ip(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Yh[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Rp(e, t) {
  const n = {};
  try {
    fp(t, r);
  } catch (i) {
    if (!e.ignoreInvalidStyle) {
      const o = (
        /** @type {Error} */
        i
      ), s = new xe("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: o,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime"
      });
      throw s.file = e.filePath || void 0, s.url = ra + "#cannot-parse-style-attribute", s;
    }
  }
  return n;
  function r(i, o) {
    let s = i;
    s.slice(0, 2) !== "--" && (s.slice(0, 4) === "-ms-" && (s = "ms-" + s.slice(4)), s = s.replace(mp, Np)), n[s] = o;
  }
}
function sa(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, s;
    for (; ++o < i.length; ) {
      const a = Ji(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = s;
  } else
    r = Ji(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {keyof JSX.IntrinsicElements} */
      r.value
    );
    return hi.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Yt(e);
}
function Yt(e, t) {
  const n = new xe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = ra + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Ip(e) {
  const t = {};
  let n;
  for (n in e)
    hi.call(e, n) && (t[Lp(n)] = e[n]);
  return t;
}
function Lp(e) {
  let t = e.replace(dp, Pp);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Np(e, t) {
  return t.toUpperCase();
}
function Pp(e) {
  return "-" + e.toLowerCase();
}
const er = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, Dp = {
  tokenize: Fp
};
function Fp(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), K(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const l = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = l), n = l, s(a);
  }
  function s(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return z(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), s);
  }
}
const zp = {
  tokenize: Bp
}, uo = {
  tokenize: Mp
};
function Bp(e) {
  const t = this, n = [];
  let r = 0, i, o, s;
  return a;
  function a(S) {
    if (r < n.length) {
      const O = n[r];
      return t.containerState = O[1], e.attempt(
        O[0].continuation,
        l,
        u
      )(S);
    }
    return u(S);
  }
  function l(S) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && v();
      const O = t.events.length;
      let _ = O, x;
      for (; _--; )
        if (t.events[_][0] === "exit" && t.events[_][1].type === "chunkFlow") {
          x = t.events[_][1].end;
          break;
        }
      m(r);
      let P = O;
      for (; P < t.events.length; )
        t.events[P][1].end = Object.assign({}, x), P++;
      return Me(
        t.events,
        _ + 1,
        0,
        t.events.slice(O)
      ), t.events.length = P, u(S);
    }
    return a(S);
  }
  function u(S) {
    if (r === n.length) {
      if (!i)
        return d(S);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return p(S);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      uo,
      f,
      c
    )(S);
  }
  function f(S) {
    return i && v(), m(r), d(S);
  }
  function c(S) {
    return t.parser.lazy[t.now().line] = r !== n.length, s = t.now().offset, p(S);
  }
  function d(S) {
    return t.containerState = {}, e.attempt(
      uo,
      h,
      p
    )(S);
  }
  function h(S) {
    return r++, n.push([t.currentConstruct, t.containerState]), d(S);
  }
  function p(S) {
    if (S === null) {
      i && v(), m(0), e.consume(S);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      contentType: "flow",
      previous: o,
      _tokenizer: i
    }), y(S);
  }
  function y(S) {
    if (S === null) {
      w(e.exit("chunkFlow"), !0), m(0), e.consume(S);
      return;
    }
    return z(S) ? (e.consume(S), w(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(S), y);
  }
  function w(S, O) {
    const _ = t.sliceStream(S);
    if (O && _.push(null), S.previous = o, o && (o.next = S), o = S, i.defineSkip(S.start), i.write(_), t.parser.lazy[S.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < s && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > s)
        )
          return;
      const P = t.events.length;
      let N = P, F, k;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === "chunkFlow") {
          if (F) {
            k = t.events[N][1].end;
            break;
          }
          F = !0;
        }
      for (m(r), x = P; x < t.events.length; )
        t.events[x][1].end = Object.assign({}, k), x++;
      Me(
        t.events,
        N + 1,
        0,
        t.events.slice(P)
      ), t.events.length = x;
    }
  }
  function m(S) {
    let O = n.length;
    for (; O-- > S; ) {
      const _ = n[O];
      t.containerState = _[1], _[0].exit.call(t, e);
    }
    n.length = S;
  }
  function v() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Mp(e, t, n) {
  return K(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
const jp = {
  tokenize: Up
};
function Up(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Zt,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      K(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(mf, i)
        ),
        "linePrefix"
      )
    )
  );
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const qp = {
  resolveAll: la()
}, Vp = aa("string"), Hp = aa("text");
function aa(e) {
  return {
    tokenize: t,
    resolveAll: la(
      e === "text" ? Gp : void 0
    )
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], o = n.attempt(i, s, a);
    return s;
    function s(f) {
      return u(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return n.enter("data"), n.consume(f), l;
    }
    function l(f) {
      return u(f) ? (n.exit("data"), o(f)) : (n.consume(f), l);
    }
    function u(f) {
      if (f === null)
        return !0;
      const c = i[f];
      let d = -1;
      if (c)
        for (; ++d < c.length; ) {
          const h = c[d];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function la(e) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(n, r) : n;
  }
}
function Gp(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let o = i.length, s = -1, a = 0, l;
      for (; o--; ) {
        const u = i[o];
        if (typeof u == "string") {
          for (s = u.length; u.charCodeAt(s - 1) === 32; )
            a++, s--;
          if (s) break;
          s = -1;
        } else if (u === -2)
          l = !0, a++;
        else if (u !== -1) {
          o++;
          break;
        }
      }
      if (a) {
        const u = {
          type: n === e.length || l || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a,
            _index: r.start._index + o,
            _bufferIndex: o ? s : r.start._bufferIndex + s
          },
          end: Object.assign({}, r.end)
        };
        r.end = Object.assign({}, u.start), r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(
          n,
          0,
          ["enter", u, t],
          ["exit", u, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
function Wp(e, t, n) {
  let r = Object.assign(
    n ? Object.assign({}, n) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const i = {}, o = [];
  let s = [], a = [];
  const l = {
    consume: v,
    enter: S,
    exit: O,
    attempt: P(_),
    check: P(x),
    interrupt: P(x, {
      interrupt: !0
    })
  }, u = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: e,
    sliceStream: h,
    sliceSerialize: d,
    now: p,
    defineSkip: y,
    write: c
  };
  let f = t.tokenize.call(u, l);
  return t.resolveAll && o.push(t), u;
  function c(L) {
    return s = Fe(s, L), w(), s[s.length - 1] !== null ? [] : (N(t, 0), u.events = zn(o, u.events, u), u.events);
  }
  function d(L, R) {
    return Xp(h(L), R);
  }
  function h(L) {
    return Yp(s, L);
  }
  function p() {
    const { line: L, column: R, offset: M, _index: G, _bufferIndex: q } = r;
    return {
      line: L,
      column: R,
      offset: M,
      _index: G,
      _bufferIndex: q
    };
  }
  function y(L) {
    i[L.line] = L.column, k();
  }
  function w() {
    let L;
    for (; r._index < s.length; ) {
      const R = s[r._index];
      if (typeof R == "string")
        for (L = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === L && r._bufferIndex < R.length; )
          m(R.charCodeAt(r._bufferIndex));
      else
        m(R);
    }
  }
  function m(L) {
    f = f(L);
  }
  function v(L) {
    z(L) ? (r.line++, r.column = 1, r.offset += L === -3 ? 2 : 1, k()) : L !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === s[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = L;
  }
  function S(L, R) {
    const M = R || {};
    return M.type = L, M.start = p(), u.events.push(["enter", M, u]), a.push(M), M;
  }
  function O(L) {
    const R = a.pop();
    return R.end = p(), u.events.push(["exit", R, u]), R;
  }
  function _(L, R) {
    N(L, R.from);
  }
  function x(L, R) {
    R.restore();
  }
  function P(L, R) {
    return M;
    function M(G, q, J) {
      let re, ie, ae, b;
      return Array.isArray(G) ? V(G) : "tokenize" in G ? (
        // @ts-expect-error Looks like a construct.
        V([G])
      ) : D(G);
      function D(le) {
        return Te;
        function Te(ce) {
          const Pe = ce !== null && le[ce], Ee = ce !== null && le.null, ft = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Pe) ? Pe : Pe ? [Pe] : [],
            ...Array.isArray(Ee) ? Ee : Ee ? [Ee] : []
          ];
          return V(ft)(ce);
        }
      }
      function V(le) {
        return re = le, ie = 0, le.length === 0 ? J : g(le[ie]);
      }
      function g(le) {
        return Te;
        function Te(ce) {
          return b = F(), ae = le, le.partial || (u.currentConstruct = le), le.name && u.parser.constructs.disable.null.includes(le.name) ? Se() : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            R ? Object.assign(Object.create(u), R) : u,
            l,
            de,
            Se
          )(ce);
        }
      }
      function de(le) {
        return L(ae, b), q;
      }
      function Se(le) {
        return b.restore(), ++ie < re.length ? g(re[ie]) : J;
      }
    }
  }
  function N(L, R) {
    L.resolveAll && !o.includes(L) && o.push(L), L.resolve && Me(
      u.events,
      R,
      u.events.length - R,
      L.resolve(u.events.slice(R), u)
    ), L.resolveTo && (u.events = L.resolveTo(u.events, u));
  }
  function F() {
    const L = p(), R = u.previous, M = u.currentConstruct, G = u.events.length, q = Array.from(a);
    return {
      restore: J,
      from: G
    };
    function J() {
      r = L, u.previous = R, u.currentConstruct = M, u.events.length = G, a = q, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Yp(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let s;
  if (n === i)
    s = [e[n].slice(r, o)];
  else {
    if (s = e.slice(n, i), r > -1) {
      const a = s[0];
      typeof a == "string" ? s[0] = a.slice(r) : s.shift();
    }
    o > 0 && s.push(e[i].slice(0, o));
  }
  return s;
}
function Xp(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const o = e[n];
    let s;
    if (typeof o == "string")
      s = o;
    else
      switch (o) {
        case -5: {
          s = "\r";
          break;
        }
        case -4: {
          s = `
`;
          break;
        }
        case -3: {
          s = `\r
`;
          break;
        }
        case -2: {
          s = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && i) continue;
          s = " ";
          break;
        }
        default:
          s = String.fromCharCode(o);
      }
    i = o === -2, r.push(s);
  }
  return r.join("");
}
const Kp = {
  42: Ce,
  43: Ce,
  45: Ce,
  48: Ce,
  49: Ce,
  50: Ce,
  51: Ce,
  52: Ce,
  53: Ce,
  54: Ce,
  55: Ce,
  56: Ce,
  57: Ce,
  62: Ms
}, Qp = {
  91: xf
}, Jp = {
  [-2]: Jn,
  [-1]: Jn,
  32: Jn
}, Zp = {
  35: Af,
  42: mn,
  45: [Ki, mn],
  60: Rf,
  61: Ki,
  95: mn,
  96: Yi,
  126: Yi
}, $p = {
  38: Us,
  92: js
}, ed = {
  [-5]: Zn,
  [-4]: Zn,
  [-3]: Zn,
  33: Xf,
  38: Us,
  42: Ar,
  60: [Kc, zf],
  91: Qf,
  92: [vf, js],
  93: li,
  95: Ar,
  96: uf
}, td = {
  null: [Ar, qp]
}, nd = {
  null: [42, 95]
}, rd = {
  null: []
}, id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: nd,
  contentInitial: Qp,
  disable: rd,
  document: Kp,
  flow: Zp,
  flowInitial: Jp,
  insideSpan: td,
  string: $p,
  text: ed
}, Symbol.toStringTag, { value: "Module" }));
function od(e) {
  const n = (
    /** @type {FullNormalizedExtension} */
    Rs([id, ...(e || {}).extensions || []])
  ), r = {
    defined: [],
    lazy: {},
    constructs: n,
    content: i(Dp),
    document: i(zp),
    flow: i(jp),
    string: i(Vp),
    text: i(Hp)
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return Wp(r, o, a);
    }
  }
}
function sd(e) {
  for (; !qs(e); )
    ;
  return e;
}
const co = /[\0\t\n\r]/g;
function ad() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, s, a) {
    const l = [];
    let u, f, c, d, h;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(s || void 0).decode(o)), c = 0, t = "", n && (o.charCodeAt(0) === 65279 && c++, n = void 0); c < o.length; ) {
      if (co.lastIndex = c, u = co.exec(o), d = u && u.index !== void 0 ? u.index : o.length, h = o.charCodeAt(d), !u) {
        t = o.slice(c);
        break;
      }
      if (h === 10 && c === d && r)
        l.push(-3), r = void 0;
      else
        switch (r && (l.push(-5), r = void 0), c < d && (l.push(o.slice(c, d)), e += d - c), h) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, l.push(-2); e++ < f; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = d + 1;
    }
    return a && (r && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const ua = {}.hasOwnProperty;
function ld(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), ud(n)(sd(od(n).document().write(ad()(e, t, !0))));
}
function ud(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(ye),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: o(se),
      blockQuote: o(Ee),
      characterEscape: F,
      characterReference: F,
      codeFenced: o(ft),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: o(ft, s),
      codeText: o(Z, s),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: o($),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: o(ge),
      hardBreakEscape: o(Re),
      hardBreakTrailing: o(Re),
      htmlFlow: o(Je, s),
      htmlFlowData: F,
      htmlText: o(Je, s),
      htmlTextData: F,
      image: o(me),
      label: s,
      link: o(ye),
      listItem: o(rn),
      listItemValue: d,
      listOrdered: o(De, c),
      listUnordered: o(De),
      paragraph: o(on),
      reference: g,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: o(se),
      strong: o(sn),
      thematicBreak: o(Ue)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: _,
      autolink: l(),
      autolinkEmail: Pe,
      autolinkProtocol: ce,
      blockQuote: l(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Se,
      characterReferenceMarkerNumeric: Se,
      characterReferenceValue: le,
      characterReference: Te,
      codeFenced: l(w),
      codeFencedFence: y,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: p,
      codeFlowValue: k,
      codeIndented: l(m),
      codeText: l(q),
      codeTextData: k,
      data: k,
      definition: l(),
      definitionDestinationString: O,
      definitionLabelString: v,
      definitionTitleString: S,
      emphasis: l(),
      hardBreakEscape: l(R),
      hardBreakTrailing: l(R),
      htmlFlow: l(M),
      htmlFlowData: k,
      htmlText: l(G),
      htmlTextData: k,
      image: l(re),
      label: ae,
      labelText: ie,
      lineEnding: L,
      link: l(J),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: de,
      resourceDestinationString: b,
      resourceTitleString: D,
      resource: V,
      setextHeading: l(N),
      setextHeadingLineSequence: P,
      setextHeadingText: x,
      strong: l(),
      thematicBreak: l()
    }
  };
  ca(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(C) {
    let I = {
      type: "root",
      children: []
    };
    const B = {
      stack: [I],
      tokenStack: [],
      config: t,
      enter: a,
      exit: u,
      buffer: s,
      resume: f,
      data: n
    }, Y = [];
    let ee = -1;
    for (; ++ee < C.length; )
      if (C[ee][1].type === "listOrdered" || C[ee][1].type === "listUnordered")
        if (C[ee][0] === "enter")
          Y.push(ee);
        else {
          const qe = Y.pop();
          ee = i(C, qe, ee);
        }
    for (ee = -1; ++ee < C.length; ) {
      const qe = t[C[ee][0]];
      ua.call(qe, C[ee][1].type) && qe[C[ee][1].type].call(Object.assign({
        sliceSerialize: C[ee][2].sliceSerialize
      }, B), C[ee][1]);
    }
    if (B.tokenStack.length > 0) {
      const qe = B.tokenStack[B.tokenStack.length - 1];
      (qe[1] || fo).call(B, void 0, qe[0]);
    }
    for (I.position = {
      start: rt(C.length > 0 ? C[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: rt(C.length > 0 ? C[C.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, ee = -1; ++ee < t.transforms.length; )
      I = t.transforms[ee](I) || I;
    return I;
  }
  function i(C, I, B) {
    let Y = I - 1, ee = -1, qe = !1, ht, Ze, Dt, Ft;
    for (; ++Y <= B; ) {
      const Ie = C[Y];
      switch (Ie[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Ie[0] === "enter" ? ee++ : ee--, Ft = void 0;
          break;
        }
        case "lineEndingBlank": {
          Ie[0] === "enter" && (ht && !Ft && !ee && !Dt && (Dt = Y), Ft = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ft = void 0;
      }
      if (!ee && Ie[0] === "enter" && Ie[1].type === "listItemPrefix" || ee === -1 && Ie[0] === "exit" && (Ie[1].type === "listUnordered" || Ie[1].type === "listOrdered")) {
        if (ht) {
          let kt = Y;
          for (Ze = void 0; kt--; ) {
            const $e = C[kt];
            if ($e[1].type === "lineEnding" || $e[1].type === "lineEndingBlank") {
              if ($e[0] === "exit") continue;
              Ze && (C[Ze][1].type = "lineEndingBlank", qe = !0), $e[1].type = "lineEnding", Ze = kt;
            } else if (!($e[1].type === "linePrefix" || $e[1].type === "blockQuotePrefix" || $e[1].type === "blockQuotePrefixWhitespace" || $e[1].type === "blockQuoteMarker" || $e[1].type === "listItemIndent")) break;
          }
          Dt && (!Ze || Dt < Ze) && (ht._spread = !0), ht.end = Object.assign({}, Ze ? C[Ze][1].start : Ie[1].end), C.splice(Ze || Y, 0, ["exit", ht, Ie[2]]), Y++, B++;
        }
        if (Ie[1].type === "listItemPrefix") {
          const kt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ie[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ht = kt, C.splice(Y, 0, ["enter", kt, Ie[2]]), Y++, B++, Dt = void 0, Ft = !0;
        }
      }
    }
    return C[I][1]._spread = qe, B;
  }
  function o(C, I) {
    return B;
    function B(Y) {
      a.call(this, C(Y), Y), I && I.call(this, Y);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(C, I, B) {
    this.stack[this.stack.length - 1].children.push(C), this.stack.push(C), this.tokenStack.push([I, B]), C.position = {
      start: rt(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(C) {
    return I;
    function I(B) {
      C && C.call(this, B), u.call(this, B);
    }
  }
  function u(C, I) {
    const B = this.stack.pop(), Y = this.tokenStack.pop();
    if (Y)
      Y[0].type !== C.type && (I ? I.call(this, C, Y[0]) : (Y[1] || fo).call(this, C, Y[0]));
    else throw new Error("Cannot close `" + C.type + "` (" + Wt({
      start: C.start,
      end: C.end
    }) + "): it’s not open");
    B.position.end = rt(C.end);
  }
  function f() {
    return ii(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(C) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(C), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = C;
  }
  function p() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = C;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function w() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = C.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function m() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = C.replace(/(\r?\n|\r)$/g, "");
  }
  function v(C) {
    const I = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = I, B.identifier = Ge(this.sliceSerialize(C)).toLowerCase();
  }
  function S() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = C;
  }
  function O() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = C;
  }
  function _(C) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const B = this.sliceSerialize(C).length;
      I.depth = B;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function P(C) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(C).codePointAt(0) === 61 ? 1 : 2;
  }
  function N() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(C) {
    const B = this.stack[this.stack.length - 1].children;
    let Y = B[B.length - 1];
    (!Y || Y.type !== "text") && (Y = ve(), Y.position = {
      start: rt(C.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, B.push(Y)), this.stack.push(Y);
  }
  function k(C) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(C), I.position.end = rt(C.end);
  }
  function L(C) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const B = I.children[I.children.length - 1];
      B.position.end = rt(C.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(I.type) && (F.call(this, C), k.call(this, C));
  }
  function R() {
    this.data.atHardBreak = !0;
  }
  function M() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = C;
  }
  function G() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = C;
  }
  function q() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = C;
  }
  function J() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = I, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function re() {
    const C = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      C.type += "Reference", C.referenceType = I, delete C.url, delete C.title;
    } else
      delete C.identifier, delete C.label;
    this.data.referenceType = void 0;
  }
  function ie(C) {
    const I = this.sliceSerialize(C), B = this.stack[this.stack.length - 2];
    B.label = wc(I), B.identifier = Ge(I).toLowerCase();
  }
  function ae() {
    const C = this.stack[this.stack.length - 1], I = this.resume(), B = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, B.type === "link") {
      const Y = C.children;
      B.children = Y;
    } else
      B.alt = I;
  }
  function b() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = C;
  }
  function D() {
    const C = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = C;
  }
  function V() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function de(C) {
    const I = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = I, B.identifier = Ge(this.sliceSerialize(C)).toLowerCase(), this.data.referenceType = "full";
  }
  function Se(C) {
    this.data.characterReferenceType = C.type;
  }
  function le(C) {
    const I = this.sliceSerialize(C), B = this.data.characterReferenceType;
    let Y;
    B ? (Y = Ts(I, B === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Y = si(I);
    const ee = this.stack[this.stack.length - 1];
    ee.value += Y;
  }
  function Te(C) {
    const I = this.stack.pop();
    I.position.end = rt(C.end);
  }
  function ce(C) {
    k.call(this, C);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(C);
  }
  function Pe(C) {
    k.call(this, C);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(C);
  }
  function Ee() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ft() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Z() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function $() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ge() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function se() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Re() {
    return {
      type: "break"
    };
  }
  function Je() {
    return {
      type: "html",
      value: ""
    };
  }
  function me() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ye() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function De(C) {
    return {
      type: "list",
      ordered: C.type === "listOrdered",
      start: null,
      spread: C._spread,
      children: []
    };
  }
  function rn(C) {
    return {
      type: "listItem",
      spread: C._spread,
      checked: null,
      children: []
    };
  }
  function on() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function sn() {
    return {
      type: "strong",
      children: []
    };
  }
  function ve() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ue() {
    return {
      type: "thematicBreak"
    };
  }
}
function rt(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ca(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ca(e, r) : cd(e, r);
  }
}
function cd(e, t) {
  let n;
  for (n in t)
    if (ua.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function fo(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Wt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Wt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Wt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function fd(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return ld(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function hd(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function pd(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function dd(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (i.data = { meta: t.meta }), e.patch(t, i), i = e.applyData(t, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(t, i), i;
}
function md(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function gd(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function yd(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Tt(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let s, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), s = e.footnoteOrder.length) : s = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(s) }]
  };
  e.patch(t, l);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function bd(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function wd(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function fa(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function xd(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return fa(e, t);
  const i = { src: Tt(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}
function kd(e, t) {
  const n = { src: Tt(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Sd(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ed(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return fa(e, t);
  const i = { href: Tt(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function vd(e, t) {
  const n = { href: Tt(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Cd(e, t, n) {
  const r = e.all(t), i = n ? Ad(n) : ha(t), o = {}, s = [];
  if (typeof t.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && s.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? s.push(...f.children) : s.push(f);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && s.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: s };
  return e.patch(t, u), e.applyData(t, u);
}
function Ad(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ha(n[r]);
  }
  return t;
}
function ha(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function _d(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const s = r[i];
    if (s.type === "element" && s.tagName === "li" && s.properties && Array.isArray(s.properties.className) && s.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Od(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Td(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Rd(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Id(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, a = fi(t.children[1]), l = ta(t.children[t.children.length - 1]);
    a && l && (s.position = { start: a, end: l }), i.push(s);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Ld(e, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, a = s ? s.length : t.children.length;
  let l = -1;
  const u = [];
  for (; ++l < a; ) {
    const c = t.children[l], d = {}, h = s ? s[l] : void 0;
    h && (d.align = h);
    let p = { type: "element", tagName: o, properties: d, children: [] };
    c && (p.children = e.all(c), e.patch(c, p), p = e.applyData(c, p)), u.push(p);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, f), e.applyData(t, f);
}
function Nd(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ho = 9, po = 32;
function Pd(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      mo(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push(mo(t.slice(i), i > 0, !1)), o.join("");
}
function mo(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === ho || o === po; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === ho || o === po; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Dd(e, t) {
  const n = { type: "text", value: Pd(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Fd(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const zd = {
  blockquote: hd,
  break: pd,
  code: dd,
  delete: md,
  emphasis: gd,
  footnoteReference: yd,
  heading: bd,
  html: wd,
  imageReference: xd,
  image: kd,
  inlineCode: Sd,
  linkReference: Ed,
  link: vd,
  listItem: Cd,
  list: _d,
  paragraph: Od,
  // @ts-expect-error: root is different, but hard to type.
  root: Td,
  strong: Rd,
  table: Id,
  tableCell: Nd,
  tableRow: Ld,
  text: Dd,
  thematicBreak: Fd,
  toml: ln,
  yaml: ln,
  definition: ln,
  footnoteDefinition: ln
};
function ln() {
}
const pa = -1, Bn = 0, _n = 1, On = 2, mi = 3, gi = 4, yi = 5, bi = 6, da = 7, ma = 8, go = typeof self == "object" ? self : globalThis, Bd = (e, t) => {
  const n = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, s] = t[i];
    switch (o) {
      case Bn:
      case pa:
        return n(s, i);
      case _n: {
        const a = n([], i);
        for (const l of s)
          a.push(r(l));
        return a;
      }
      case On: {
        const a = n({}, i);
        for (const [l, u] of s)
          a[r(l)] = r(u);
        return a;
      }
      case mi:
        return n(new Date(s), i);
      case gi: {
        const { source: a, flags: l } = s;
        return n(new RegExp(a, l), i);
      }
      case yi: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [l, u] of s)
          a.set(r(l), r(u));
        return a;
      }
      case bi: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          a.add(r(l));
        return a;
      }
      case da: {
        const { name: a, message: l } = s;
        return n(new go[a](l), i);
      }
      case ma:
        return n(BigInt(s), i);
      case "BigInt":
        return n(Object(BigInt(s)), i);
    }
    return n(new go[o](s), i);
  };
  return r;
}, yo = (e) => Bd(/* @__PURE__ */ new Map(), e)(0), St = "", { toString: Md } = {}, { keys: jd } = Object, Bt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Bn, t];
  const n = Md.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [_n, St];
    case "Object":
      return [On, St];
    case "Date":
      return [mi, St];
    case "RegExp":
      return [gi, St];
    case "Map":
      return [yi, St];
    case "Set":
      return [bi, St];
  }
  return n.includes("Array") ? [_n, n] : n.includes("Error") ? [da, n] : [On, n];
}, un = ([e, t]) => e === Bn && (t === "function" || t === "symbol"), Ud = (e, t, n, r) => {
  const i = (s, a) => {
    const l = r.push(s) - 1;
    return n.set(a, l), l;
  }, o = (s) => {
    if (n.has(s))
      return n.get(s);
    let [a, l] = Bt(s);
    switch (a) {
      case Bn: {
        let f = s;
        switch (l) {
          case "bigint":
            a = ma, f = s.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            f = null;
            break;
          case "undefined":
            return i([pa], s);
        }
        return i([a, f], s);
      }
      case _n: {
        if (l)
          return i([l, [...s]], s);
        const f = [], c = i([a, f], s);
        for (const d of s)
          f.push(o(d));
        return c;
      }
      case On: {
        if (l)
          switch (l) {
            case "BigInt":
              return i([l, s.toString()], s);
            case "Boolean":
            case "Number":
            case "String":
              return i([l, s.valueOf()], s);
          }
        if (t && "toJSON" in s)
          return o(s.toJSON());
        const f = [], c = i([a, f], s);
        for (const d of jd(s))
          (e || !un(Bt(s[d]))) && f.push([o(d), o(s[d])]);
        return c;
      }
      case mi:
        return i([a, s.toISOString()], s);
      case gi: {
        const { source: f, flags: c } = s;
        return i([a, { source: f, flags: c }], s);
      }
      case yi: {
        const f = [], c = i([a, f], s);
        for (const [d, h] of s)
          (e || !(un(Bt(d)) || un(Bt(h)))) && f.push([o(d), o(h)]);
        return c;
      }
      case bi: {
        const f = [], c = i([a, f], s);
        for (const d of s)
          (e || !un(Bt(d))) && f.push(o(d));
        return c;
      }
    }
    const { message: u } = s;
    return i([a, { name: l, message: u }], s);
  };
  return o;
}, bo = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Ud(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Tn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? yo(bo(e, t)) : structuredClone(e)
) : (e, t) => yo(bo(e, t));
function qd(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Vd(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Hd(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || qd, r = e.options.footnoteBackLabel || Vd, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", s = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!u)
      continue;
    const f = e.all(u), c = String(u.identifier).toUpperCase(), d = Tt(c.toLowerCase());
    let h = 0;
    const p = [], y = e.footnoteCounts.get(c);
    for (; y !== void 0 && ++h <= y; ) {
      p.length > 0 && p.push({ type: "text", value: " " });
      let v = typeof n == "string" ? n : n(l, h);
      typeof v == "string" && (v = { type: "text", value: v }), p.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + d + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(v) ? v : [v]
      });
    }
    const w = f[f.length - 1];
    if (w && w.type === "element" && w.tagName === "p") {
      const v = w.children[w.children.length - 1];
      v && v.type === "text" ? v.value += " " : w.children.push({ type: "text", value: " " }), w.children.push(...p);
    } else
      f.push(...p);
    const m = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + d },
      children: e.wrap(f, !0)
    };
    e.patch(u, m), a.push(m);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...Tn(s),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Rr = {}.hasOwnProperty, Gd = {};
function Wd(e, t) {
  const n = t || Gd, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = { ...zd, ...n.handlers }, a = {
    all: u,
    applyData: Xd,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: Yd,
    wrap: Qd
  };
  return ri(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, d = String(f.identifier).toUpperCase();
      c.has(d) || c.set(d, f);
    }
  }), a;
  function l(f, c) {
    const d = f.type, h = a.handlers[d];
    if (Rr.call(a.handlers, d) && h)
      return h(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(d)) {
      if ("children" in f) {
        const { children: y, ...w } = f, m = Tn(w);
        return m.children = a.all(f), m;
      }
      return Tn(f);
    }
    return (a.options.unknownHandler || Kd)(a, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const d = f.children;
      let h = -1;
      for (; ++h < d.length; ) {
        const p = a.one(d[h], f);
        if (p) {
          if (h && d[h - 1].type === "break" && (!Array.isArray(p) && p.type === "text" && (p.value = wo(p.value)), !Array.isArray(p) && p.type === "element")) {
            const y = p.children[0];
            y && y.type === "text" && (y.value = wo(y.value));
          }
          Array.isArray(p) ? c.push(...p) : c.push(p);
        }
      }
    }
    return c;
  }
}
function Yd(e, t) {
  e.position && (t.position = hp(e));
}
function Xd(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    n.type === "element" && o && Object.assign(n.properties, Tn(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function Kd(e, t) {
  const n = t.data || {}, r = "value" in t && !(Rr.call(n, "hProperties") || Rr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Qd(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function wo(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function xo(e, t) {
  const n = Wd(e, t), r = n.one(e, void 0), i = Hd(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function Jd(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      xo(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      xo(n, { file: r, ...e || t })
    );
  };
}
function ko(e) {
  if (e)
    throw e;
}
var gn = Object.prototype.hasOwnProperty, ga = Object.prototype.toString, So = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, vo = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ga.call(t) === "[object Array]";
}, Co = function(t) {
  if (!t || ga.call(t) !== "[object Object]")
    return !1;
  var n = gn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && gn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || gn.call(t, i);
}, Ao = function(t, n) {
  So && n.name === "__proto__" ? So(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, _o = function(t, n) {
  if (n === "__proto__")
    if (gn.call(t, n)) {
      if (Eo)
        return Eo(t, n).value;
    } else return;
  return t[n];
}, Zd = function e() {
  var t, n, r, i, o, s, a = arguments[0], l = 1, u = arguments.length, f = !1;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, l = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); l < u; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        r = _o(a, n), i = _o(t, n), a !== i && (f && i && (Co(i) || (o = vo(i))) ? (o ? (o = !1, s = r && vo(r) ? r : []) : s = r && Co(r) ? r : {}, Ao(a, { name: n, newValue: e(f, s, i) })) : typeof i < "u" && Ao(a, { name: n, newValue: i }));
  return a;
};
const tr = /* @__PURE__ */ Qh(Zd);
function Ir(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function $d() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    a(null, ...i);
    function a(l, ...u) {
      const f = e[++o];
      let c = -1;
      if (l) {
        s(l);
        return;
      }
      for (; ++c < i.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = i[c]);
      i = u, f ? em(f, a)(...u) : s(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function em(e, t) {
  let n;
  return r;
  function r(...s) {
    const a = e.length > s.length;
    let l;
    a && s.push(i);
    try {
      l = e.apply(this, s);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (a && n)
        throw f;
      return i(f);
    }
    a || (l && l.then && typeof l.then == "function" ? l.then(o, i) : l instanceof Error ? i(l) : o(l));
  }
  function i(s, ...a) {
    n || (n = !0, t(s, ...a));
  }
  function o(s) {
    i(null, s);
  }
}
const Ye = { basename: tm, dirname: nm, extname: rm, join: im, sep: "/" };
function tm(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  en(e);
  let n = 0, r = -1, i = e.length, o;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let s = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && (o = !0, s = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = s));
  return n === r ? r = s : r < 0 && (r = e.length), e.slice(n, r);
}
function nm(e) {
  if (en(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function rm(e) {
  en(e);
  let t = e.length, n = -1, r = 0, i = -1, o = 0, s;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (s) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (s = !0, n = t + 1), a === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function im(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    en(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : om(n);
}
function om(e) {
  en(e);
  const t = e.codePointAt(0) === 47;
  let n = sm(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function sm(e, t) {
  let n = "", r = 0, i = -1, o = 0, s = -1, a, l;
  for (; ++s <= e.length; ) {
    if (s < e.length)
      a = e.codePointAt(s);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === s - 1 || o === 1)) if (i !== s - 1 && o === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", r = 0) : (n = n.slice(0, l), r = n.length - 1 - n.lastIndexOf("/")), i = s, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = s, o = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, s) : n = e.slice(i + 1, s), r = s - i - 1;
      i = s, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function en(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const am = { cwd: lm };
function lm() {
  return "/";
}
function Lr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function um(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Lr(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return cm(e);
}
function cm(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const nr = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ya {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? Lr(t) ? n = { path: t } : typeof t == "string" || fm(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : am.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < nr.length; ) {
      const o = nr[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      nr.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Ye.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    ir(t, "basename"), rr(t, "basename"), this.path = Ye.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Ye.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    Oo(this.basename, "dirname"), this.path = Ye.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Ye.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (rr(t, "extname"), Oo(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Ye.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    Lr(t) && (t = um(t)), ir(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Ye.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    ir(t, "stem"), rr(t, "stem"), this.path = Ye.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new xe(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function rr(e, t) {
  if (e && e.includes(Ye.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Ye.sep + "`"
    );
}
function ir(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Oo(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function fm(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const hm = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  }
), pm = {}.hasOwnProperty;
class wi extends hm {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = $d();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new wi()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(tr(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (ar("data", this.frozen), this.namespace[t] = n, this) : pm.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (ar("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = cn(t), r = this.parser || this.Parser;
    return or("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), or("process", this.parser || this.Parser), sr("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, s) {
      const a = cn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(l, a, function(f, c, d) {
        if (f || !c || !d)
          return u(f);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), p = r.stringify(h, d);
        gm(p) ? d.value = p : d.result = p, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function u(f, c) {
        f || !c ? s(f) : o ? o(c) : n(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), or("processSync", this.parser || this.Parser), sr("processSync", this.compiler || this.Compiler), this.process(t, i), Ro("processSync", "process", n), r;
    function i(o, s) {
      n = !0, ko(o), r = s;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    To(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(s, a) {
      const l = cn(n);
      i.run(t, l, u);
      function u(f, c, d) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || t
        );
        f ? a(f) : s ? s(h) : r(void 0, h, d);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, o), Ro("runSync", "run", r), i;
    function o(s, a) {
      ko(s), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = cn(n), i = this.compiler || this.Compiler;
    return sr("stringify", i), To(t), i(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (ar("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : s(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(u) {
      if (typeof u == "function")
        l(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          l(f, c);
        } else
          s(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function s(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (i.settings = tr(!0, i.settings, u.settings));
    }
    function a(u) {
      let f = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++f < u.length; ) {
          const c = u[f];
          o(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function l(u, f) {
      let c = -1, d = -1;
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          d = c;
          break;
        }
      if (d === -1)
        r.push([u, ...f]);
      else if (f.length > 0) {
        let [h, ...p] = f;
        const y = r[d][1];
        Ir(y) && Ir(h) && (h = tr(!0, y, h)), r[d] = [u, h, ...p];
      }
    }
  }
}
const dm = new wi().freeze();
function or(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function sr(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function ar(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function To(e) {
  if (!Ir(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ro(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function cn(e) {
  return mm(e) ? e : new ya(e);
}
function mm(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function gm(e) {
  return typeof e == "string" || ym(e);
}
function ym(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const bm = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Io = [], Lo = { allowDangerousHtml: !0 }, wm = /^(https?|ircs?|mailto|xmpp)$/i, xm = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function km(e) {
  const t = e.allowedElements, n = e.allowElement, r = e.children || "", i = e.className, o = e.components, s = e.disallowedElements, a = e.rehypePlugins || Io, l = e.remarkPlugins || Io, u = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Lo } : Lo, f = e.skipHtml, c = e.unwrapDisallowed, d = e.urlTransform || Sm, h = dm().use(fd).use(l).use(Jd, u).use(a), p = new ya();
  typeof r == "string" && (p.value = r);
  for (const v of xm)
    Object.hasOwn(e, v.from) && ("" + v.from + (v.to ? "use `" + v.to + "` instead" : "remove it") + bm + v.id, void 0);
  const y = h.parse(p);
  let w = h.runSync(y, p);
  return i && (w = {
    type: "element",
    tagName: "div",
    properties: { className: i },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      w.type === "root" ? w.children : [w]
    )
  }), ri(w, m), bp(w, {
    Fragment: Sl,
    components: o,
    ignoreInvalidStyle: !0,
    jsx: ue,
    jsxs: Nn,
    passKeys: !0,
    passNode: !0
  });
  function m(v, S, O) {
    if (v.type === "raw" && O && typeof S == "number")
      return f ? O.children.splice(S, 1) : O.children[S] = { type: "text", value: v.value }, S;
    if (v.type === "element") {
      let _;
      for (_ in er)
        if (Object.hasOwn(er, _) && Object.hasOwn(v.properties, _)) {
          const x = v.properties[_], P = er[_];
          (P === null || P.includes(v.tagName)) && (v.properties[_] = d(String(x || ""), _, v));
        }
    }
    if (v.type === "element") {
      let _ = t ? !t.includes(v.tagName) : s ? s.includes(v.tagName) : !1;
      if (!_ && n && typeof S == "number" && (_ = !n(v, S, O)), _ && O && typeof S == "number")
        return c && v.children ? O.children.splice(S, 1, ...v.children) : O.children.splice(S, 1), S;
    }
  }
}
function Sm(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i > -1 && t > i || n > -1 && t > n || r > -1 && t > r || // It is a protocol, it should be allowed.
    wm.test(e.slice(0, t)) ? e : ""
  );
}
const Em = _t.memo(km, (e, t) => e.children === t.children && e.className === t.className);
function vm({
  data: e,
  id: t,
  type: n
}) {
  return /* @__PURE__ */ ue(
    Em,
    {
      "data-type": n,
      "data-id": t,
      remarkPlugins: [Ih],
      className: "leading-snug font-medium text-sm",
      children: e.message
    }
  );
}
const xi = "-", Cm = (e) => {
  const t = _m(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const a = s.split(xi);
      return a[0] === "" && a.length !== 1 && a.shift(), ba(a, t) || Am(s);
    },
    getConflictingClassGroupIds: (s, a) => {
      const l = n[s] || [];
      return a && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, ba = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), i = r ? ba(e.slice(1), r) : void 0;
  if (i)
    return i;
  if (t.validators.length === 0)
    return;
  const o = e.join(xi);
  return (s = t.validators.find(({
    validator: a
  }) => a(o))) == null ? void 0 : s.classGroupId;
}, No = /^\[(.+)\]$/, Am = (e) => {
  if (No.test(e)) {
    const t = No.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, _m = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Tm(Object.entries(e.classGroups), n).forEach(([o, s]) => {
    Nr(s, r, o, t);
  }), r;
}, Nr = (e, t, n, r) => {
  e.forEach((i) => {
    if (typeof i == "string") {
      const o = i === "" ? t : Po(t, i);
      o.classGroupId = n;
      return;
    }
    if (typeof i == "function") {
      if (Om(i)) {
        Nr(i(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: i,
        classGroupId: n
      });
      return;
    }
    Object.entries(i).forEach(([o, s]) => {
      Nr(s, Po(t, o), n, r);
    });
  });
}, Po = (e, t) => {
  let n = e;
  return t.split(xi).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Om = (e) => e.isThemeGetter, Tm = (e, t) => t ? e.map(([n, r]) => {
  const i = r.map((o) => typeof o == "string" ? t + o : typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([s, a]) => [t + s, a])) : o);
  return [n, i];
}) : e, Rm = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const i = (o, s) => {
    n.set(o, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(o) {
      let s = n.get(o);
      if (s !== void 0)
        return s;
      if ((s = r.get(o)) !== void 0)
        return i(o, s), s;
    },
    set(o, s) {
      n.has(o) ? n.set(o, s) : i(o, s);
    }
  };
}, wa = "!", Im = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, i = t[0], o = t.length, s = (a) => {
    const l = [];
    let u = 0, f = 0, c;
    for (let w = 0; w < a.length; w++) {
      let m = a[w];
      if (u === 0) {
        if (m === i && (r || a.slice(w, w + o) === t)) {
          l.push(a.slice(f, w)), f = w + o;
          continue;
        }
        if (m === "/") {
          c = w;
          continue;
        }
      }
      m === "[" ? u++ : m === "]" && u--;
    }
    const d = l.length === 0 ? a : a.substring(f), h = d.startsWith(wa), p = h ? d.substring(1) : d, y = c && c > f ? c - f : void 0;
    return {
      modifiers: l,
      hasImportantModifier: h,
      baseClassName: p,
      maybePostfixModifierPosition: y
    };
  };
  return n ? (a) => n({
    className: a,
    parseClassName: s
  }) : s;
}, Lm = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Nm = (e) => ({
  cache: Rm(e.cacheSize),
  parseClassName: Im(e),
  ...Cm(e)
}), Pm = /\s+/, Dm = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: i
  } = t, o = [], s = e.trim().split(Pm);
  let a = "";
  for (let l = s.length - 1; l >= 0; l -= 1) {
    const u = s[l], {
      modifiers: f,
      hasImportantModifier: c,
      baseClassName: d,
      maybePostfixModifierPosition: h
    } = n(u);
    let p = !!h, y = r(p ? d.substring(0, h) : d);
    if (!y) {
      if (!p) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (y = r(d), !y) {
        a = u + (a.length > 0 ? " " + a : a);
        continue;
      }
      p = !1;
    }
    const w = Lm(f).join(":"), m = c ? w + wa : w, v = m + y;
    if (o.includes(v))
      continue;
    o.push(v);
    const S = i(y, p);
    for (let O = 0; O < S.length; ++O) {
      const _ = S[O];
      o.push(m + _);
    }
    a = u + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function Fm() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = xa(t)) && (r && (r += " "), r += n);
  return r;
}
const xa = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = xa(e[r])) && (n && (n += " "), n += t);
  return n;
};
function zm(e, ...t) {
  let n, r, i, o = s;
  function s(l) {
    const u = t.reduce((f, c) => c(f), e());
    return n = Nm(u), r = n.cache.get, i = n.cache.set, o = a, a(l);
  }
  function a(l) {
    const u = r(l);
    if (u)
      return u;
    const f = Dm(l, n);
    return i(l, f), f;
  }
  return function() {
    return o(Fm.apply(null, arguments));
  };
}
const oe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, ka = /^\[(?:([a-z-]+):)?(.+)\]$/i, Bm = /^\d+\/\d+$/, Mm = /* @__PURE__ */ new Set(["px", "full", "screen"]), jm = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Um = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, qm = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Vm = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Hm = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, et = (e) => Ct(e) || Mm.has(e) || Bm.test(e), it = (e) => It(e, "length", Zm), Ct = (e) => !!e && !Number.isNaN(Number(e)), lr = (e) => It(e, "number", Ct), Mt = (e) => !!e && Number.isInteger(Number(e)), Gm = (e) => e.endsWith("%") && Ct(e.slice(0, -1)), H = (e) => ka.test(e), ot = (e) => jm.test(e), Wm = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ym = (e) => It(e, Wm, Sa), Xm = (e) => It(e, "position", Sa), Km = /* @__PURE__ */ new Set(["image", "url"]), Qm = (e) => It(e, Km, eg), Jm = (e) => It(e, "", $m), jt = () => !0, It = (e, t, n) => {
  const r = ka.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Zm = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Um.test(e) && !qm.test(e)
), Sa = () => !1, $m = (e) => Vm.test(e), eg = (e) => Hm.test(e), tg = () => {
  const e = oe("colors"), t = oe("spacing"), n = oe("blur"), r = oe("brightness"), i = oe("borderColor"), o = oe("borderRadius"), s = oe("borderSpacing"), a = oe("borderWidth"), l = oe("contrast"), u = oe("grayscale"), f = oe("hueRotate"), c = oe("invert"), d = oe("gap"), h = oe("gradientColorStops"), p = oe("gradientColorStopPositions"), y = oe("inset"), w = oe("margin"), m = oe("opacity"), v = oe("padding"), S = oe("saturate"), O = oe("scale"), _ = oe("sepia"), x = oe("skew"), P = oe("space"), N = oe("translate"), F = () => ["auto", "contain", "none"], k = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", H, t], R = () => [H, t], M = () => ["", et, it], G = () => ["auto", Ct, H], q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], J = () => ["solid", "dashed", "dotted", "double", "none"], re = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ie = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ae = () => ["", "0", H], b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [Ct, H];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [jt],
      spacing: [et, it],
      blur: ["none", "", ot, H],
      brightness: D(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ot, H],
      borderSpacing: R(),
      borderWidth: M(),
      contrast: D(),
      grayscale: ae(),
      hueRotate: D(),
      invert: ae(),
      gap: R(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Gm, it],
      inset: L(),
      margin: L(),
      opacity: D(),
      padding: R(),
      saturate: D(),
      scale: D(),
      sepia: ae(),
      skew: D(),
      space: R(),
      translate: R()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", H]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ot]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": b()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": b()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...q(), H]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: k()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": k()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": k()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: F()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": F()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": F()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [y]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [y]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [y]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [y]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [y]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [y]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [y]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [y]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [y]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Mt, H]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: L()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", H]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ae()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ae()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Mt, H]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [jt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Mt, H]
        }, H]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": G()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": G()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [jt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Mt, H]
        }, H]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": G()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": G()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", H]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", H]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [d]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [d]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [d]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...ie()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ie(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...ie(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [v]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [v]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [v]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [v]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [v]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [v]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [v]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [v]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [v]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [w]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [w]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [w]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [w]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [w]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [w]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [w]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [w]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [w]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [P]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [P]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", H, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [H, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [H, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [ot]
        }, ot]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [H, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [H, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [H, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [H, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ot, it]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", lr]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [jt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", H]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ct, lr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", et, H]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", H]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", H]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [m]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [m]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...J(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", et, it]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", et, H]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: R()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", H]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", H]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [m]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...q(), Xm]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ym]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Qm]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [p]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [o]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [o]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [o]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [o]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [o]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [o]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [o]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [o]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [o]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [o]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [o]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [o]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [o]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [o]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [o]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [m]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...J(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [a]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [m]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: J()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [i]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [i]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [i]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [i]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [i]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [i]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [i]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [i]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [i]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [i]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...J()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [et, H]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [et, it]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: M()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [m]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [et, it]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", ot, Jm]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [jt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [m]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...re(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": re()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ot, H]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [c]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [S]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [_]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [c]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [m]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [S]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [_]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", H]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: D()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", H]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: D()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", H]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [O]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [O]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [O]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Mt, H]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [N]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [N]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [x]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [x]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", H]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", H]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": R()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": R()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": R()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": R()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": R()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": R()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": R()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": R()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": R()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": R()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": R()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": R()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": R()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": R()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": R()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": R()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": R()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": R()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", H]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [et, it, lr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, ng = /* @__PURE__ */ zm(tg);
function ki(...e) {
  return ng(_l(e));
}
const Si = $r.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ ue(
  Ot.Root,
  {
    ref: n,
    className: ki(
      "relative flex size-6 aspect-square shrink-0 overflow-hidden rounded-lg border bg-secondary",
      e
    ),
    ...t
  }
));
Si.displayName = Ot.Root.displayName;
const Ea = $r.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ ue(
  Ot.Image,
  {
    ref: n,
    className: ki("aspect-square h-full w-full", e),
    ...t
  }
));
Ea.displayName = Ot.Image.displayName;
const va = $r.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ ue(
  Ot.Fallback,
  {
    ref: n,
    className: ki(
      "flex size-full text-sm items-center justify-center rounded-lg",
      e
    ),
    ...t
  }
));
va.displayName = Ot.Fallback.displayName;
function rg() {
  return /* @__PURE__ */ Nn("div", { className: "flex flex-col items-end wfull gap-1", children: [
    /* @__PURE__ */ ue("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ ue(Si, { className: "animate-pulse bg-secondary", children: /* @__PURE__ */ ue(va, {}) }) }),
    /* @__PURE__ */ ue("div", { className: "w-1/2 min-w-[60%]", children: /* @__PURE__ */ ue("div", { className: "bg-secondary p-6 rounded-lg animate-pulse" }) })
  ] });
}
function ig(e) {
  return /* @__PURE__ */ ue("div", { className: "w-full max-w-full overflow-auto shrink-0", children: /* @__PURE__ */ ue("pre", { dir: "auto", className: "text-xs leading-tight", children: JSON.stringify(e, null, 1) }) });
}
const og = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABlCAYAAAC7vkbxAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACd2SURBVHgB7X15lGZHdd+99b6vu2dfNNIghIgEYonELhkQIGDACB8WOUAsMBgbjA9yYiIHEjA2OO4Tzsk5JCeHBIEd2+AQUBJHAmFAQiBrQ4A2tDHDKEH7vs1oZnqme7q/5dXNrap7a3nf6+nu6ZmR/qD6vP7eV69evXp3+d2l6r0P4FflV+VXZf6C8DQuRGS+dt99Yx/7zuPrBp3hJgN4VLcDGwDN+g7iKiJYwTfQ5ZYVIFogHBLCXF3XM2RpL3/ZXVewq7N/sPN5R6/f9V8/+JLeFsQhPI3L04ohzAB826U3rLntYTqOiX/KjtnBS7n6ZCbyc5FgIxmzlofcWXyPlrj9LN/kk9z3I7y/rVuZX6wbN7etm4V737fzlbsnJ5mRT6PylDPkAqLqC1/dvu7W/q4XD2vaYhBfBmRewJTcjEQrWfY7rAnoyWbceM3SxswdkTuDO+P9ITO2z59PVpW5t7ZwC/d25abxVbf9u5cPHj/ntNMG8BSXp4QhThNe+o2tK3eb3sk7pvrvZkq9tiY6mYezBslpgCc6OmqSIXeGRdLxLp0hzEj/IX2kI+4PaYYV6d6xqnP1+vHuZXtruOGrG07dffbZWMNTUI4oQyYnyVz0nGs3Pbi3etOMHb4LjH0NU+QYPsRMQBOHQzoshzjun6U0XnPox0y++yH3Ps08um2ia769ultdftagc+ffnHNkteaIMGSSjfNXvnrd+qm+fd2Q4A+GQ3gdV68Fw5SPIzggQ7SN2w7fmL0aoSWsZ1lCfs4wecHm1cP/c++H3vgE4pGxNYeVIQ6aXvh33139JD3j9dO9wfvI2jMt4Ea+aYMOLJxotjIkHyFlNY5TBg7fgMNGhkeJDJ41zPH1t41X5r+Nb1jxw4+97+WPTR5mxhw2hpz619S9b8W1Z+zr2w/RAH+Dbep6rq6S+HONEEC+m6edFx7HRj1TwU3GmC+fumb1D37ygZfshsNUDg8FLtg+NrHvyd+rrf0cX2ITWmMgswJayMmalSP0NGSIluSp7eH459vdavxT+845bScchnJoKcAQteHrP34xuy1/TkP8Z8ZihTXzwqEM0si12HeCgEl8zGLWDQh8tPhGh3P88xXvjzl5qT1jEMw2Y6s/e9F4ddnNh9joH7IbOun869fu7vXfPUPwaarsiVCbjvaP4S7cjRXXI/Fsna1p7TSgNXlsi/CWNzVHhiF+FPLp5IOFBy3uHevgFzevPfq8u3/3pCfgEJXl3xAT87iv37hxX907lwOtjxJUx9TGkVpFHgNDHNEbDpINDJGbpba+g5I4xrjAzgcU3A85f8D3jXCA0w9XoeCRuG2/MfSdcYTPTv2L193Lw1n2KJbFECfZGy669dnDfdOfZpq9j1mwznAsTAYksDvwRSxhOzVJT6cEX8En9ceotnI8eWWkXbSR5FDqkdgT44fmA9cayVy70lSf+Pg/fdXPJ7csL1d20EN1zDjuwp8ev7dff5HH+OtctdKTzHokwsXECx6JAhwFakfkcoR3hoeC4c+JbBOTSF3gjBlRo7QcLi+Z9D49X5yffMOEwf/0268cu+RvlpGCOSiGOGac+K3rXvBk3/4Hzqr+prNyAVIyV4oW13cy4JikPD9um/uU2jse5pcV5pXaUijr4SxOnG6f6MKfvHXDwz+48OyzDyr1suSROmYcf/ENJ+2ZnvsSD+EM7mGCP72sqG+bwTukigUuaTPiu9gLM2kXzYnIpTxpMtGSutJZncDcyAUPA5O8ptDWFeOdz3xl3QM/PPsgmFLBEsv/PuWtx+2s587j2zmT4+2OV1tnMzj2RvdZhRDPZad87waCBTTBJvv2KrT5BhIamnR3qMdM2PzxjNGaSNHNcQNDuiXUQWrg7e1iBGM5JYjlMXVtT7/cHr31U6945gNXX331kgz9kkb1sm/fuv6+wdQXrIEPsNRV/ta9AUePWFkGquyZcixrXFIgx8cklNXpSRaL4aqWjNgKV632pc7GYaukWVaudURgzN6yfqJ6746PnH73UryvRY/qnd+9aeVPe/s/zS7FJ5n6Y07sHFJ53AAcIXWRjmqt1apARKqNQBMV7ague9B9bztsgixE6cdtw7x7TPapljGQ1LeWQ8YoHp29rEL70dk/esODiz1pUVd/41VXdbbvMu/hOPUv68psQBXNYDqW4aklt1WJxgnICFVkKaobSZvoiQknSCL6wr6wClPUPIj89U6A9mlV26ih0odGe8RtHPCE21+eBOs/u/2PTplezHkLOoXOiG/d290yNPSnPHu6HgXGA0azjjBwLWkz2YbWS3b4zvuV9W2ivTCK//qdxI5QpBuKIcGWfZTBRrOjNiqeS7HNIUcwLzvY5Ym3D9xrp9770b++qbuY0xacnz7ue1cfxZ3/MXbhFGutCTeBYi9tcq0WWcgmrAjdCO6rra9UqhHESun9idSrgeAaG+QpeNxB+hFUiQRGXROxT/4yBkGBEah0EGhJd3LAuyTtlOV50wDtx79ZD7fz+G/ABezJATXkty64gGe08behwi0uFWLMgNOFQ0txCwZkKZthgujmNMAxJXyHmAjhdAQY1aZK963UByK7OtNhjTK1Pxa1Ss4z2XngtM+fD+E6buukTbzBzMNbdglya6PMvWDa1p9Y++UrNi504vxDYFrfsOHYLX2sP2aqeswRomKHxc8sFfADB78VUKQwFpJEEU6KczAQTqEo1mFymbUeYeR8g6KFynxxqeO+wteyS+rQ64MDdoK3z9GK957CUxMHOnNeyHrWD3+4YaYa+7d8w8+pnE8qQOvyVGhU63FRmYlCR/PQGxOU6C2Q5A99RhX1bIEiK8BmkrF2EIcerlDWLFCYWhGXy4c9KF9rsU+uWwd3GNqQ7uqw7KGEr9A3d7mCafmxB/btuZWh6/r5oKuVIc6QP+eqq/55j+i13JsJ6XO1GxjSTGJCMIswoNU4UgpD1FOSoksX1EYrFfwSk2hfkhss6XqxBZl77HmcqOq8wOh9KePyGIcCpsSYRry44HdpMi6c286YpXlinnyeDPS8Xo/++KWXXbaVq2fa2rYy5Iyf/GT9HMB7KoQVHuCztQjk8yQyLPFU4jBbmE75ZxDuPEqM6oFSQ6ABJo0EmIFIIQhVzSEZiF6b8iuTCFBWG40+xi7k+iT1GGOacIM0EoAeVAlT8Q7xt+x5dN0Lef/mtmatiLMDh+9lCXy1wz5QuE5bhs/k7YpubqLWG95iAzHeYTqp4n+VnG94x3Rkq4zsu08+1iXvBntDXCUbYTpc7zdnkE0amNuXvoKr67w09JAWHYgqbMZgdIdz+xTdX7nhkAYamcZZVrFEG6bm6Pe/eOed423HRy71r+688+iLHrn/cr7lFxkKfofLmTHrYjSIoiSeQDBfSTBDmqWOsJC30IEEsXUwYVX6balhIZmofZEYHIEVDQalt5iityjQEyQ9KpfN2kg7TXAW9bF9tj9CwoU4RlCcSbijIvOBuXNPv7ytt6K88Cc/+r3pYf0lvu9VlQABGeYr1oIghoXOxJ7n90pKchdp8qycvGo1nHnU0fy5xu8fqJcFD9LSznXHp/o1b0PYumsavnz7w3D/vn5kIMkEGgkDNR822u/S/GWeceQMFF742p39D149uaWY0CqoefoFF6x4fPNRl/QBXu/jJzRBQ9yqSpPCt6pNiQWG0nc15Fg4Vjr4tZ0OnHvcCfD7z3wWPJ3K+Xc9AZ+68R7YMzcsZjRj8tNrUZMlS2RIMG47n7Fh4s0Pvf/UrfP2NP2sZ7ySFeDULsMxYz16DOetqjzuM0xzlYH2dEnu+2NwRXVxQ2oXDP/xE+Nw8UtOe9oxw5XfOekYuO6sl8GGlZW3V95mNWMkA8uzK0640W6cme6/3y2vLQ7pDtuOcU4evosJv7rDlizObXRCdFvxP8ObM8ouwBrZTCNPJYbSaCTu24UI+7MnPA+eNT4BT9fyT1ZPwN9vOVmyByn41QA0zrHAwRYXDxFOD4dnXX7atnX5kej23rlz57FDsm9ACfs8WAm7JECGA6KyPyfzI2P7YPSsZFnftekZ8JYNm4pTp+oh3D07AzsHfQFsdYIxfaWyxxRDNG41r6OSBpDNp+ixLhN2w1gHTl67ClZ10nzdGZvXwe889xj4BkNYcpUpibD0d1AuMepY8YTH9s46F/g6PRQZ8iDOngoVnUQyn+MJjJQlASQ2nH8iIZIxBRjySSYwmHffvenY4py9zIzrpnbBAGQlScaQgrAN4sYqyk6LJ4knllWFoBxLf4c/Z90YhkN4ZLYHbzhmA6zvptDsA8/dDOff8/iIEPj9KHu4gPfQUsQ75DGN75mhX5/cvv3myVNO6btDnt8fpZu63YpeB1W9Ejhh5zbDgYzjTcVnGc0tGbEDcSttCKQcOJScDOev7VbwytUbirHdMj3l3dwKQ3wS4hTZF5jzuT+BvQoT/Pl9yVFV2abHtG0F+TmQ+pZz3eZ8yOt3ThVjc1qybrwTxENybrogS+sOalULRULB1Nzwjdc9iEfpIS8O+34x3MiJ9VcbBv1ak9cGdHa2Ifmg36TLXGdz5aGRuuMnVkBe9rF29DidXrUsQCymWUvFCd8BS2XFhnaJSJOIM8VKEPXCTFFC4zmG1f1DCys7iconsD3ZOpgJgbZrZqR9vu7vYHJfkmIgsi/+5RPTz+cvj7la4/JWe+zwxAHUz/aObiaBgGmhQQxi/XBsYwIIYxolbalepWptp1xTMSSKEq0ZgAoh04QkwUlr1KblWpRpgYGoCapdrk1H+wSI1/N9GncsZRD21+VCkXXjldx/w5M0wvEcCSKxabEw5qLstY/u6/+aSlfnQrZrj3V6L2OOb/QCkPw58gl9DaJFjtKFbRCYBSYR/CoyCURGc10kq3Mxq1HmhxvOgu+oEakXyVNFxRAtwcyUgFaFtvmzQLlxUOVqurOBARaSZc9GqtpnwsKakBmAzIa20wZzbTdmrEZ4NXzjMgcfM53PbbtkFdH4S/nCYwJSOqvio3CjqiH12LCuCz2/EoaFcu1ygIGhbScp4RMsCN1agnMsjW7OXCppWK7dw9ImR4FvckQGScKslKQIn161KQSLNtCIFoNfWRPGrRceZ9ZteNgxZALXrO5B/yQT1jD7roxJo0r8yNZJ6a1jG4ma94PqM44QHwVGQo/qLkGU9rgrNiBJL6b24DNtnumFoyWuleh4SQttKNMmIn+t2WqIkIuFDfPpf4WmXIEMxRWUiyp+/gY2mMG4cz8f6rBZ3UxoT3TQ47K1HvYNxvSA2AA1QZg/roEAi4hYo2UduWG1GYG0piHp8WwoIY0K9HAjqxAjbaJnLkw11Ey+h3OJMiJmrvPI/Yh3CZrMdEW9LVklqXNEvkqlIV9ntkBhsq7f1Zs9idXh5g53+EyGkjVh9SH56UDfqBIDjko6yu1LvD9sVowUGTyEuKZZTNQGClKOInx6NskNN64RPSw55vqxFpIpgejIFI/8JPjOOIoQ5z9G+IEQ0/K6gCA6ljl8mdBJca1FLST1FBhjdTjh3Evv6nZozG5muJqwRhPg1lMu2NWYFAf5GuGrBW3nL6hG3bYMB9NNqSFHzNYJKwOafTYE0NFVgs8EdXK+PKQFWAaLMqhCQ0aGrpBlUIJLygREoSz1qs+oEqobsSgqVf3aPvu8Rx8f61RoNjLLx0J2N1zHiEFXaQsfclG5eLXgpXBkt2HTQTLHsU0BT4TZRw5Zaa8gIGIZqxTtsdE3FAxVbdLYtigmGXM/llp60tgjzT9ng1NYNYuDLXKPANlNMEMTHc7kbiBZcx0AI8wo+9m+7GbTOBGgjRnY1ICU9InLPVsALhp10tbZwYxyTY+TMrwMdAkPVunJlLm/KmkE7RwjnJ9uKIYOZQILIF1bF3DHJ/YSihae24IlCNP6FeO4gmMiWq1wJAddtOjtuhhhOZQI3ApWSA0vymZ7mG6uUQR61bOUK8i9FHaiZE4+N58NIsYdBrOF2QDRkwKAMhbB7DyAFkELzoiu86AIUUmzI+ph0mgU8U7LWVpoVhDCrLRDcJAF41YTe2LEjXsqLYTqWN6qQGYrKSA6BK5UWZshQDS8zXNMJukgRIqMwbwaoynIe6CC4rGL9v1MYmMgqFUjfeslJNYSvPUeVzQ4lOROFyva3L5YWTkJB8rJhmJhHKpu1eEJp/Gka0ErUDUysx+jq0tapL3YT+2dS31Ahug9gUpb2X+QeoIRL6iALtEeIA1si/PDjsKauiZCRMJc4MsxSso9vEwI4+rGBMMybkd0XQViU1sfubu6hTwujs7J9jo8F2V4UlC4bdJqds0j6aDKGCJpy4h4y0fuJVXyOR9kNUjQ6u1Q4Y2l5T+ZHU2MgRzumtCGsXm5H763wbHmLf2VhSGeAQgJsgTJwnFMx40MtybMBH+0GLdKo3ILbmT9KwR+KNFCAjHcpV+2A7JKsYWoLTQt6pQ5nSZpsDTqUa6xSShIUIaBudGitUB00ybFznAUbAsxa1H8fLrWy72HINHh6ERRvIHCoIur7CfnjXc0xMMxMHqlIJpsQ2xtxQ9Jrm6QFI07AjPS8WRYkpxhE0uyotGracQhSYAg9h1tApQeUiHpVHaSOwMNtGskJzNnAEe7AmgTLmzRAhFayWZQfhwTVGkkEgnZovkZkXjmo08dNt59RSMPTYAZFAXPSQmnkbvJAVcma0bzmlF2IrPa4MmMona7i5tXZe6tZ6FQONkgiOI+6lHJ14w4MUGL0DIaSATOmOIZHIgh8CSMUGdB7YfvJFPZ+ZiC0IPx8WGnQ5bnZZwqojgywhSQOQUQw8bikLS3HLaB+aP2XKPaMrt5OqaALa3LiBTZUHAMy4eqIsFy6kPUJOVL1G2imO5vo1V0bIzAVG4n9LkU0APhYqhUxPCdFLpU8y2Nst6YHg5h6Iz6PkM2MFDXHLuYAkK4KBNV/mqJ8CVm4Ej3TTNKxc2leijWDERNgmw9bqYhsS5qMECaO88GgRl8lU0TQ7BxUSjbxmKCx6tvBonJEEko+pK/WCIDD3n3gYe26A16LwxGC9kZU0Pf2ZApXRkaICuol/H9kUKK782IJJUeVy3437yT1MaCOg31yL0bwRj1ZBIN051FG0FJP2PvmQOgicgEV5Qkn3SZuBzLISzxHtqyCSH7DQnKFRdNlKCQ3VUJs+nc0mPM3SzRN1nSzzSdmkWa7TD+7YKKajfYCtLLKpwBRkEyHXkMCnFU4nHkZvTaFMcx6vZi5m8ErDG5DmaEUq41hL5sEzVEMsCAEQbjubKSP59eL0dUFpMuHSTeSocZ44OnQMl50kceSBOSoCnsoO++2qWvSPAM3RMYO2F8pt+hDjzCZ+yvkFZ2kIJQqR0xmeeVETxMacZv8p9a4wwQqaWWmwVoBoZYEiYnWkukWzABdKYuSF9kHDYoj7ktguQFAfhE50QjA3r79HRkYJ4Fwfwa+fAa0BUrEaIgB9mjlMlxUQrgfZw46XW6hI+x8d7Fd7MJgkHwzfLAMNwYyOE0ZyJkSLalbTpXwNTPdzQYFucaqLwXGu2lkGiFgry3YA5yqjTgQsafu74kGkliUNZ0ysdlHpqbg311HbXfM0VmBLM5sDRPImyK8ydyj5C8NAQq74/YcHB/dccx5ENv7Hc41ftEr6L7BkTPj497+Y7E+8juupILJMKGKbPkKs9XgjRVLW0qvSnAhKzptKKm6X2NXIXyK5Zjb2oISico8LOGY+RVVcmQ//LAvXyzwe6hW+xnMSRKTaG6iTs6VyLpFqgEr9zTwU4ohTkR4izoSKaOWzVx510MPR0cW7XH2L33cLrdx5MmE1eDSeq0r6ARGdkyuzZvwfj+pbIaMhiEojsPH2uqsXZ1macsoWlRqhZpeqg3B9984tFiTAm7IIvIMYtuG/ClBh5xFNbkU0Blx1zVf9ztdF51/8TctSfMbLM0HHLePT4hqmudAEq3VhONKaZIrJiPKTYuGRo9NhoYBmasNl1ImbUjW9zS0vfffoukPqixbiGnfPLL4oSng4G6cBcFtbldrc9bYsQvr18G7ngIV+1xzY173/lKHLuVD085Qrj+/MIxCEtI/ZJSt7nH1+QxNV1eWhVbWH6atrQEVRe94Txz6vnmFrQpM+igZf7gy0P9OThr+43wcH9Wxi/jlnvxE3cZnPu1ayZbapstqPPoRJlAu1Ui5N+aRPo2Cvf6DWb69fDBl7hlxmEp6aqxsXtmerMMmOBe+00mmcAsfxXDL4lH5pmoapTcSGPLsXz5jruBldjNYOzIqceN03vgij1PwEU7H4OpwTB6GBqZo75pSLG7eNk2ScLuwBpdzFU5LoU3T+xlFv0M5JBnyPNWj++e6neu58j9VY5vaSmpEiblq8KyzmaSsJx/T1cNxS2m9gaqOUDAaEfc5wp5/VZevjV7F/xo7uH4iFlY0xtQwZlbnTlw9bUNa7RqT59gbN05iiDupTRWacf1ro1bOfpwr+fbWUnGegm3ogJO6m0idOYURg8xZIExeF9a7zyreedAMrfS4Hac3X+30toz5Bw8bXDO7kuv6RB8pEZYhXEiMmkFiotooKQ7gT7ZDQAHWLFXemclU1y/41iNMOMf5u6Ei3gLD3s6YpkYzQeiC7EpRPHKkKEQ1z+SwsSsZWjWVkW9+6xt4EAavxptiukVVCIXnhRAXOCQ2wuEbBKMIE/U6totz0TJoa2fqK54/Rue9fiF/yb0EoV2PXVuYr/ujkpw3MjUZbQJ3rsK+yKngTCyDfnbECDbqNhq177FhlSeGaOa8R1mhGOIUacCk6YDpLXxuYDkbfQ4IOqrTLxLg2LfAjFlpVtc8UbSd8pyq/76axmKEJX6aKBUpChlAwxusGejCeE7+jfw0exRK8w/XijPhrgSHW+q9+/uVuM/tta+ArLBxIwvQJSQCAsQ8kOLNb3NZyXdbY5hZwR2v9e7i7e7/dSvCqAj0zDAblzAYBriqXKJmWtqRBvyet9ajxmMIYEyMCUsmwXTHDmkGCaPeXT1I5nUV1aEg4KNFu7fuGZ4R94g8nPlprNmuqa+iFV1vzsnLv2HgJHBDgQtGFCpCXVja9MO3crbG7WBF/fugO/yFjwyeZ+WSK2XfJNrAGUakfY19soFKTkjJW2MSrkeUxiC/DPXhqQlsR9tE0G8vMH4WEb2XCCjhYOafzh2/6N7oY0hk6zLL1u98kbm7E01c9C5sh0JAgkSA/rMlDkmVJ839xjagPsdWLdRsc1R2HoUvrtnQe6zU3Cgckn/Dvg+b8bjtw0Qk7nfRl94Ft1qcZcBYj1COObGXgEVMZR6hxHbi2wEzc+USNhyK4wzjPqSUePS+ZgYi7urDv79hWefbVsZ4sqHccvcChj7Gkumc/wiutbOG5HNa4qrE4l3z37U0LJRtsn3fbYP/69u/1GBHwzuhMuYGZVKM5RP+aIEqvFdH3FThwHK9vr6jJZrqZE2je85/dSjxFzKmysv9RhAMZbYvpkr8hruPQInOZd98v7Xb4dGgmEkuD59zVEXs2Td5aEXUoSamBBsRx3rwuZe5dyXbQC5sU+b+/6F2RvhmkF6J+R+GsCFve1wSe+XRTzin28ElWj1pHU2kyKkqRHOBLm4x6QRaomaFE3wV0p6o1lz1U1kBiWlwOxDISwNKlUaeoL//13bL8S1CRB8fN+l/7JHg89bxNU5I4LEJ2ao+6mkiW90pfyFwILVEIy48yLc/jHVKtgIY7CbZmGW2aV47yVX7n1IIXXp8q21N4LBiA8oxDXe77N12KfKw6JbAW/V7QVxgS1I/GHAvTbefXd96iIQW4cJKO+o+OOhvua4RZ9wq2U61R/z7TG6z35fHtixdXDNHZGsPyb1AyOrTizfSv1X++sHPgUf/vBck/at6acXrj76f/Kp1/KZ5JjgbrTHN86EoKGvI74O+dfkKnOc1gx927AlyAovirEZ3LntiXoG7qn3wF7bi8TzGwUtcPDUQShinwAnpngSV+MYtSX+U57YjQFrixgqDPqvmQeQw6E+h5j3g7lRauu60JYWbQOz88TVq7/axox5GfJROHUvdfCbnGSZFQ1gIUCFsOi9D4Fi5OulRfcBIDEq1OUQl6COIjNLeMyzwyUcpY0yAmFru0gZVIsKpREHAMwnjbJ6gHa64yhCLaLEVdlDvsiV1ao9d83XspUhbnJ970r8JkPGNUNk1WC9UN+cbQH1uAl7UNgn721Rj3Wmzw2c7XBw4jwxbgNzfiOGpOBthY3rZOtnx/vRTXY2iLwHF16TY31A2sHwGUAsswWF4S7dTlSJlxsNr/oIniOCutVqxFPSsJVQDoblgSC/TyVzRokYbU8A0I7b4Na6rr+09cwz98NSGOLK/4J37OlC58tM3Lv5bGQiuc3DFxOO/EbBy/J1cfOvNqS8ri72A5QpPOlnDmtqk/Sh0wqT11XOz2ChDdpeY7KCMZFO6n3lMASFQU7eUnrMOsRAaQyLeLGZ57qfY63cglCcrkz9ldkVT9wIB3hV7PzzSu45hTX4jxxHn8dy1GMj6MhIQxT3l9S7chE0OmJjdIsp30ooUoKL3dPXscdoWY+HW6IRCMrcepF0SK4nlMRXbdH6FMDpsQLYRkkQXdhGAyyvmV0q7oRnTsIj0z4INPQ9xLFvwQK/mHDAib7z8G29sbVwvq07V7IXQawtKJE3MpSxxgDOyubgqRc27GH67mAs2odob8hPWqlb7JjalyBTH11ITm3D3YQsmJPcVNggzEdkZ44WanwupuRR+AHbEKDmScj/sE1Y2eiwtv7l2Dh8aeq3Tl/w5/bMQg2+hu/aY031F8yA2xyr3UJgnzqRLQWNQLV4YH6zVgLJ4O35n/agMGPm45hMi0igK2gKxc0V9aIUtnKDmmbhG8UzB7KXM8vNNgNFzDPQmDkIo/21FgmI0juIMb3DkXWjcoBlYWdlzX98yWq6daG3WvsxwiLKK9a97ZZxqD4/QbiHIHhbCjfRu2pCFUC0C8FTy4gOCaK0HvJjRWAHgK0eFB3Qy1GGlW3mo0eCNlhU+7KNwmbRiWeSrSuqz+/s3nvR1Vu29BbR2eIYMsk9n7hv8D2Oc76A3jkKHJASNMQ6rwvyzXtUPbfvPDNniMCtKMZkd8Sr8vMVensSeNaRgVkEjQHqLNLIoxbp6SKBLEGaEPHrwoysaJ/Q4iohACwozM5IZN6B27cy++HnJnwId6mpxv7zzo/85j5YJE4uiiGufOH4s2fHqT6PYfIbTNuag9VITAjj8e+OzOOS6EkxmvpnJlVjQIw3JY0gWv4MOs5TgzBqA4JTMF9Z7Eialt6f50NmZsrPjhqvP77z1ssfgyUUhCWWd8/84NiHevv+ljO4b3NEl9lnbyNqyhf2y02je2ubj3j9hFlH3FIXAbsX1+rbeiYwJA7d8TEG4Y7fN9CVOp/6Z7UYUNCeMD1rJCsQUifW+4FhFtClSUIKBVWDfYLGSurEp100YepTHyE1MqzdvpW0iJG23OcQ5HdJ5Hx3rKY4G1l7b8S9m4S5YfHurh3+4aNvf/PVi7EbeVm0hmi5aNVvPDpmVpzLKZtL2QXueYAgTZu4PFPNgWHtRkUO1YLW+KlWtCMOKSxNJEhTKc0HIEQDvK8psh9hJ6dHaYWWV8SzUpOHkuky5pbxqvOxM/bvumapzAA4CIa48uN1b79383D9v2YP5WIm+JyVe5T8W7DZmAKO5UKRllEPKy/UaLXc0ua9UctxsUHuxWOV+eWEqf7kkalHrjzYn81b8Add2gqGl6Pf9cp93/9Mv7efxcK+g4e1IoxNDBtlJMtW0C+n0Mg3nL8VtZ2zyJLe1B/CP71UqNPXK1DUD+ejGHP9CuxOfvhNr/nR5DJ+c/2gNEQHfeOat91ZEX2GGfJXjLnTRnKjkn0lSS8oh9o8l3np1fQi9UuYi7Fgm1DkAwFNfQoFnR0BjAnN3LFewo1mUBi+ut/61aeoGCV6HaqvGLfwCWbG1cthhisHzxA/HqTbjzn7ruPx2MlubT7fIdgbAjL/0zLzhVllF/pPVwcsWCj7v+AAFyb/4h0q0lxO5Q0Gi6CpZyu038LB3CcfvPZHtyyXGeEyh6h8iK6auGnHk2f1afg5zoSe5F5iiOKSG59fA7/yqisX7QQvizryzuYJt4/hQYcJ712FyNktNq4KL0s9m6AB0cvyHpR6WShelvGZZz8n49dstXpZxB4WFl6Wr/OvF+d6EyavbHiDmHvrSO3993o3B1VfPL7Gv/3pW97yKByEAW8rh4whrji79mu7v31Krzf4c7ZO72LN7piQfIpTzO7BePdLE+5N2eMsaX7fMQAhur0TEfYaDLEumESJYYJLm9xeE5OZgSGyEC66vW4yjRNLnrhxptOneJzL7NaAtDNEZv0YJ/l8d320VN/E02d/NvazbT++69xz3SzCofJbDs6oz1fEzfvFJG3/4Pce3/a77AL+e67Y7NM7Gn8A6dtBSWOQfLGb9FR801RLPBoxPc8Mp8/k4sX0PLWtHlvUuxFlOP736WrazaO9YIO1f7H1tVsO2Y/a52V5NmSeMomn9J+z2XydSf++MYP/g9Vkt67xCnMVGFI9mnkQ2+EZBI2UOAYvJ5/Hj+vEQOhPcQ6FUoYAwC7OgNMBv4a1QtNcfw11O3+4fg7+dOtrztwBh6kcUshqK+985LsrB+P9MxgR/oAJ9xaG5NXuR266PoNrMDx67RY/EHXdDzJAWu6j79rFMPEVom7QRdHo4ShAFgTIcgzhBkMykvQMEXuAJhe0BsjKppp9vbchbtIi/No0Dd13V1NzjFXj9RyI/neambri/1657XGYnFy24T5QOewMccXZlnPh0rEd+/CtM4P95zCRX22N+wlXZ+jJE969uKsruuIXOID8IgNIwjES0WQMMX4OpZalnd52Mx2HbJni5FiAL2e4oe8JDxKsYjTqnJjzDBla144ncnlWmq/y89oOv9afw4tf/sD0owcb6C21HBGGaHGMOWfnD58xXfXeNGfsOznV8rquMZt5VrLqsmHoiHa4QXUlgNFHL3w+iYJBJgzpGNYEFC/Jx6TsCFkn7TX7dH65D/ilOCEj7aI3yYDGxxFAGOKcADbaQwt72HP7Oc9jXPjsFWsuefn53394cnJyqYHLssoRZUhe3njvVRObj5k+mQaD9zBTXsMxzIvZU17vfvfK/3gMhpf2DcSbis+HCNSQMsSGX5X3xK9lVSVLudqSYYAocin/2i2dkckyn192E6AA+5kZDzO0Xcms+f5gx/CGbWe8wz1edsSYkJenjCFaJhn898NPV03t2/0iU8GbzZBOZ9B4PqciNjJN1jDRqyHjW98nKwBk9YtPcA/ZTwuZ3exHoPnfQAnPZwwkm8uxkR1YY2u3SAZhBycR7uWM9W0MmVcMsXvz9Se+eScD5hGBpQOVp5whRWGaT+64YNVeXPXMzgS9qEf2VLLVK1iMn78f4Si2yKv17V6eIeEBHFKb4mI396IPbxN86tUST5TtR2t2TVh7P3t9t1oau2XcVNsGg5mHXnXSit2TsKUGfGq0oa38f1JavN8hxQxDAAAAAElFTkSuQmCC";
function ix({
  children: e,
  bot: t
}) {
  return /* @__PURE__ */ Nn("div", { className: "flex flex-row items-end w-full gap-2", children: [
    /* @__PURE__ */ ue(Si, { className: "flex items-center size-7 border-0", children: /* @__PURE__ */ ue(
      Ea,
      {
        src: (t == null ? void 0 : t.avatarUrl) ?? og,
        alt: "Agent Icon"
      }
    ) }),
    /* @__PURE__ */ ue("div", { className: "w-fit min-w-[50%]", children: /* @__PURE__ */ ue(
      "div",
      {
        className: "bg-primary p-2.5 min-w-fit text-white rounded-lg",
        style: {
          background: "white",
          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
          borderRadius: "6px",
          color: "black"
        },
        children: e
      }
    ) })
  ] });
}
var Rn = /* @__PURE__ */ ((e) => (e[e.OPEN = 0] = "OPEN", e[e.CLOSED_RESOLVED = 1] = "CLOSED_RESOLVED", e[e.CLOSED_UNRESOLVED = 2] = "CLOSED_UNRESOLVED", e))(Rn || {}), Ca = /* @__PURE__ */ ((e) => (e.WEB = "web", e.WEB_VOICE = "web_voice", e.PHONE_VOICE = "phone_voice", e.EMAIL = "email", e.SMS = "sms", e.WHATSAPP = "whatsapp", e.API = "api", e))(Ca || {}), Aa = /* @__PURE__ */ ((e) => (e.resolved = "resolved", e.assumed_resolved = "assumed_resolved", e.handed_off = "handed_off", e))(Aa || {}), _a = /* @__PURE__ */ ((e) => (e.hard = "hard", e.light = "light", e))(_a || {}), Oa = /* @__PURE__ */ ((e) => (e.happy = "happy", e.neutral = "neutral", e.angry = "angry", e))(Oa || {}), Ta = /* @__PURE__ */ ((e) => (e.MESSAGE = "message", e.HANDOFF = "handoff", e.HANDOFF_TO_ZENDESK = "handoff_to_zendesk", e.AGENT_MESSAGE = "agent_message", e.AGENT_JOINED = "agent_joined", e.AGENT_COMMENT = "agent_comment", e.AGENT_TOOK_SESSION_FROM_AI = "agent_took_session_from_ai", e.AI_DECIDED_TO_RESOLVE_THE_ISSUE = "ai_decided_to_resolve_the_issue", e.EMAIL_DRAFT_MESSAGE = "email_draft_message", e.FOLLOWUP = "followup", e.AI_ASSUMED_THE_SESSION_RESOLVED = "ai_assumed_the_session_resolved", e.CONTACT_RESOLVED_THE_SESSION = "user_confirmed_the_session_resolved", e))(Ta || {});
const sg = A.object({
  status: A.nativeEnum(Rn),
  channel: A.nativeEnum(Ca),
  assignee_id: A.number().nullable(),
  summary: A.string().nullable(),
  classification: A.string().nullable(),
  contact_id: A.string().nullable(),
  copilot_id: A.string(),
  email: A.string().nullable(),
  email_thread_id: A.string().nullable(),
  group_id: A.string().nullable(),
  id: A.string(),
  is_notification_enabled: A.number(),
  short_token: A.string().nullable(),
  last_seen_at: A.date().nullable(),
  is_online: A.number(),
  ai_closure_type: A.nativeEnum(Aa).nullable(),
  ai_billing_type: A.nativeEnum(_a).nullable(),
  language: A.string().nullable(),
  last_message: A.string().nullable(),
  last_message_at: A.date().nullable(),
  short_link: A.string().nullable(),
  meta: A.custom().and(
    A.object({
      title: A.string().optional(),
      whatsappToNumber: A.string().optional(),
      recordingUrl: A.string().optional(),
      title_generation_type: A.enum(["user", "system"]).nullable(),
      summary: A.string().optional(),
      phoneNumber: A.string().optional()
    })
  ),
  mobileNumber: A.string().nullable(),
  queryOrgId: A.string().nullable(),
  created_at: A.date(),
  updated_at: A.date(),
  assignee: A.object({
    name: A.string(),
    email: A.string(),
    avatar_url: A.string().optional()
  }).nullable(),
  fallback_channel: A.enum(["email", "sms"]).nullable(),
  sentiment: A.nativeEnum(Oa).nullable(),
  ticket_number: A.number(),
  ai_phone_call_sid: A.string().nullable(),
  ai_phone_call_recording_url: A.string().nullable()
});
A.object({
  message: A.string().nullable(),
  type: A.string().nullable(),
  agent_avatar: A.string().nullable(),
  agent_id: A.number().nullable(),
  agent_name: A.string().nullable(),
  api_called: A.boolean().nullable(),
  chatbot_id: A.string().nullable(),
  created_at: A.string(),
  debug_json: A.any().nullable(),
  extra_params: A.any(),
  from_user: A.boolean().nullable(),
  handoff_happened_during_office_hours: A.boolean().nullable(),
  id: A.number(),
  knowledgebase_called: A.boolean().nullable(),
  session_id: A.string(),
  updated_at: A.string().nullable()
});
const ag = A.object({
  name: A.string(),
  is_ai: A.boolean(),
  profile_picture: A.string().optional().nullable(),
  id: A.string().nullable()
}), lg = A.object({
  type: A.literal("message"),
  value: A.string(),
  is_stream_chunk: A.boolean().optional(),
  server_session_id: A.string(),
  client_message_id: A.string().optional()
}), ug = A.object({
  type: A.literal("vote"),
  server_message_id: A.number().optional(),
  client_message_id: A.string().optional(),
  server_session_id: A.string()
}), cg = A.object({
  type: A.literal("info"),
  value: A.string()
}), fg = A.object({
  type: A.literal("ui"),
  value: A.object({
    type: A.string(),
    request_response: A.any(),
    name: A.string(),
    content: A.string(),
    message_id: A.string().optional()
  }),
  client_message_id: A.string().optional(),
  server_session_id: A.string()
}), hg = A.object({
  type: A.literal("form"),
  value: A.object({
    inferredArgs: A.any(),
    parametersSchema: A.object({
      pathParams: A.any(),
      queryParams: A.any(),
      bodyParams: A.any()
    })
  })
}), pg = A.object({
  type: A.literal("chat_event"),
  value: A.object({
    event: A.nativeEnum(Ta),
    message: A.string()
  })
}), dg = A.object({
  type: A.literal("options"),
  value: A.object({
    options: A.array(A.string())
  }),
  server_session_id: A.string()
}), mg = A.object({
  type: A.literal("session_update"),
  value: A.object({
    session: sg
  }),
  server_session_id: A.string()
});
A.discriminatedUnion("type", [
  lg,
  ug,
  cg,
  fg,
  hg,
  pg,
  dg,
  mg
]).and(A.object({
  timestamp: A.string(),
  agent: ag
}));
function gg(e) {
  return /* @__PURE__ */ Nn("div", { className: "w-full relative py-3", children: [
    /* @__PURE__ */ ue(
      "span",
      {
        className: "absolute top-1/2 left-0 right-0 h-px text-primary-foreground bg-secondary w-full"
      }
    ),
    /* @__PURE__ */ ue("p", { className: "text-primary-foreground absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary p-1 text-xs rounded-lg w-fit text-center font-medium shadow-sm", children: e.data.message })
  ] });
}
class yg {
  constructor(t) {
    Di(this, "components", [
      {
        key: "TEXT",
        component: vm
      },
      {
        key: "FALLBACK",
        component: ig
      },
      {
        key: "LOADING",
        component: rg
      },
      {
        key: "CHAT_EVENT",
        component: gg
      }
    ]);
    const { components: n } = t;
    if (n && n.forEach((r) => this.register(r)), this.components.length === 0)
      throw new Error("No components registered");
    if (!this.get("FALLBACK"))
      throw new Error("No fallback component registered");
  }
  register(t) {
    const n = this.components.findIndex((r) => r.key === t.key);
    return n !== -1 ? this.components[n] = t : this.components.push(t), this;
  }
  get(t) {
    const n = this.components.find(
      (r) => r.key.toUpperCase() === t.toUpperCase()
    );
    return n || null;
  }
  getOrFallback(t) {
    return t ? this.get(t) || this.get("FALLBACK") : this.get("FALLBACK");
  }
  getComponent(t, n) {
    var r;
    return n ? this.getOrFallback(t).component : (r = this.get(t)) == null ? void 0 : r.component;
  }
}
function ox({
  message: e
}) {
  const t = ti(), r = Jt(
    () => new yg({
      components: t.components
    }),
    [t]
  ).getComponent(e.component, t.debug);
  return r ? /* @__PURE__ */ El(
    r,
    {
      ...e,
      data: e.data ?? {},
      id: e.id,
      key: e.id
    }
  ) : null;
}
function bg(...e) {
  process.env.NODE_ENV === "development" && console.log("[useChat]", ...e);
}
const ze = (e = 20) => {
  const t = "abcdefghijklmnopqrstuvwxyz0123456789";
  let n = "";
  for (let r = 0; r < e; r++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
};
async function Do(e, t) {
  return e.post("/chat-session/" + t);
}
const sx = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "WeekDays",
  "Everyday"
];
async function wg(e, t) {
  return e.get("/chat/init", {
    headers: {
      "X-Session-Id": t
    }
  });
}
async function xg(e, t) {
  return e.get("/chat-session/one/" + t);
}
async function ax(e) {
  return e.get("/copilot/office-hours/public");
}
function kg(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (r.from_user === !0)
      r.message && r.message.length > 0 && t.push({
        type: "FROM_USER",
        content: r.message,
        id: r.id.toString(),
        session_id: r.session_id ?? "",
        timestamp: r.created_at ?? "",
        serverId: r.id.toString(),
        deliveredAt: null
      });
    else
      switch (r.type) {
        case "message":
          t.push({
            type: "FROM_BOT",
            component: "TEXT",
            data: {
              message: r.message ?? ""
            },
            id: r.id.toString() ?? ze(),
            serverId: r.id ?? ze(),
            timestamp: r.created_at ?? "",
            original: r,
            agent: {
              is_ai: !0,
              name: r.agent_name ?? ""
            }
          });
          break;
        case "agent_message":
          t.push({
            type: "FROM_BOT",
            component: "TEXT",
            data: {
              message: r.message ?? ""
            },
            id: r.id.toString() ?? ze(),
            serverId: r.id ?? ze(),
            timestamp: r.created_at ?? "",
            original: r,
            agent: {
              is_ai: !1,
              name: r.agent_name ?? "",
              agent_avatar: r.agent_avatar ?? ""
            }
          });
          break;
        default:
          t.push({
            type: "FROM_BOT",
            component: "CHAT_EVENT",
            data: {
              event: r.type,
              message: r.message
            },
            id: r.id.toString() ?? ze(),
            serverId: r.id ?? ze(),
            original: r,
            timestamp: r.created_at ?? "",
            agent: {
              is_ai: !0,
              name: r.agent_name ?? ""
            }
          });
      }
  }
  return t;
}
var Pr = { exports: {} }, ur = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fo;
function Sg() {
  if (Fo) return ur;
  Fo = 1;
  var e = _t;
  function t(c, d) {
    return c === d && (c !== 0 || 1 / c === 1 / d) || c !== c && d !== d;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, i = e.useEffect, o = e.useLayoutEffect, s = e.useDebugValue;
  function a(c, d) {
    var h = d(), p = r({ inst: { value: h, getSnapshot: d } }), y = p[0].inst, w = p[1];
    return o(function() {
      y.value = h, y.getSnapshot = d, l(y) && w({ inst: y });
    }, [c, h, d]), i(function() {
      return l(y) && w({ inst: y }), c(function() {
        l(y) && w({ inst: y });
      });
    }, [c]), s(h), h;
  }
  function l(c) {
    var d = c.getSnapshot;
    c = c.value;
    try {
      var h = d();
      return !n(c, h);
    } catch {
      return !0;
    }
  }
  function u(c, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : a;
  return ur.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, ur;
}
var cr = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zo;
function Eg() {
  return zo || (zo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = _t, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(S) {
      {
        for (var O = arguments.length, _ = new Array(O > 1 ? O - 1 : 0), x = 1; x < O; x++)
          _[x - 1] = arguments[x];
        r("error", S, _);
      }
    }
    function r(S, O, _) {
      {
        var x = t.ReactDebugCurrentFrame, P = x.getStackAddendum();
        P !== "" && (O += "%s", _ = _.concat([P]));
        var N = _.map(function(F) {
          return String(F);
        });
        N.unshift("Warning: " + O), Function.prototype.apply.call(console[S], console, N);
      }
    }
    function i(S, O) {
      return S === O && (S !== 0 || 1 / S === 1 / O) || S !== S && O !== O;
    }
    var o = typeof Object.is == "function" ? Object.is : i, s = e.useState, a = e.useEffect, l = e.useLayoutEffect, u = e.useDebugValue, f = !1, c = !1;
    function d(S, O, _) {
      f || e.startTransition !== void 0 && (f = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var x = O();
      if (!c) {
        var P = O();
        o(x, P) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), c = !0);
      }
      var N = s({
        inst: {
          value: x,
          getSnapshot: O
        }
      }), F = N[0].inst, k = N[1];
      return l(function() {
        F.value = x, F.getSnapshot = O, h(F) && k({
          inst: F
        });
      }, [S, x, O]), a(function() {
        h(F) && k({
          inst: F
        });
        var L = function() {
          h(F) && k({
            inst: F
          });
        };
        return S(L);
      }, [S]), u(x), x;
    }
    function h(S) {
      var O = S.getSnapshot, _ = S.value;
      try {
        var x = O();
        return !o(_, x);
      } catch {
        return !0;
      }
    }
    function p(S, O, _) {
      return O();
    }
    var y = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", w = !y, m = w ? p : d, v = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : m;
    cr.useSyncExternalStore = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), cr;
}
process.env.NODE_ENV === "production" ? Pr.exports = Sg() : Pr.exports = Eg();
var vg = Pr.exports;
const at = () => {
}, Ae = (
  /*#__NOINLINE__*/
  at()
), fr = Object, Q = (e) => e === Ae, Xe = (e) => typeof e == "function", ut = (e, t) => ({
  ...e,
  ...t
}), Cg = (e) => Xe(e.then), fn = /* @__PURE__ */ new WeakMap();
let Ag = 0;
const Xt = (e) => {
  const t = typeof e, n = e && e.constructor, r = n == Date;
  let i, o;
  if (fr(e) === e && !r && n != RegExp) {
    if (i = fn.get(e), i) return i;
    if (i = ++Ag + "~", fn.set(e, i), n == Array) {
      for (i = "@", o = 0; o < e.length; o++)
        i += Xt(e[o]) + ",";
      fn.set(e, i);
    }
    if (n == fr) {
      i = "#";
      const s = fr.keys(e).sort();
      for (; !Q(o = s.pop()); )
        Q(e[o]) || (i += o + ":" + Xt(e[o]) + ",");
      fn.set(e, i);
    }
  } else
    i = r ? e.toJSON() : t == "symbol" ? e.toString() : t == "string" ? JSON.stringify(e) : "" + e;
  return i;
}, tt = /* @__PURE__ */ new WeakMap(), hr = {}, hn = {}, Ei = "undefined", Mn = typeof window != Ei, Dr = typeof document != Ei, _g = () => Mn && typeof window.requestAnimationFrame != Ei, Ra = (e, t) => {
  const n = tt.get(e);
  return [
    // Getter
    () => !Q(t) && e.get(t) || hr,
    // Setter
    (r) => {
      if (!Q(t)) {
        const i = e.get(t);
        t in hn || (hn[t] = i), n[5](t, ut(i, r), i || hr);
      }
    },
    // Subscriber
    n[6],
    // Get server cache snapshot
    () => !Q(t) && t in hn ? hn[t] : !Q(t) && e.get(t) || hr
  ];
};
let Fr = !0;
const Og = () => Fr, [zr, Br] = Mn && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  at,
  at
], Tg = () => {
  const e = Dr && document.visibilityState;
  return Q(e) || e !== "hidden";
}, Rg = (e) => (Dr && document.addEventListener("visibilitychange", e), zr("focus", e), () => {
  Dr && document.removeEventListener("visibilitychange", e), Br("focus", e);
}), Ig = (e) => {
  const t = () => {
    Fr = !0, e();
  }, n = () => {
    Fr = !1;
  };
  return zr("online", t), zr("offline", n), () => {
    Br("online", t), Br("offline", n);
  };
}, Lg = {
  isOnline: Og,
  isVisible: Tg
}, Ng = {
  initFocus: Rg,
  initReconnect: Ig
}, Bo = !_t.useId, Kt = !Mn || "Deno" in window, Pg = (e) => _g() ? window.requestAnimationFrame(e) : setTimeout(e, 1), pr = Kt ? He : vl, dr = typeof navigator < "u" && navigator.connection, Mo = !Kt && dr && ([
  "slow-2g",
  "2g"
].includes(dr.effectiveType) || dr.saveData), vi = (e) => {
  if (Xe(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const t = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? Xt(e) : "", [
    e,
    t
  ];
};
let Dg = 0;
const Mr = () => ++Dg, Ia = 0, La = 1, Na = 2, Fg = 3;
var Ut = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: Fg,
  FOCUS_EVENT: Ia,
  MUTATE_EVENT: Na,
  RECONNECT_EVENT: La
};
async function Pa(...e) {
  const [t, n, r, i] = e, o = ut({
    populateCache: !0,
    throwOnError: !0
  }, typeof i == "boolean" ? {
    revalidate: i
  } : i || {});
  let s = o.populateCache;
  const a = o.rollbackOnError;
  let l = o.optimisticData;
  const u = (d) => typeof a == "function" ? a(d) : a !== !1, f = o.throwOnError;
  if (Xe(n)) {
    const d = n, h = [], p = t.keys();
    for (const y of p)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(y) && d(t.get(y)._k) && h.push(y);
    return Promise.all(h.map(c));
  }
  return c(n);
  async function c(d) {
    const [h] = vi(d);
    if (!h) return;
    const [p, y] = Ra(t, h), [w, m, v, S] = tt.get(t), O = () => {
      const M = w[h];
      return (Xe(o.revalidate) ? o.revalidate(p().data, d) : o.revalidate !== !1) && (delete v[h], delete S[h], M && M[0]) ? M[0](Na).then(() => p().data) : p().data;
    };
    if (e.length < 3)
      return O();
    let _ = r, x;
    const P = Mr();
    m[h] = [
      P,
      0
    ];
    const N = !Q(l), F = p(), k = F.data, L = F._c, R = Q(L) ? k : L;
    if (N && (l = Xe(l) ? l(R, k) : l, y({
      data: l,
      _c: R
    })), Xe(_))
      try {
        _ = _(R);
      } catch (M) {
        x = M;
      }
    if (_ && Cg(_))
      if (_ = await _.catch((M) => {
        x = M;
      }), P !== m[h][0]) {
        if (x) throw x;
        return _;
      } else x && N && u(x) && (s = !0, y({
        data: R,
        _c: Ae
      }));
    if (s && !x)
      if (Xe(s)) {
        const M = s(_, R);
        y({
          data: M,
          error: Ae,
          _c: Ae
        });
      } else
        y({
          data: _,
          error: Ae,
          _c: Ae
        });
    if (m[h][1] = Mr(), Promise.resolve(O()).then(() => {
      y({
        _c: Ae
      });
    }), x) {
      if (f) throw x;
      return;
    }
    return _;
  }
}
const jo = (e, t) => {
  for (const n in e)
    e[n][0] && e[n][0](t);
}, zg = (e, t) => {
  if (!tt.has(e)) {
    const n = ut(Ng, t), r = {}, i = Pa.bind(Ae, e);
    let o = at;
    const s = {}, a = (f, c) => {
      const d = s[f] || [];
      return s[f] = d, d.push(c), () => d.splice(d.indexOf(c), 1);
    }, l = (f, c, d) => {
      e.set(f, c);
      const h = s[f];
      if (h)
        for (const p of h)
          p(c, d);
    }, u = () => {
      if (!tt.has(e) && (tt.set(e, [
        r,
        {},
        {},
        {},
        i,
        l,
        a
      ]), !Kt)) {
        const f = n.initFocus(setTimeout.bind(Ae, jo.bind(Ae, r, Ia))), c = n.initReconnect(setTimeout.bind(Ae, jo.bind(Ae, r, La)));
        o = () => {
          f && f(), c && c(), tt.delete(e);
        };
      }
    };
    return u(), [
      e,
      i,
      u,
      o
    ];
  }
  return [
    e,
    tt.get(e)[4]
  ];
}, Bg = (e, t, n, r, i) => {
  const o = n.errorRetryCount, s = i.retryCount, a = ~~((Math.random() + 0.5) * (1 << (s < 8 ? s : 8))) * n.errorRetryInterval;
  !Q(o) && s > o || setTimeout(r, a, i);
}, Mg = (e, t) => Xt(e) == Xt(t), [Da, jg] = zg(/* @__PURE__ */ new Map()), Ug = ut(
  {
    // events
    onLoadingSlow: at,
    onSuccess: at,
    onError: at,
    onErrorRetry: Bg,
    onDiscarded: at,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Mo ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Mo ? 5e3 : 3e3,
    // providers
    compare: Mg,
    isPaused: () => !1,
    cache: Da,
    mutate: jg,
    fallback: {}
  },
  // use web preset by default
  Lg
), qg = (e, t) => {
  const n = ut(e, t);
  if (t) {
    const { use: r, fallback: i } = e, { use: o, fallback: s } = t;
    r && o && (n.use = r.concat(o)), i && s && (n.fallback = ut(i, s));
  }
  return n;
}, Vg = cs({}), Hg = "$inf$", Fa = Mn && window.__SWR_DEVTOOLS_USE__, Gg = Fa ? window.__SWR_DEVTOOLS_USE__ : [], Wg = () => {
  Fa && (window.__SWR_DEVTOOLS_REACT__ = _t);
}, Yg = (e) => Xe(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], Xg = () => ut(Ug, fs(Vg)), Kg = (e) => (t, n, r) => e(t, n && ((...o) => {
  const [s] = vi(t), [, , , a] = tt.get(Da);
  if (s.startsWith(Hg))
    return n(...o);
  const l = a[s];
  return Q(l) ? n(...o) : (delete a[s], l);
}), r), Qg = Gg.concat(Kg), Jg = (e) => function(...n) {
  const r = Xg(), [i, o, s] = Yg(n), a = qg(r, s);
  let l = e;
  const { use: u } = a, f = (u || []).concat(Qg);
  for (let c = f.length; c--; )
    l = f[c](l);
  return l(i, o || a.fetcher || null, a);
}, Zg = (e, t, n) => {
  const r = t[e] || (t[e] = []);
  return r.push(n), () => {
    const i = r.indexOf(n);
    i >= 0 && (r[i] = r[r.length - 1], r.pop());
  };
};
Wg();
const Uo = _t.use || ((e) => {
  if (e.status === "pending")
    throw e;
  if (e.status === "fulfilled")
    return e.value;
  throw e.status === "rejected" ? e.reason : (e.status = "pending", e.then((t) => {
    e.status = "fulfilled", e.value = t;
  }, (t) => {
    e.status = "rejected", e.reason = t;
  }), e);
}), mr = {
  dedupe: !0
}, $g = (e, t, n) => {
  const { cache: r, compare: i, suspense: o, fallbackData: s, revalidateOnMount: a, revalidateIfStale: l, refreshInterval: u, refreshWhenHidden: f, refreshWhenOffline: c, keepPreviousData: d } = n, [h, p, y, w] = tt.get(r), [m, v] = vi(e), S = pt(!1), O = pt(!1), _ = pt(m), x = pt(t), P = pt(n), N = () => P.current, F = () => N().isVisible() && N().isOnline(), [k, L, R, M] = Ra(r, m), G = pt({}).current, q = Q(s) ? n.fallback[m] : s, J = (Z, $) => {
    for (const ge in G) {
      const se = ge;
      if (se === "data") {
        if (!i(Z[se], $[se]) && (!Q(Z[se]) || !i(Se, $[se])))
          return !1;
      } else if ($[se] !== Z[se])
        return !1;
    }
    return !0;
  }, re = Jt(() => {
    const Z = !m || !t ? !1 : Q(a) ? N().isPaused() || o ? !1 : Q(l) ? !0 : l : a, $ = (ye) => {
      const De = ut(ye);
      return delete De._k, Z ? {
        isValidating: !0,
        isLoading: !0,
        ...De
      } : De;
    }, ge = k(), se = M(), Re = $(ge), Je = ge === se ? Re : $(se);
    let me = Re;
    return [
      () => {
        const ye = $(k());
        return J(ye, me) ? (me.data = ye.data, me.isLoading = ye.isLoading, me.isValidating = ye.isValidating, me.error = ye.error, me) : (me = ye, ye);
      },
      () => Je
    ];
  }, [
    r,
    m
  ]), ie = vg.useSyncExternalStore(be(
    (Z) => R(m, ($, ge) => {
      J(ge, $) || Z();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      r,
      m
    ]
  ), re[0], re[1]), ae = !S.current, b = h[m] && h[m].length > 0, D = ie.data, V = Q(D) ? q : D, g = ie.error, de = pt(V), Se = d ? Q(D) ? de.current : D : V, le = b && !Q(g) ? !1 : ae && !Q(a) ? a : N().isPaused() ? !1 : o ? Q(V) ? !1 : l : Q(V) || l, Te = !!(m && t && ae && le), ce = Q(ie.isValidating) ? Te : ie.isValidating, Pe = Q(ie.isLoading) ? Te : ie.isLoading, Ee = be(
    async (Z) => {
      const $ = x.current;
      if (!m || !$ || O.current || N().isPaused())
        return !1;
      let ge, se, Re = !0;
      const Je = Z || {}, me = !y[m] || !Je.dedupe, ye = () => Bo ? !O.current && m === _.current && S.current : m === _.current, De = {
        isValidating: !1,
        isLoading: !1
      }, rn = () => {
        L(De);
      }, on = () => {
        const ve = y[m];
        ve && ve[1] === se && delete y[m];
      }, sn = {
        isValidating: !0
      };
      Q(k().data) && (sn.isLoading = !0);
      try {
        if (me && (L(sn), n.loadingTimeout && Q(k().data) && setTimeout(() => {
          Re && ye() && N().onLoadingSlow(m, n);
        }, n.loadingTimeout), y[m] = [
          $(v),
          Mr()
        ]), [ge, se] = y[m], ge = await ge, me && setTimeout(on, n.dedupingInterval), !y[m] || y[m][1] !== se)
          return me && ye() && N().onDiscarded(m), !1;
        De.error = Ae;
        const ve = p[m];
        if (!Q(ve) && // case 1
        (se <= ve[0] || // case 2
        se <= ve[1] || // case 3
        ve[1] === 0))
          return rn(), me && ye() && N().onDiscarded(m), !1;
        const Ue = k().data;
        De.data = i(Ue, ge) ? Ue : ge, me && ye() && N().onSuccess(ge, m, n);
      } catch (ve) {
        on();
        const Ue = N(), { shouldRetryOnError: C } = Ue;
        Ue.isPaused() || (De.error = ve, me && ye() && (Ue.onError(ve, m, Ue), (C === !0 || Xe(C) && C(ve)) && (!N().revalidateOnFocus || !N().revalidateOnReconnect || F()) && Ue.onErrorRetry(ve, m, Ue, (I) => {
          const B = h[m];
          B && B[0] && B[0](Ut.ERROR_REVALIDATE_EVENT, I);
        }, {
          retryCount: (Je.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return Re = !1, rn(), !0;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      m,
      r
    ]
  ), ft = be(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Z) => Pa(r, _.current, ...Z),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (pr(() => {
    x.current = t, P.current = n, Q(D) || (de.current = D);
  }), pr(() => {
    if (!m) return;
    const Z = Ee.bind(Ae, mr);
    let $ = 0;
    const se = Zg(m, h, (Re, Je = {}) => {
      if (Re == Ut.FOCUS_EVENT) {
        const me = Date.now();
        N().revalidateOnFocus && me > $ && F() && ($ = me + N().focusThrottleInterval, Z());
      } else if (Re == Ut.RECONNECT_EVENT)
        N().revalidateOnReconnect && F() && Z();
      else {
        if (Re == Ut.MUTATE_EVENT)
          return Ee();
        if (Re == Ut.ERROR_REVALIDATE_EVENT)
          return Ee(Je);
      }
    });
    return O.current = !1, _.current = m, S.current = !0, L({
      _k: v
    }), le && (Q(V) || Kt ? Z() : Pg(Z)), () => {
      O.current = !0, se();
    };
  }, [
    m
  ]), pr(() => {
    let Z;
    function $() {
      const se = Xe(u) ? u(k().data) : u;
      se && Z !== -1 && (Z = setTimeout(ge, se));
    }
    function ge() {
      !k().error && (f || N().isVisible()) && (c || N().isOnline()) ? Ee(mr).then($) : $();
    }
    return $(), () => {
      Z && (clearTimeout(Z), Z = -1);
    };
  }, [
    u,
    f,
    c,
    m
  ]), Cl(Se), o && Q(V) && m) {
    if (!Bo && Kt)
      throw new Error("Fallback data is required when using suspense in SSR.");
    x.current = t, P.current = n, O.current = !1;
    const Z = w[m];
    if (!Q(Z)) {
      const $ = ft(Z);
      Uo($);
    }
    if (Q(g)) {
      const $ = Ee(mr);
      Q(Se) || ($.status = "fulfilled", $.value = !0), Uo($);
    } else
      throw g;
  }
  return {
    mutate: ft,
    get data() {
      return G.data = !0, Se;
    },
    get error() {
      return G.error = !0, g;
    },
    get isValidating() {
      return G.isValidating = !0, ce;
    },
    get isLoading() {
      return G.isLoading = !0, Pe;
    }
  };
}, ey = Jg($g), ty = "@openchatai/widget", ny = "1.3.9", ry = "module", iy = {
  access: "public"
}, oy = {
  prepare: "vite build",
  clean: "rm -rf ./dist ./dist-embed",
  "clean:dist": "rm -rf ./dist ./dist-embed",
  prepublishOnly: "pnpm clean && pnpm test && pnpm batman",
  build: "vite build",
  dev: "vite",
  "build:embed": "vite build -c vite.embed.config.ts",
  test: "vitest run",
  batman: "pnpm build && pnpm build:embed",
  "test:watch": "vitest --watch"
}, sy = {
  "lucide-react": "^0.412.0",
  react: "^18.3.1"
}, ay = {
  "@testing-library/dom": "^10.4.0",
  "@testing-library/jest-dom": "^6.5.0",
  "@testing-library/react": "^16.0.1",
  "@types/node": "^20.14.8",
  "@types/react": "^18.3.4",
  "@types/react-dom": "^18.3.0",
  "@uiw/react-iframe": "^1.0.3",
  "@vitejs/plugin-react": "^4.3.1",
  autoprefixer: "^10.4.20",
  axios: "^1.7.5",
  "class-variance-authority": "^0.7.0",
  jsdom: "^25.0.1",
  postcss: "^8.4.41",
  "postcss-prefix-selector": "^1.16.1",
  react: "^18.3.1",
  "@biomejs/biome": "1.9.4",
  "react-dom": "^18.3.1",
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "socket.io-client": "^4.7.5",
  swr: "^2.2.5",
  "tailwind-merge": "^2.4.0",
  tailwindcss: "^3.4.6",
  "tailwindcss-animate": "^1.0.7",
  typescript: "^5.5.4",
  vite: "^5.4.2",
  "vite-plugin-dts": "4.0.3",
  "vite-plugin-externalize-deps": "^0.8.0",
  "vite-tsconfig-paths": "^5.0.1",
  "@changesets/cli": "^2.27.9",
  vitest: "^2.0.5"
}, ly = [
  "dist",
  "dist-embed"
], uy = {
  url: "https://github.com/openchatai/OpenCopilot/issues"
}, cy = {
  name: "openchatai",
  url: "https://github.com/openchatai"
}, fy = "./dist/index.cjs.js", hy = "./dist/index.es.js", py = "./dist/index.d.ts", dy = !1, my = {
  ".": {
    import: "./dist/index.es.js",
    require: "./dist/index.cjs.js",
    types: "./dist/index.d.ts"
  },
  "./basic": {
    import: "./dist/basic.es.js",
    require: "./dist/basic.cjs.js",
    types: "./dist/basic.d.ts"
  },
  "./package.json": "./package.json",
  "./dist/*.css": "./dist/*.css"
}, gy = {
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1",
  "@radix-ui/react-tooltip": "^1.1.2",
  clsx: "^2.1.1",
  "framer-motion": "^11.3.30",
  immer: "^10.1.1",
  "lucide-react": "^0.436.0",
  wouter: "^3.3.5",
  zod: "^3.23.8"
}, qo = {
  name: ty,
  private: !1,
  version: ny,
  type: ry,
  publishConfig: iy,
  scripts: oy,
  peerDependencies: sy,
  devDependencies: ay,
  files: ly,
  bugs: uy,
  author: cy,
  main: fy,
  module: hy,
  types: py,
  sideEffects: dy,
  exports: my,
  dependencies: gy
};
function yy(e, t) {
  const [n, r] = vn(e);
  return He(() => {
    const i = setTimeout(() => r(e), t);
    return () => clearTimeout(i);
  }, [e, t, n]), [n, r];
}
function by(e) {
  var n, r, i, o, s, a, l, u, f;
  const t = e._message;
  switch (t && ((n = e.onAny) == null || n.call(e, t, e)), t.type) {
    case "message": {
      (r = e.onBotMessage) == null || r.call(e, {
        type: "FROM_BOT",
        component: "TEXT",
        id: ze(15),
        serverId: null,
        bot: t.agent,
        timestamp: t.timestamp,
        data: {
          message: t.value
        },
        agent: t.agent
      }, e);
      break;
    }
    case "info":
      (i = e.onInfo) == null || i.call(e, t, e);
      break;
    case "chat_event": {
      (o = e.onChatEvent) == null || o.call(e, {
        component: "CHAT_EVENT",
        type: "FROM_BOT",
        id: ze(),
        serverId: null,
        data: {
          event: t.value.event,
          message: t.value.message
        },
        timestamp: t.timestamp
      }, e);
      break;
    }
    case "session_update":
      (s = e.onSessionUpdate) == null || s.call(e, t, e);
      break;
    case "options":
      (a = e.onOptions) == null || a.call(e, t, e);
      break;
    case "ui": {
      const c = t.value;
      (l = e.onUi) == null || l.call(e, {
        type: "FROM_BOT",
        component: c.name,
        data: c.request_response,
        serverId: null,
        id: ze(),
        bot: t.agent,
        timestamp: t.timestamp
      }, e);
      break;
    }
    case "form": {
      const c = t.value;
      (u = e.onForm) == null || u.call(e, {
        type: "FROM_BOT",
        component: "FORM",
        data: c,
        serverId: null,
        id: ze(),
        bot: t.agent,
        timestamp: t.timestamp
      }, e);
      break;
    }
    case "vote": {
      (f = e.onVote) == null || f.call(e, t, e);
      break;
    }
  }
}
const Ke = /* @__PURE__ */ Object.create(null);
Ke.open = "0";
Ke.close = "1";
Ke.ping = "2";
Ke.pong = "3";
Ke.message = "4";
Ke.upgrade = "5";
Ke.noop = "6";
const yn = /* @__PURE__ */ Object.create(null);
Object.keys(Ke).forEach((e) => {
  yn[Ke[e]] = e;
});
const jr = { type: "error", data: "parser error" }, za = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Ba = typeof ArrayBuffer == "function", Ma = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Ci = ({ type: e, data: t }, n, r) => za && t instanceof Blob ? n ? r(t) : Vo(t, r) : Ba && (t instanceof ArrayBuffer || Ma(t)) ? n ? r(t) : Vo(new Blob([t]), r) : r(Ke[e] + (t || "")), Vo = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const r = n.result.split(",")[1];
    t("b" + (r || ""));
  }, n.readAsDataURL(e);
};
function Ho(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let gr;
function wy(e, t) {
  if (za && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ho).then(t);
  if (Ba && (e.data instanceof ArrayBuffer || Ma(e.data)))
    return t(Ho(e.data));
  Ci(e, !1, (n) => {
    gr || (gr = new TextEncoder()), t(gr.encode(n));
  });
}
const Go = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ht = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Go.length; e++)
  Ht[Go.charCodeAt(e)] = e;
const xy = (e) => {
  let t = e.length * 0.75, n = e.length, r, i = 0, o, s, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const u = new ArrayBuffer(t), f = new Uint8Array(u);
  for (r = 0; r < n; r += 4)
    o = Ht[e.charCodeAt(r)], s = Ht[e.charCodeAt(r + 1)], a = Ht[e.charCodeAt(r + 2)], l = Ht[e.charCodeAt(r + 3)], f[i++] = o << 2 | s >> 4, f[i++] = (s & 15) << 4 | a >> 2, f[i++] = (a & 3) << 6 | l & 63;
  return u;
}, ky = typeof ArrayBuffer == "function", Ai = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: ja(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Sy(e.substring(1), t)
  } : yn[n] ? e.length > 1 ? {
    type: yn[n],
    data: e.substring(1)
  } : {
    type: yn[n]
  } : jr;
}, Sy = (e, t) => {
  if (ky) {
    const n = xy(e);
    return ja(n, t);
  } else
    return { base64: !0, data: e };
}, ja = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, Ua = "", Ey = (e, t) => {
  const n = e.length, r = new Array(n);
  let i = 0;
  e.forEach((o, s) => {
    Ci(o, !1, (a) => {
      r[s] = a, ++i === n && t(r.join(Ua));
    });
  });
}, vy = (e, t) => {
  const n = e.split(Ua), r = [];
  for (let i = 0; i < n.length; i++) {
    const o = Ai(n[i], t);
    if (r.push(o), o.type === "error")
      break;
  }
  return r;
};
function Cy() {
  return new TransformStream({
    transform(e, t) {
      wy(e, (n) => {
        const r = n.length;
        let i;
        if (r < 126)
          i = new Uint8Array(1), new DataView(i.buffer).setUint8(0, r);
        else if (r < 65536) {
          i = new Uint8Array(3);
          const o = new DataView(i.buffer);
          o.setUint8(0, 126), o.setUint16(1, r);
        } else {
          i = new Uint8Array(9);
          const o = new DataView(i.buffer);
          o.setUint8(0, 127), o.setBigUint64(1, BigInt(r));
        }
        e.data && typeof e.data != "string" && (i[0] |= 128), t.enqueue(i), t.enqueue(n);
      });
    }
  });
}
let yr;
function pn(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function dn(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let r = 0;
  for (let i = 0; i < t; i++)
    n[i] = e[0][r++], r === e[0].length && (e.shift(), r = 0);
  return e.length && r < e[0].length && (e[0] = e[0].slice(r)), n;
}
function Ay(e, t) {
  yr || (yr = new TextDecoder());
  const n = [];
  let r = 0, i = -1, o = !1;
  return new TransformStream({
    transform(s, a) {
      for (n.push(s); ; ) {
        if (r === 0) {
          if (pn(n) < 1)
            break;
          const l = dn(n, 1);
          o = (l[0] & 128) === 128, i = l[0] & 127, i < 126 ? r = 3 : i === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (pn(n) < 2)
            break;
          const l = dn(n, 2);
          i = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (pn(n) < 8)
            break;
          const l = dn(n, 8), u = new DataView(l.buffer, l.byteOffset, l.length), f = u.getUint32(0);
          if (f > Math.pow(2, 21) - 1) {
            a.enqueue(jr);
            break;
          }
          i = f * Math.pow(2, 32) + u.getUint32(4), r = 3;
        } else {
          if (pn(n) < i)
            break;
          const l = dn(n, i);
          a.enqueue(Ai(o ? l : yr.decode(l), t)), r = 0;
        }
        if (i === 0 || i > e) {
          a.enqueue(jr);
          break;
        }
      }
    }
  });
}
const qa = 4;
function he(e) {
  if (e) return _y(e);
}
function _y(e) {
  for (var t in he.prototype)
    e[t] = he.prototype[t];
  return e;
}
he.prototype.on = he.prototype.addEventListener = function(e, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;
};
he.prototype.once = function(e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return n.fn = t, this.on(e, n), this;
};
he.prototype.off = he.prototype.removeListener = he.prototype.removeAllListeners = he.prototype.removeEventListener = function(e, t) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var n = this._callbacks["$" + e];
  if (!n) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + e], this;
  for (var r, i = 0; i < n.length; i++)
    if (r = n[i], r === t || r.fn === t) {
      n.splice(i, 1);
      break;
    }
  return n.length === 0 && delete this._callbacks["$" + e], this;
};
he.prototype.emit = function(e) {
  this._callbacks = this._callbacks || {};
  for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, i = n.length; r < i; ++r)
      n[r].apply(this, t);
  }
  return this;
};
he.prototype.emitReserved = he.prototype.emit;
he.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
he.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const jn = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), Be = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Oy = "arraybuffer";
function Va(e, ...t) {
  return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const Ty = Be.setTimeout, Ry = Be.clearTimeout;
function Un(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = Ty.bind(Be), e.clearTimeoutFn = Ry.bind(Be)) : (e.setTimeoutFn = Be.setTimeout.bind(Be), e.clearTimeoutFn = Be.clearTimeout.bind(Be));
}
const Iy = 1.33;
function Ly(e) {
  return typeof e == "string" ? Ny(e) : Math.ceil((e.byteLength || e.size) * Iy);
}
function Ny(e) {
  let t = 0, n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    t = e.charCodeAt(r), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
  return n;
}
function Ha() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Py(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function Dy(e) {
  let t = {}, n = e.split("&");
  for (let r = 0, i = n.length; r < i; r++) {
    let o = n[r].split("=");
    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return t;
}
class Fy extends Error {
  constructor(t, n, r) {
    super(t), this.description = n, this.context = r, this.type = "TransportError";
  }
}
class _i extends he {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Un(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(t, n, r) {
    return super.emitReserved("error", new Fy(t, n, r)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(t) {
    const n = Ai(t, this.socket.binaryType);
    this.onPacket(n);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(t) {
    this.readyState = "closed", super.emitReserved("close", t);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(t) {
  }
  createUri(t, n = {}) {
    return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(n);
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(t) {
    const n = Py(t);
    return n.length ? "?" + n : "";
  }
}
class zy extends _i {
  constructor() {
    super(...arguments), this._polling = !1;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      this.readyState = "paused", t();
    };
    if (this._polling || !this.writable) {
      let r = 0;
      this._polling && (r++, this.once("pollComplete", function() {
        --r || n();
      })), this.writable || (r++, this.once("drain", function() {
        --r || n();
      }));
    } else
      n();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(t) {
    const n = (r) => {
      if (this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(r);
    };
    vy(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(t) {
    this.writable = !1, Ey(t, (n) => {
      this.doWrite(n, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const t = this.opts.secure ? "https" : "http", n = this.query || {};
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Ha()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Ga = !1;
try {
  Ga = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const By = Ga;
function My() {
}
class jy extends zy {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(t) {
    if (super(t), typeof location < "u") {
      const n = location.protocol === "https:";
      let r = location.port;
      r || (r = n ? "443" : "80"), this.xd = typeof location < "u" && t.hostname !== location.hostname || r !== t.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(t, n) {
    const r = this.request({
      method: "POST",
      data: t
    });
    r.on("success", n), r.on("error", (i, o) => {
      this.onError("xhr post error", i, o);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)), t.on("error", (n, r) => {
      this.onError("xhr poll error", n, r);
    }), this.pollXhr = t;
  }
}
let At = class bn extends he {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, r) {
    super(), this.createRequest = t, Un(this, r), this._opts = r, this._method = r.method || "GET", this._uri = n, this._data = r.data !== void 0 ? r.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Va(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    n.xdomain = !!this._opts.xd;
    const r = this._xhr = this.createRequest(n);
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) && r.setRequestHeader(i, this._opts.extraHeaders[i]);
        }
      } catch {
      }
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
        var i;
        r.readyState === 3 && ((i = this._opts.cookieJar) === null || i === void 0 || i.parseCookies(
          // @ts-ignore
          r.getResponseHeader("set-cookie")
        )), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof r.status == "number" ? r.status : 0);
        }, 0));
      }, r.send(this._data);
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = bn.requestsCount++, bn.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(t) {
    this.emitReserved("error", t, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = My, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete bn.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this._cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
};
At.requestsCount = 0;
At.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", Wo);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Be ? "pagehide" : "unload";
    addEventListener(e, Wo, !1);
  }
}
function Wo() {
  for (let e in At.requests)
    At.requests.hasOwnProperty(e) && At.requests[e].abort();
}
const Uy = function() {
  const e = Wa({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class qy extends jy {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = Uy && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new At(Wa, this.uri(), t);
  }
}
function Wa(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || By))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new Be[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const Ya = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Vy extends _i {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, r = Ya ? {} : Va(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, n, r);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (t) => this.onClose({
      description: "websocket connection closed",
      context: t
    }), this.ws.onmessage = (t) => this.onData(t.data), this.ws.onerror = (t) => this.onError("websocket error", t);
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = n === t.length - 1;
      Ci(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {
        }
        i && jn(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const t = this.opts.secure ? "wss" : "ws", n = this.query || {};
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Ha()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const br = Be.WebSocket || Be.MozWebSocket;
class Hy extends Vy {
  createSocket(t, n, r) {
    return Ya ? new br(t, n, r) : n ? new br(t, n) : new br(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class Gy extends _i {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (t) {
      return this.emitReserved("error", t);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((t) => {
      this.onError("webtransport error", t);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((t) => {
        const n = Ay(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = t.readable.pipeThrough(n).getReader(), i = Cy();
        i.readable.pipeTo(t.writable), this._writer = i.writable.getWriter();
        const o = () => {
          r.read().then(({ done: a, value: l }) => {
            a || (this.onPacket(l), o());
          }).catch((a) => {
          });
        };
        o();
        const s = { type: "open" };
        this.query.sid && (s.data = `{"sid":"${this.query.sid}"}`), this._writer.write(s).then(() => this.onOpen());
      });
    });
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = n === t.length - 1;
      this._writer.write(r).then(() => {
        i && jn(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const Wy = {
  websocket: Hy,
  webtransport: Gy,
  polling: qy
}, Yy = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Xy = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function Ur(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), r = e.indexOf("]");
  n != -1 && r != -1 && (e = e.substring(0, n) + e.substring(n, r).replace(/:/g, ";") + e.substring(r, e.length));
  let i = Yy.exec(e || ""), o = {}, s = 14;
  for (; s--; )
    o[Xy[s]] = i[s] || "";
  return n != -1 && r != -1 && (o.source = t, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = Ky(o, o.path), o.queryKey = Qy(o, o.query), o;
}
function Ky(e, t) {
  const n = /\/{2,9}/g, r = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1), t.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function Qy(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, i, o) {
    i && (n[i] = o);
  }), n;
}
const qr = typeof addEventListener == "function" && typeof removeEventListener == "function", wn = [];
qr && addEventListener("offline", () => {
  wn.forEach((e) => e());
}, !1);
class lt extends he {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = Oy, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const r = Ur(t);
      n.hostname = r.host, n.secure = r.protocol === "https" || r.protocol === "wss", n.port = r.port, r.query && (n.query = r.query);
    } else n.host && (n.hostname = Ur(n.host).host);
    Un(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((r) => {
      const i = r.prototype.name;
      this.transports.push(i), this._transportsByName[i] = r;
    }), this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Dy(this.opts.query)), qr && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, wn.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    n.EIO = qa, n.transport = t, this.id && (n.sid = this.id);
    const r = Object.assign({}, this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[t]);
    return new this._transportsByName[t](r);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const t = this.opts.rememberUpgrade && lt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(t);
    n.open(), this.setTransport(n);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (n) => this._onClose("transport close", n));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", lt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(t) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const n = new Error("server error");
          n.code = t.data, this._onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data), this.emitReserved("message", t.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(t) {
    this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this._pingInterval = t.pingInterval, this._pingTimeout = t.pingTimeout, this._maxPayload = t.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + t, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, t), this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const t = this._getWritablePackets();
      this.transport.send(t), this._prevBufferLen = t.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const i = this.writeBuffer[r].data;
      if (i && (n += Ly(i)), r > 0 && n > this._maxPayload)
        return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return !0;
    const t = Date.now() > this._pingTimeoutTime;
    return t && (this._pingTimeoutTime = 0, jn(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), t;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(t, n, r) {
    return this._sendPacket("message", t, n, r), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(t, n, r) {
    return this._sendPacket("message", t, n, r), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(t, n, r, i) {
    if (typeof n == "function" && (i = n, n = void 0), typeof r == "function" && (i = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const o = {
      type: t,
      data: n,
      options: r
    };
    this.emitReserved("packetCreate", o), this.writeBuffer.push(o), i && this.once("flush", i), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const t = () => {
      this._onClose("forced close"), this.transport.close();
    }, n = () => {
      this.off("upgrade", n), this.off("upgradeError", n), t();
    }, r = () => {
      this.once("upgrade", n), this.once("upgradeError", n);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? r() : t();
    }) : this.upgrading ? r() : t()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(t) {
    if (lt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", t), this._onClose("transport error", t);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(t, n) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), qr && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const r = wn.indexOf(this._offlineEventListener);
        r !== -1 && wn.splice(r, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
lt.protocol = qa;
class Jy extends lt {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let t = 0; t < this._upgrades.length; t++)
        this._probe(this._upgrades[t]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(t) {
    let n = this.createTransport(t), r = !1;
    lt.priorWebsocketSuccess = !1;
    const i = () => {
      r || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (c) => {
        if (!r)
          if (c.type === "pong" && c.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            lt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (f(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const d = new Error("probe error");
            d.transport = n.name, this.emitReserved("upgradeError", d);
          }
      }));
    };
    function o() {
      r || (r = !0, f(), n.close(), n = null);
    }
    const s = (c) => {
      const d = new Error("probe error: " + c);
      d.transport = n.name, o(), this.emitReserved("upgradeError", d);
    };
    function a() {
      s("transport closed");
    }
    function l() {
      s("socket closed");
    }
    function u(c) {
      n && c.name !== n.name && o();
    }
    const f = () => {
      n.removeListener("open", i), n.removeListener("error", s), n.removeListener("close", a), this.off("close", l), this.off("upgrading", u);
    };
    n.once("open", i), n.once("error", s), n.once("close", a), this.once("close", l), this.once("upgrading", u), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
      r || n.open();
    }, 200) : n.open();
  }
  onHandshake(t) {
    this._upgrades = this._filterUpgrades(t.upgrades), super.onHandshake(t);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(t) {
    const n = [];
    for (let r = 0; r < t.length; r++)
      ~this.transports.indexOf(t[r]) && n.push(t[r]);
    return n;
  }
}
let Zy = class extends Jy {
  constructor(t, n = {}) {
    const r = typeof t == "object" ? t : n;
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => Wy[i]).filter((i) => !!i)), super(t, r);
  }
};
function $y(e, t = "", n) {
  let r = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), r = Ur(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + o + ":" + r.port + t, r.href = r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port), r;
}
const eb = typeof ArrayBuffer == "function", tb = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Xa = Object.prototype.toString, nb = typeof Blob == "function" || typeof Blob < "u" && Xa.call(Blob) === "[object BlobConstructor]", rb = typeof File == "function" || typeof File < "u" && Xa.call(File) === "[object FileConstructor]";
function Oi(e) {
  return eb && (e instanceof ArrayBuffer || tb(e)) || nb && e instanceof Blob || rb && e instanceof File;
}
function xn(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, r = e.length; n < r; n++)
      if (xn(e[n]))
        return !0;
    return !1;
  }
  if (Oi(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return xn(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && xn(e[n]))
      return !0;
  return !1;
}
function ib(e) {
  const t = [], n = e.data, r = e;
  return r.data = Vr(n, t), r.attachments = t.length, { packet: r, buffers: t };
}
function Vr(e, t) {
  if (!e)
    return e;
  if (Oi(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      n[r] = Vr(e[r], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (n[r] = Vr(e[r], t));
    return n;
  }
  return e;
}
function ob(e, t) {
  return e.data = Hr(e.data, t), delete e.attachments, e;
}
function Hr(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = Hr(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Hr(e[n], t));
  return e;
}
const sb = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], ab = 5;
var X;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(X || (X = {}));
class lb {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(t) {
    this.replacer = t;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(t) {
    return (t.type === X.EVENT || t.type === X.ACK) && xn(t) ? this.encodeAsBinary({
      type: t.type === X.EVENT ? X.BINARY_EVENT : X.BINARY_ACK,
      nsp: t.nsp,
      data: t.data,
      id: t.id
    }) : [this.encodeAsString(t)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(t) {
    let n = "" + t.type;
    return (t.type === X.BINARY_EVENT || t.type === X.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = ib(t), r = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(r), i;
  }
}
function Yo(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class Ti extends he {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(t) {
    super(), this.reviver = t;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const r = n.type === X.BINARY_EVENT;
      r || n.type === X.BINARY_ACK ? (n.type = r ? X.EVENT : X.ACK, this.reconstructor = new ub(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (Oi(t) || t.base64)
      if (this.reconstructor)
        n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, super.emitReserved("decoded", n));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + t);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(t) {
    let n = 0;
    const r = {
      type: Number(t.charAt(0))
    };
    if (X[r.type] === void 0)
      throw new Error("unknown packet type " + r.type);
    if (r.type === X.BINARY_EVENT || r.type === X.BINARY_ACK) {
      const o = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; )
        ;
      const s = t.substring(o, n);
      if (s != Number(s) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(s);
    }
    if (t.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); )
        ;
      r.nsp = t.substring(o, n);
    } else
      r.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const o = n + 1;
      for (; ++n; ) {
        const s = t.charAt(n);
        if (s == null || Number(s) != s) {
          --n;
          break;
        }
        if (n === t.length)
          break;
      }
      r.id = Number(t.substring(o, n + 1));
    }
    if (t.charAt(++n)) {
      const o = this.tryParse(t.substr(n));
      if (Ti.isPayloadValid(r.type, o))
        r.data = o;
      else
        throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case X.CONNECT:
        return Yo(n);
      case X.DISCONNECT:
        return n === void 0;
      case X.CONNECT_ERROR:
        return typeof n == "string" || Yo(n);
      case X.EVENT:
      case X.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && sb.indexOf(n[0]) === -1);
      case X.ACK:
      case X.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class ub {
  constructor(t) {
    this.packet = t, this.buffers = [], this.reconPack = t;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(t) {
    if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
      const n = ob(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
const cb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ti,
  Encoder: lb,
  get PacketType() {
    return X;
  },
  protocol: ab
}, Symbol.toStringTag, { value: "Module" }));
function Ve(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const fb = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Ka extends he {
  /**
   * `Socket` constructor.
   */
  constructor(t, n, r) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = n, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const t = this.io;
    this.subs = [
      Ve(t, "open", this.onopen.bind(this)),
      Ve(t, "packet", this.onpacket.bind(this)),
      Ve(t, "error", this.onerror.bind(this)),
      Ve(t, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(t, ...n) {
    var r, i, o;
    if (fb.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const s = {
      type: X.EVENT,
      data: n
    };
    if (s.options = {}, s.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const f = this.ids++, c = n.pop();
      this._registerAckCallback(f, c), s.id = f;
    }
    const a = (i = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || i === void 0 ? void 0 : i.writable, l = this.connected && !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
    return this.flags.volatile && !a || (l ? (this.notifyOutgoingListeners(s), this.packet(s)) : this.sendBuffer.push(s)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(t, n) {
    var r;
    const i = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let a = 0; a < this.sendBuffer.length; a++)
        this.sendBuffer[a].id === t && this.sendBuffer.splice(a, 1);
      n.call(this, new Error("operation has timed out"));
    }, i), s = (...a) => {
      this.io.clearTimeoutFn(o), n.apply(this, a);
    };
    s.withError = !0, this.acks[t] = s;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(t, ...n) {
    return new Promise((r, i) => {
      const o = (s, a) => s ? i(s) : r(a);
      o.withError = !0, n.push(o), this.emit(t, ...n);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    t.push((i, ...o) => r !== this._queue[0] ? void 0 : (i !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(i)) : (this._queue.shift(), n && n(null, ...o)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const n = this._queue[0];
    n.pending && !t || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(t) {
    t.nsp = this.nsp, this.io._packet(t);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((t) => {
      this._sendConnectPacket(t);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(t) {
    this.packet({
      type: X.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t) : t
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(t, n) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", t, n), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((r) => String(r.id) === t)) {
        const r = this.acks[t];
        delete this.acks[t], r.withError && r.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case X.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case X.EVENT:
        case X.BINARY_EVENT:
          this.onevent(t);
          break;
        case X.ACK:
        case X.BINARY_ACK:
          this.onack(t);
          break;
        case X.DISCONNECT:
          this.ondisconnect();
          break;
        case X.CONNECT_ERROR:
          this.destroy();
          const r = new Error(t.data.message);
          r.data = t.data.data, this.emitReserved("connect_error", r);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n)
        r.apply(this, t);
    }
    super.emit.apply(this, t), this._pid && t.length && typeof t[t.length - 1] == "string" && (this._lastOffset = t[t.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(t) {
    const n = this;
    let r = !1;
    return function(...i) {
      r || (r = !0, n.packet({
        type: X.ACK,
        id: t,
        data: i
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" && (delete this.acks[t.id], n.withError && t.data.unshift(null), n.apply(this, t.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(t, n) {
    this.id = t, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)), this.receiveBuffer = [], this.sendBuffer.forEach((t) => {
      this.notifyOutgoingListeners(t), this.packet(t);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: X.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(t) {
    return this.flags.compress = t, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(t) {
    return this.flags.timeout = t, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(t) {
    if (!this._anyListeners)
      return this;
    if (t) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r])
          return n.splice(r, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners)
      return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r])
          return n.splice(r, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n)
        r.apply(this, t.data);
    }
  }
}
function Lt(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
Lt.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
};
Lt.prototype.reset = function() {
  this.attempts = 0;
};
Lt.prototype.setMin = function(e) {
  this.ms = e;
};
Lt.prototype.setMax = function(e) {
  this.max = e;
};
Lt.prototype.setJitter = function(e) {
  this.jitter = e;
};
class Gr extends he {
  constructor(t, n) {
    var r;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Un(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new Lt({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const i = n.parser || cb;
    this.encoder = new i.Encoder(), this.decoder = new i.Decoder(), this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length ? (this._reconnection = !!t, t || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t, (n = this.backoff) === null || n === void 0 || n.setMin(t), this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t, (n = this.backoff) === null || n === void 0 || n.setJitter(t), this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, (n = this.backoff) === null || n === void 0 || n.setMax(t), this);
  }
  timeout(t) {
    return arguments.length ? (this._timeout = t, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(t) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Zy(this.uri, this.opts);
    const n = this.engine, r = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const i = Ve(n, "open", function() {
      r.onopen(), t && t();
    }), o = (a) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen();
    }, s = Ve(n, "error", o);
    if (this._timeout !== !1) {
      const a = this._timeout, l = this.setTimeoutFn(() => {
        i(), o(new Error("timeout")), n.close();
      }, a);
      this.opts.autoUnref && l.unref(), this.subs.push(() => {
        this.clearTimeoutFn(l);
      });
    }
    return this.subs.push(i), this.subs.push(s), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(t) {
    return this.open(t);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      Ve(t, "ping", this.onping.bind(this)),
      Ve(t, "data", this.ondata.bind(this)),
      Ve(t, "error", this.onerror.bind(this)),
      Ve(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      Ve(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(t) {
    jn(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(t) {
    this.emitReserved("error", t);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(t, n) {
    let r = this.nsps[t];
    return r ? this._autoConnect && !r.active && r.connect() : (r = new Ka(this, t, n), this.nsps[t] = r), r;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const r of n)
      if (this.nsps[r].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let r = 0; r < n.length; r++)
      this.engine.write(n[r], t.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((t) => t()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(t, n) {
    var r;
    this.cleanup(), (r = this.engine) === null || r === void 0 || r.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, n), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open((i) => {
          i ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", i)) : t.onreconnect();
        }));
      }, n);
      this.opts.autoUnref && r.unref(), this.subs.push(() => {
        this.clearTimeoutFn(r);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const t = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t);
  }
}
const qt = {};
function kn(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = $y(e, t.path || "/socket.io"), r = n.source, i = n.id, o = n.path, s = qt[i] && o in qt[i].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || s;
  let l;
  return a ? l = new Gr(r, t) : (qt[i] || (qt[i] = new Gr(r, t)), l = qt[i]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(kn, {
  Manager: Gr,
  Socket: Ka,
  io: kn,
  connect: kn
});
function hb(e, t, n = []) {
  const [r, i] = vn(null), [o, s] = vn("disconnected"), a = (w) => {
    s(w);
  }, l = () => {
    r && (r.disconnect(), i(null), a("disconnected"));
  }, u = be(() => a("connected"), [a]), f = be(() => a("disconnected"), [a]), c = be(() => a("error"), [a]), d = be(() => a("reconnected"), [a]), h = be(() => a("reconnecting"), [a]), p = be(() => a("error"), [a]), y = be(() => a("error"), [a]);
  return He(() => {
    if (!e) return;
    const w = kn(e, t);
    return i(w), () => {
      w.disconnect(), i(null);
    };
  }, [e]), He(() => {
    if (r)
      return r.on("connect", u), r.on("disconnect", f), r.on("connect_error", c), r.on("reconnect", d), r.on("reconnecting", h), r.on("reconnect_error", p), r.on("reconnect_failed", y), () => {
        r.off("connect", u), r.off("disconnect", f), r.off("connect_error", c), r.off("reconnect", d), r.off("reconnecting", h), r.off("reconnect_error", p), r.off("reconnect_failed", y);
      };
  }, [
    u,
    c,
    f,
    d,
    p,
    y,
    h,
    r
  ]), {
    socket: r,
    socketState: o,
    disconnect: l
  };
}
function pb(e, t) {
  switch (e) {
    case "connected":
      return t("connected", "🟢");
    case "connecting":
      return t("connecting", "🟡");
    case "reconnecting":
      return t("reconnecting", "🟡");
    case "reconnected":
      return t("reconnected", "🟢");
    case "disconnecting":
      return t("disconnecting", "🔴");
    case "disconnected":
      return t("disconnected", "🔴");
    case "error":
      return t("error", "❌");
  }
}
function Qa(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: db } = Object.prototype, { getPrototypeOf: Ri } = Object, qn = /* @__PURE__ */ ((e) => (t) => {
  const n = db.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), We = (e) => (e = e.toLowerCase(), (t) => qn(t) === e), Vn = (e) => (t) => typeof t === e, { isArray: Nt } = Array, Qt = Vn("undefined");
function mb(e) {
  return e !== null && !Qt(e) && e.constructor !== null && !Qt(e.constructor) && Ne(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ja = We("ArrayBuffer");
function gb(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ja(e.buffer), t;
}
const yb = Vn("string"), Ne = Vn("function"), Za = Vn("number"), Hn = (e) => e !== null && typeof e == "object", bb = (e) => e === !0 || e === !1, Sn = (e) => {
  if (qn(e) !== "object")
    return !1;
  const t = Ri(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, wb = We("Date"), xb = We("File"), kb = We("Blob"), Sb = We("FileList"), Eb = (e) => Hn(e) && Ne(e.pipe), vb = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ne(e.append) && ((t = qn(e)) === "formdata" || // detect form-data instance
  t === "object" && Ne(e.toString) && e.toString() === "[object FormData]"));
}, Cb = We("URLSearchParams"), [Ab, _b, Ob, Tb] = ["ReadableStream", "Request", "Response", "Headers"].map(We), Rb = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function tn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Nt(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let a;
    for (r = 0; r < s; r++)
      a = o[r], t.call(null, e[a], a, e);
  }
}
function $a(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const gt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, el = (e) => !Qt(e) && e !== gt;
function Wr() {
  const { caseless: e } = el(this) && this || {}, t = {}, n = (r, i) => {
    const o = e && $a(t, i) || i;
    Sn(t[o]) && Sn(r) ? t[o] = Wr(t[o], r) : Sn(r) ? t[o] = Wr({}, r) : Nt(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && tn(arguments[r], n);
  return t;
}
const Ib = (e, t, n, { allOwnKeys: r } = {}) => (tn(t, (i, o) => {
  n && Ne(i) ? e[o] = Qa(i, n) : e[o] = i;
}, { allOwnKeys: r }), e), Lb = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Nb = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Pb = (e, t, n, r) => {
  let i, o, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
      s = i[o], (!r || r(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = n !== !1 && Ri(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Db = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Fb = (e) => {
  if (!e) return null;
  if (Nt(e)) return e;
  let t = e.length;
  if (!Za(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, zb = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ri(Uint8Array)), Bb = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const o = i.value;
    t.call(e, o[0], o[1]);
  }
}, Mb = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, jb = We("HTMLFormElement"), Ub = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), Xo = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), qb = We("RegExp"), tl = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  tn(n, (i, o) => {
    let s;
    (s = t(i, o, e)) !== !1 && (r[o] = s || i);
  }), Object.defineProperties(e, r);
}, Vb = (e) => {
  tl(e, (t, n) => {
    if (Ne(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (Ne(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Hb = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((o) => {
      n[o] = !0;
    });
  };
  return Nt(e) ? r(e) : r(String(e).split(t)), n;
}, Gb = () => {
}, Wb = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, wr = "abcdefghijklmnopqrstuvwxyz", Ko = "0123456789", nl = {
  DIGIT: Ko,
  ALPHA: wr,
  ALPHA_DIGIT: wr + wr.toUpperCase() + Ko
}, Yb = (e = 16, t = nl.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Xb(e) {
  return !!(e && Ne(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Kb = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (Hn(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const o = Nt(r) ? [] : {};
        return tn(r, (s, a) => {
          const l = n(s, i + 1);
          !Qt(l) && (o[a] = l);
        }), t[i] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, Qb = We("AsyncFunction"), Jb = (e) => e && (Hn(e) || Ne(e)) && Ne(e.then) && Ne(e.catch), rl = ((e, t) => e ? setImmediate : t ? ((n, r) => (gt.addEventListener("message", ({ source: i, data: o }) => {
  i === gt && o === n && r.length && r.shift()();
}, !1), (i) => {
  r.push(i), gt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Ne(gt.postMessage)
), Zb = typeof queueMicrotask < "u" ? queueMicrotask.bind(gt) : typeof process < "u" && process.nextTick || rl, E = {
  isArray: Nt,
  isArrayBuffer: Ja,
  isBuffer: mb,
  isFormData: vb,
  isArrayBufferView: gb,
  isString: yb,
  isNumber: Za,
  isBoolean: bb,
  isObject: Hn,
  isPlainObject: Sn,
  isReadableStream: Ab,
  isRequest: _b,
  isResponse: Ob,
  isHeaders: Tb,
  isUndefined: Qt,
  isDate: wb,
  isFile: xb,
  isBlob: kb,
  isRegExp: qb,
  isFunction: Ne,
  isStream: Eb,
  isURLSearchParams: Cb,
  isTypedArray: zb,
  isFileList: Sb,
  forEach: tn,
  merge: Wr,
  extend: Ib,
  trim: Rb,
  stripBOM: Lb,
  inherits: Nb,
  toFlatObject: Pb,
  kindOf: qn,
  kindOfTest: We,
  endsWith: Db,
  toArray: Fb,
  forEachEntry: Bb,
  matchAll: Mb,
  isHTMLForm: jb,
  hasOwnProperty: Xo,
  hasOwnProp: Xo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: tl,
  freezeMethods: Vb,
  toObjectSet: Hb,
  toCamelCase: Ub,
  noop: Gb,
  toFiniteNumber: Wb,
  findKey: $a,
  global: gt,
  isContextDefined: el,
  ALPHABET: nl,
  generateString: Yb,
  isSpecCompliantForm: Xb,
  toJSONObject: Kb,
  isAsyncFn: Qb,
  isThenable: Jb,
  setImmediate: rl,
  asap: Zb
};
function U(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
E.inherits(U, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: E.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const il = U.prototype, ol = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  ol[e] = { value: e };
});
Object.defineProperties(U, ol);
Object.defineProperty(il, "isAxiosError", { value: !0 });
U.from = (e, t, n, r, i, o) => {
  const s = Object.create(il);
  return E.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), U.call(s, e.message, t, n, r, i), s.cause = e, s.name = e.name, o && Object.assign(s, o), s;
};
const $b = null;
function Yr(e) {
  return E.isPlainObject(e) || E.isArray(e);
}
function sl(e) {
  return E.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Qo(e, t, n) {
  return e ? e.concat(t).map(function(i, o) {
    return i = sl(i), !n && o ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function ew(e) {
  return E.isArray(e) && !e.some(Yr);
}
const tw = E.toFlatObject(E, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Gn(e, t, n) {
  if (!E.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = E.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, w) {
    return !E.isUndefined(w[y]);
  });
  const r = n.metaTokens, i = n.visitor || f, o = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && E.isSpecCompliantForm(t);
  if (!E.isFunction(i))
    throw new TypeError("visitor must be a function");
  function u(p) {
    if (p === null) return "";
    if (E.isDate(p))
      return p.toISOString();
    if (!l && E.isBlob(p))
      throw new U("Blob is not supported. Use a Buffer instead.");
    return E.isArrayBuffer(p) || E.isTypedArray(p) ? l && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function f(p, y, w) {
    let m = p;
    if (p && !w && typeof p == "object") {
      if (E.endsWith(y, "{}"))
        y = r ? y : y.slice(0, -2), p = JSON.stringify(p);
      else if (E.isArray(p) && ew(p) || (E.isFileList(p) || E.endsWith(y, "[]")) && (m = E.toArray(p)))
        return y = sl(y), m.forEach(function(S, O) {
          !(E.isUndefined(S) || S === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Qo([y], O, o) : s === null ? y : y + "[]",
            u(S)
          );
        }), !1;
    }
    return Yr(p) ? !0 : (t.append(Qo(w, y, o), u(p)), !1);
  }
  const c = [], d = Object.assign(tw, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: Yr
  });
  function h(p, y) {
    if (!E.isUndefined(p)) {
      if (c.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      c.push(p), E.forEach(p, function(m, v) {
        (!(E.isUndefined(m) || m === null) && i.call(
          t,
          m,
          E.isString(v) ? v.trim() : v,
          y,
          d
        )) === !0 && h(m, y ? y.concat(v) : [v]);
      }), c.pop();
    }
  }
  if (!E.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function Jo(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Ii(e, t) {
  this._pairs = [], e && Gn(e, this, t);
}
const al = Ii.prototype;
al.append = function(t, n) {
  this._pairs.push([t, n]);
};
al.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Jo);
  } : Jo;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function nw(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ll(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || nw, i = n && n.serialize;
  let o;
  if (i ? o = i(t, n) : o = E.isURLSearchParams(t) ? t.toString() : new Ii(t, n).toString(r), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Zo {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    E.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const ul = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, rw = typeof URLSearchParams < "u" ? URLSearchParams : Ii, iw = typeof FormData < "u" ? FormData : null, ow = typeof Blob < "u" ? Blob : null, sw = {
  isBrowser: !0,
  classes: {
    URLSearchParams: rw,
    FormData: iw,
    Blob: ow
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Li = typeof window < "u" && typeof document < "u", Xr = typeof navigator == "object" && navigator || void 0, aw = Li && (!Xr || ["ReactNative", "NativeScript", "NS"].indexOf(Xr.product) < 0), lw = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", uw = Li && window.location.href || "http://localhost", cw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Li,
  hasStandardBrowserEnv: aw,
  hasStandardBrowserWebWorkerEnv: lw,
  navigator: Xr,
  origin: uw
}, Symbol.toStringTag, { value: "Module" })), _e = {
  ...cw,
  ...sw
};
function fw(e, t) {
  return Gn(e, new _e.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, o) {
      return _e.isNode && E.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function hw(e) {
  return E.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function pw(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function cl(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s), l = o >= n.length;
    return s = !s && E.isArray(i) ? i.length : s, l ? (E.hasOwnProp(i, s) ? i[s] = [i[s], r] : i[s] = r, !a) : ((!i[s] || !E.isObject(i[s])) && (i[s] = []), t(n, r, i[s], o) && E.isArray(i[s]) && (i[s] = pw(i[s])), !a);
  }
  if (E.isFormData(e) && E.isFunction(e.entries)) {
    const n = {};
    return E.forEachEntry(e, (r, i) => {
      t(hw(r), i, n, 0);
    }), n;
  }
  return null;
}
function dw(e, t, n) {
  if (E.isString(e))
    try {
      return (t || JSON.parse)(e), E.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const nn = {
  transitional: ul,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, o = E.isObject(t);
    if (o && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t))
      return i ? JSON.stringify(cl(t)) : t;
    if (E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t) || E.isReadableStream(t))
      return t;
    if (E.isArrayBufferView(t))
      return t.buffer;
    if (E.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return fw(t, this.formSerializer).toString();
      if ((a = E.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Gn(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || i ? (n.setContentType("application/json", !1), dw(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || nn.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (E.isResponse(t) || E.isReadableStream(t))
      return t;
    if (t && E.isString(t) && (r && !this.responseType || i)) {
      const s = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? U.from(a, U.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _e.classes.FormData,
    Blob: _e.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  nn.headers[e] = {};
});
const mw = E.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), gw = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), n = s.substring(0, i).trim().toLowerCase(), r = s.substring(i + 1).trim(), !(!n || t[n] && mw[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, $o = Symbol("internals");
function Vt(e) {
  return e && String(e).trim().toLowerCase();
}
function En(e) {
  return e === !1 || e == null ? e : E.isArray(e) ? e.map(En) : String(e);
}
function yw(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const bw = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function xr(e, t, n, r, i) {
  if (E.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!E.isString(t)) {
    if (E.isString(r))
      return t.indexOf(r) !== -1;
    if (E.isRegExp(r))
      return r.test(t);
  }
}
function ww(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function xw(e, t) {
  const n = E.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, o, s) {
        return this[r].call(this, t, i, o, s);
      },
      configurable: !0
    });
  });
}
class Oe {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(a, l, u) {
      const f = Vt(l);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const c = E.findKey(i, f);
      (!c || i[c] === void 0 || u === !0 || u === void 0 && i[c] !== !1) && (i[c || l] = En(a));
    }
    const s = (a, l) => E.forEach(a, (u, f) => o(u, f, l));
    if (E.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (E.isString(t) && (t = t.trim()) && !bw(t))
      s(gw(t), n);
    else if (E.isHeaders(t))
      for (const [a, l] of t.entries())
        o(l, a, r);
    else
      t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Vt(t), t) {
      const r = E.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return yw(i);
        if (E.isFunction(n))
          return n.call(this, i, r);
        if (E.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Vt(t), t) {
      const r = E.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || xr(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function o(s) {
      if (s = Vt(s), s) {
        const a = E.findKey(r, s);
        a && (!n || xr(r, r[a], a, n)) && (delete r[a], i = !0);
      }
    }
    return E.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || xr(this, this[o], o, t, !0)) && (delete this[o], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return E.forEach(this, (i, o) => {
      const s = E.findKey(r, o);
      if (s) {
        n[s] = En(i), delete n[o];
        return;
      }
      const a = t ? ww(o) : String(o).trim();
      a !== o && delete n[o], n[a] = En(i), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return E.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && E.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[$o] = this[$o] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function o(s) {
      const a = Vt(s);
      r[a] || (xw(i, s), r[a] = !0);
    }
    return E.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Oe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
E.reduceDescriptors(Oe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
E.freezeMethods(Oe);
function kr(e, t) {
  const n = this || nn, r = t || n, i = Oe.from(r.headers);
  let o = r.data;
  return E.forEach(e, function(a) {
    o = a.call(n, o, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), o;
}
function fl(e) {
  return !!(e && e.__CANCEL__);
}
function Pt(e, t, n) {
  U.call(this, e ?? "canceled", U.ERR_CANCELED, t, n), this.name = "CanceledError";
}
E.inherits(Pt, U, {
  __CANCEL__: !0
});
function hl(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new U(
    "Request failed with status code " + n.status,
    [U.ERR_BAD_REQUEST, U.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function kw(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Sw(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), f = r[o];
    s || (s = u), n[i] = l, r[i] = u;
    let c = o, d = 0;
    for (; c !== i; )
      d += n[c++], c = c % e;
    if (i = (i + 1) % e, i === o && (o = (o + 1) % e), u - s < t)
      return;
    const h = f && u - f;
    return h ? Math.round(d * 1e3 / h) : void 0;
  };
}
function Ew(e, t) {
  let n = 0, r = 1e3 / t, i, o;
  const s = (u, f = Date.now()) => {
    n = f, i = null, o && (clearTimeout(o), o = null), e.apply(null, u);
  };
  return [(...u) => {
    const f = Date.now(), c = f - n;
    c >= r ? s(u, f) : (i = u, o || (o = setTimeout(() => {
      o = null, s(i);
    }, r - c)));
  }, () => i && s(i)];
}
const In = (e, t, n = 3) => {
  let r = 0;
  const i = Sw(50, 250);
  return Ew((o) => {
    const s = o.loaded, a = o.lengthComputable ? o.total : void 0, l = s - r, u = i(l), f = s <= a;
    r = s;
    const c = {
      loaded: s,
      total: a,
      progress: a ? s / a : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && a && f ? (a - s) / u : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(c);
  }, n);
}, es = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, ts = (e) => (...t) => E.asap(() => e(...t)), vw = _e.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = _e.navigator && /(msie|trident)/i.test(_e.navigator.userAgent), n = document.createElement("a");
    let r;
    function i(o) {
      let s = o;
      return t && (n.setAttribute("href", s), s = n.href), n.setAttribute("href", s), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = i(window.location.href), function(s) {
      const a = E.isString(s) ? i(s) : s;
      return a.protocol === r.protocol && a.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), Cw = _e.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, o) {
      const s = [e + "=" + encodeURIComponent(t)];
      E.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), E.isString(r) && s.push("path=" + r), E.isString(i) && s.push("domain=" + i), o === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Aw(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function _w(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function pl(e, t) {
  return e && !Aw(t) ? _w(e, t) : t;
}
const ns = (e) => e instanceof Oe ? { ...e } : e;
function wt(e, t) {
  t = t || {};
  const n = {};
  function r(u, f, c) {
    return E.isPlainObject(u) && E.isPlainObject(f) ? E.merge.call({ caseless: c }, u, f) : E.isPlainObject(f) ? E.merge({}, f) : E.isArray(f) ? f.slice() : f;
  }
  function i(u, f, c) {
    if (E.isUndefined(f)) {
      if (!E.isUndefined(u))
        return r(void 0, u, c);
    } else return r(u, f, c);
  }
  function o(u, f) {
    if (!E.isUndefined(f))
      return r(void 0, f);
  }
  function s(u, f) {
    if (E.isUndefined(f)) {
      if (!E.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, f);
  }
  function a(u, f, c) {
    if (c in t)
      return r(u, f);
    if (c in e)
      return r(void 0, u);
  }
  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (u, f) => i(ns(u), ns(f), !0)
  };
  return E.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const c = l[f] || i, d = c(e[f], t[f], f);
    E.isUndefined(d) && c !== a || (n[f] = d);
  }), n;
}
const dl = (e) => {
  const t = wt({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: o, headers: s, auth: a } = t;
  t.headers = s = Oe.from(s), t.url = ll(pl(t.baseURL, t.url), e.params, e.paramsSerializer), a && s.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (E.isFormData(n)) {
    if (_e.hasStandardBrowserEnv || _e.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [u, ...f] = l ? l.split(";").map((c) => c.trim()).filter(Boolean) : [];
      s.setContentType([u || "multipart/form-data", ...f].join("; "));
    }
  }
  if (_e.hasStandardBrowserEnv && (r && E.isFunction(r) && (r = r(t)), r || r !== !1 && vw(t.url))) {
    const u = i && o && Cw.read(o);
    u && s.set(i, u);
  }
  return t;
}, Ow = typeof XMLHttpRequest < "u", Tw = Ow && function(e) {
  return new Promise(function(n, r) {
    const i = dl(e);
    let o = i.data;
    const s = Oe.from(i.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = i, f, c, d, h, p;
    function y() {
      h && h(), p && p(), i.cancelToken && i.cancelToken.unsubscribe(f), i.signal && i.signal.removeEventListener("abort", f);
    }
    let w = new XMLHttpRequest();
    w.open(i.method.toUpperCase(), i.url, !0), w.timeout = i.timeout;
    function m() {
      if (!w)
        return;
      const S = Oe.from(
        "getAllResponseHeaders" in w && w.getAllResponseHeaders()
      ), _ = {
        data: !a || a === "text" || a === "json" ? w.responseText : w.response,
        status: w.status,
        statusText: w.statusText,
        headers: S,
        config: e,
        request: w
      };
      hl(function(P) {
        n(P), y();
      }, function(P) {
        r(P), y();
      }, _), w = null;
    }
    "onloadend" in w ? w.onloadend = m : w.onreadystatechange = function() {
      !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, w.onabort = function() {
      w && (r(new U("Request aborted", U.ECONNABORTED, e, w)), w = null);
    }, w.onerror = function() {
      r(new U("Network Error", U.ERR_NETWORK, e, w)), w = null;
    }, w.ontimeout = function() {
      let O = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const _ = i.transitional || ul;
      i.timeoutErrorMessage && (O = i.timeoutErrorMessage), r(new U(
        O,
        _.clarifyTimeoutError ? U.ETIMEDOUT : U.ECONNABORTED,
        e,
        w
      )), w = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in w && E.forEach(s.toJSON(), function(O, _) {
      w.setRequestHeader(_, O);
    }), E.isUndefined(i.withCredentials) || (w.withCredentials = !!i.withCredentials), a && a !== "json" && (w.responseType = i.responseType), u && ([d, p] = In(u, !0), w.addEventListener("progress", d)), l && w.upload && ([c, h] = In(l), w.upload.addEventListener("progress", c), w.upload.addEventListener("loadend", h)), (i.cancelToken || i.signal) && (f = (S) => {
      w && (r(!S || S.type ? new Pt(null, e, w) : S), w.abort(), w = null);
    }, i.cancelToken && i.cancelToken.subscribe(f), i.signal && (i.signal.aborted ? f() : i.signal.addEventListener("abort", f)));
    const v = kw(i.url);
    if (v && _e.protocols.indexOf(v) === -1) {
      r(new U("Unsupported protocol " + v + ":", U.ERR_BAD_REQUEST, e));
      return;
    }
    w.send(o || null);
  });
}, Rw = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const o = function(u) {
      if (!i) {
        i = !0, a();
        const f = u instanceof Error ? u : this.reason;
        r.abort(f instanceof U ? f : new Pt(f instanceof Error ? f.message : f));
      }
    };
    let s = t && setTimeout(() => {
      s = null, o(new U(`timeout ${t} of ms exceeded`, U.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: l } = r;
    return l.unsubscribe = () => E.asap(a), l;
  }
}, Iw = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, Lw = async function* (e, t) {
  for await (const n of Nw(e))
    yield* Iw(n, t);
}, Nw = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, rs = (e, t, n, r) => {
  const i = Lw(e, t);
  let o = 0, s, a = (l) => {
    s || (s = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: f } = await i.next();
        if (u) {
          a(), l.close();
          return;
        }
        let c = f.byteLength;
        if (n) {
          let d = o += c;
          n(d);
        }
        l.enqueue(new Uint8Array(f));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(l) {
      return a(l), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, Wn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ml = Wn && typeof ReadableStream == "function", Pw = Wn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), gl = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Dw = ml && gl(() => {
  let e = !1;
  const t = new Request(_e.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), is = 64 * 1024, Kr = ml && gl(() => E.isReadableStream(new Response("").body)), Ln = {
  stream: Kr && ((e) => e.body)
};
Wn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ln[t] && (Ln[t] = E.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new U(`Response type '${t}' is not supported`, U.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Fw = async (e) => {
  if (e == null)
    return 0;
  if (E.isBlob(e))
    return e.size;
  if (E.isSpecCompliantForm(e))
    return (await new Request(_e.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (E.isArrayBufferView(e) || E.isArrayBuffer(e))
    return e.byteLength;
  if (E.isURLSearchParams(e) && (e = e + ""), E.isString(e))
    return (await Pw(e)).byteLength;
}, zw = async (e, t) => {
  const n = E.toFiniteNumber(e.getContentLength());
  return n ?? Fw(t);
}, Bw = Wn && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: i,
    cancelToken: o,
    timeout: s,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: u,
    headers: f,
    withCredentials: c = "same-origin",
    fetchOptions: d
  } = dl(e);
  u = u ? (u + "").toLowerCase() : "text";
  let h = Rw([i, o && o.toAbortSignal()], s), p;
  const y = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let w;
  try {
    if (l && Dw && n !== "get" && n !== "head" && (w = await zw(f, r)) !== 0) {
      let _ = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), x;
      if (E.isFormData(r) && (x = _.headers.get("content-type")) && f.setContentType(x), _.body) {
        const [P, N] = es(
          w,
          In(ts(l))
        );
        r = rs(_.body, is, P, N);
      }
    }
    E.isString(c) || (c = c ? "include" : "omit");
    const m = "credentials" in Request.prototype;
    p = new Request(t, {
      ...d,
      signal: h,
      method: n.toUpperCase(),
      headers: f.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: m ? c : void 0
    });
    let v = await fetch(p);
    const S = Kr && (u === "stream" || u === "response");
    if (Kr && (a || S && y)) {
      const _ = {};
      ["status", "statusText", "headers"].forEach((F) => {
        _[F] = v[F];
      });
      const x = E.toFiniteNumber(v.headers.get("content-length")), [P, N] = a && es(
        x,
        In(ts(a), !0)
      ) || [];
      v = new Response(
        rs(v.body, is, P, () => {
          N && N(), y && y();
        }),
        _
      );
    }
    u = u || "text";
    let O = await Ln[E.findKey(Ln, u) || "text"](v, e);
    return !S && y && y(), await new Promise((_, x) => {
      hl(_, x, {
        data: O,
        headers: Oe.from(v.headers),
        status: v.status,
        statusText: v.statusText,
        config: e,
        request: p
      });
    });
  } catch (m) {
    throw y && y(), m && m.name === "TypeError" && /fetch/i.test(m.message) ? Object.assign(
      new U("Network Error", U.ERR_NETWORK, e, p),
      {
        cause: m.cause || m
      }
    ) : U.from(m, m && m.code, e, p);
  }
}), Qr = {
  http: $b,
  xhr: Tw,
  fetch: Bw
};
E.forEach(Qr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const os = (e) => `- ${e}`, Mw = (e) => E.isFunction(e) || e === null || e === !1, yl = {
  getAdapter: (e) => {
    e = E.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let s;
      if (r = n, !Mw(n) && (r = Qr[(s = String(n)).toLowerCase()], r === void 0))
        throw new U(`Unknown adapter '${s}'`);
      if (r)
        break;
      i[s || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(i).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? o.length > 1 ? `since :
` + o.map(os).join(`
`) : " " + os(o[0]) : "as no adapter specified";
      throw new U(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Qr
};
function Sr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Pt(null, e);
}
function ss(e) {
  return Sr(e), e.headers = Oe.from(e.headers), e.data = kr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), yl.getAdapter(e.adapter || nn.adapter)(e).then(function(r) {
    return Sr(e), r.data = kr.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Oe.from(r.headers), r;
  }, function(r) {
    return fl(r) || (Sr(e), r && r.response && (r.response.data = kr.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Oe.from(r.response.headers))), Promise.reject(r);
  });
}
const bl = "1.7.7", Ni = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ni[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const as = {};
Ni.transitional = function(t, n, r) {
  function i(o, s) {
    return "[Axios v" + bl + "] Transitional option '" + o + "'" + s + (r ? ". " + r : "");
  }
  return (o, s, a) => {
    if (t === !1)
      throw new U(
        i(s, " has been removed" + (n ? " in " + n : "")),
        U.ERR_DEPRECATED
      );
    return n && !as[s] && (as[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, s, a) : !0;
  };
};
function jw(e, t, n) {
  if (typeof e != "object")
    throw new U("options must be an object", U.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i], s = t[o];
    if (s) {
      const a = e[o], l = a === void 0 || s(a, o, e);
      if (l !== !0)
        throw new U("option " + o + " must be " + l, U.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new U("Unknown option " + o, U.ERR_BAD_OPTION);
  }
}
const Jr = {
  assertOptions: jw,
  validators: Ni
}, st = Jr.validators;
class yt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Zo(),
      response: new Zo()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = wt(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 && Jr.assertOptions(r, {
      silentJSONParsing: st.transitional(st.boolean),
      forcedJSONParsing: st.transitional(st.boolean),
      clarifyTimeoutError: st.transitional(st.boolean)
    }, !1), i != null && (E.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Jr.assertOptions(i, {
      encode: st.function,
      serialize: st.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && E.merge(
      o.common,
      o[n.method]
    );
    o && E.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete o[p];
      }
    ), n.headers = Oe.concat(s, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (l = l && y.synchronous, a.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(y) {
      u.push(y.fulfilled, y.rejected);
    });
    let f, c = 0, d;
    if (!l) {
      const p = [ss.bind(this), void 0];
      for (p.unshift.apply(p, a), p.push.apply(p, u), d = p.length, f = Promise.resolve(n); c < d; )
        f = f.then(p[c++], p[c++]);
      return f;
    }
    d = a.length;
    let h = n;
    for (c = 0; c < d; ) {
      const p = a[c++], y = a[c++];
      try {
        h = p(h);
      } catch (w) {
        y.call(this, w);
        break;
      }
    }
    try {
      f = ss.call(this, h);
    } catch (p) {
      return Promise.reject(p);
    }
    for (c = 0, d = u.length; c < d; )
      f = f.then(u[c++], u[c++]);
    return f;
  }
  getUri(t) {
    t = wt(this.defaults, t);
    const n = pl(t.baseURL, t.url);
    return ll(n, t.params, t.paramsSerializer);
  }
}
E.forEach(["delete", "get", "head", "options"], function(t) {
  yt.prototype[t] = function(n, r) {
    return this.request(wt(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
E.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, s, a) {
      return this.request(wt(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  yt.prototype[t] = n(), yt.prototype[t + "Form"] = n(!0);
});
class Pi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const s = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(i);
      return s.cancel = function() {
        r.unsubscribe(o);
      }, s;
    }, t(function(o, s, a) {
      r.reason || (r.reason = new Pt(o, s, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Pi(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
function Uw(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function qw(e) {
  return E.isObject(e) && e.isAxiosError === !0;
}
const Zr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Zr).forEach(([e, t]) => {
  Zr[t] = e;
});
function wl(e) {
  const t = new yt(e), n = Qa(yt.prototype.request, t);
  return E.extend(n, yt.prototype, t, { allOwnKeys: !0 }), E.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return wl(wt(e, i));
  }, n;
}
const pe = wl(nn);
pe.Axios = yt;
pe.CanceledError = Pt;
pe.CancelToken = Pi;
pe.isCancel = fl;
pe.VERSION = bl;
pe.toFormData = Gn;
pe.AxiosError = U;
pe.Cancel = pe.CanceledError;
pe.all = function(t) {
  return Promise.all(t);
};
pe.spread = Uw;
pe.isAxiosError = qw;
pe.mergeConfig = wt;
pe.AxiosHeaders = Oe;
pe.formToJSON = (e) => cl(E.isHTMLForm(e) ? new FormData(e) : e);
pe.getAdapter = yl.getAdapter;
pe.HttpStatusCode = Zr;
pe.default = pe;
function Vw({
  apiUrl: e,
  botToken: t
}) {
  return pe.create({
    baseURL: e,
    headers: {
      "X-Bot-Token": t
    }
  });
}
function Hw({ apiUrl: e, botToken: t }) {
  return Jt(() => Vw({
    botToken: t,
    apiUrl: e
  }), [t, e]);
}
const Gw = typeof window > "u", ls = {
  getItem: () => null,
  setItem: () => {
  },
  removeItem: () => {
  }
};
function Ww(e) {
  return Gw ? ls : e === "local" ? localStorage : e === "session" ? sessionStorage : ls;
}
function us(e, t, n = "session") {
  const r = Jt(() => Ww(n), [n]), [i, o] = vn(() => {
    const l = r.getItem(e);
    if (l !== null)
      try {
        return JSON.parse(l);
      } catch (u) {
        console.error(`Error parsing stored value for key '${e}':`, u);
      }
    return typeof t == "function" ? t() : t ?? null;
  }), s = be(
    (l) => {
      if (o(l), l === null)
        r.removeItem(e);
      else
        try {
          r.setItem(e, JSON.stringify(l));
        } catch (u) {
          console.error(
            `Error saving state to storage for key '${e}':`,
            u
          );
        }
    },
    [e, r]
  ), a = be(() => {
    o(null), r.removeItem(e);
  }, [e, r]);
  return He(() => {
    const l = (u) => {
      u.key === e && u.newValue !== JSON.stringify(i) && o(u.newValue ? JSON.parse(u.newValue) : null);
    };
    return window.addEventListener("storage", l), () => {
      window.removeEventListener("storage", l);
    };
  }, [e, i]), [i, s, a];
}
function Yw(e, t) {
  return Ol(e, (n) => {
    const r = () => {
      n.lastUpdated = Date.now();
    };
    switch (t.type) {
      case "INIT": {
        r();
        break;
      }
      case "ADD_RESPONSE_MESSAGE": {
        n.messages.push(t.payload), r();
        break;
      }
      case "APPEND_USER_MESSAGE": {
        n.messages.push(t.payload), r();
        break;
      }
      case "RESET": {
        n.messages = [], n.lastUpdated = null, n.keyboard = null;
        break;
      }
      case "PREPEND_HISTORY": {
        const i = t.payload.map((o) => o.id);
        n.messages = n.messages.filter(
          (o) => !i.includes(o.id)
        ), n.messages = [...t.payload, ...n.messages], r();
        break;
      }
      case "SET_SERVER_ID": {
        const { clientMessageId: i, ServerMessageId: o } = t.payload, s = n.messages.find(
          (a) => a.id === i
        );
        s && (s.serverId = o);
        break;
      }
      case "SET_KEYBOARD": {
        n.keyboard = t.payload;
        break;
      }
    }
  });
}
const Xw = (e, t) => `[OPEN_SESSION_${e}]_${t || "session"}`;
function Kw({
  apiUrl: e,
  socketUrl: t,
  botToken: n,
  defaultHookSettings: r,
  onSessionDestroy: i,
  headers: o,
  queryParams: s,
  pathParams: a,
  userData: l,
  language: u
}) {
  const f = zl(), [c, d] = us(
    "[SETTINGS]:[OPEN]",
    {
      persistSession: (r == null ? void 0 : r.persistSession) ?? !1,
      useSoundEffects: (r == null ? void 0 : r.useSoundEffects) ?? !1
    },
    "local"
  ), h = Hw({
    apiUrl: e,
    botToken: n
  }), [p, y] = us(
    Xw(n, l != null && l.external_id ? l == null ? void 0 : l.external_id : l == null ? void 0 : l.email),
    void 0,
    c != null && c.persistSession ? "local" : "memory"
  );
  async function w(D) {
    let V = await xg(h, D);
    return V.data && y(V.data), V.data;
  }
  He(() => {
    p != null && p.id && w(p.id);
  }, []);
  const { socket: m, socketState: v } = hb(t, {
    autoConnect: !0,
    transports: ["websocket"],
    closeOnBeforeunload: !0,
    query: {
      botToken: n,
      sessionId: p == null ? void 0 : p.id,
      client: "widget",
      clientVersion: qo.version
    }
  });
  He(() => {
    let D;
    if (p && m) {
      const g = {
        sessionId: p.id,
        client: "widget",
        botToken: n,
        user: l,
        timestamp: Date.now()
      };
      async function de() {
        m == null || m.emit("heartbeat", g);
      }
      de(), D = setInterval(() => {
        de();
      }, 50 * 1e3);
    }
    return () => {
      clearInterval(D);
    };
  }, [m, p, n, l]), He(() => {
    if (p)
      return m == null || m.on("heartbeat:ack", (D) => {
        D.success && bg("heartbeat ack");
      }), () => {
        m == null || m.off("heartbeat:ack");
      };
  }, [p]);
  const S = (D) => {
    d(Object.assign({}, c, D));
  }, [O, _] = Al(Yw, {
    lastUpdated: null,
    messages: [],
    keyboard: null
  }), [x, P] = yy(
    () => pb(v, f.get),
    1e3
  ), N = ey(
    ["initialData", n],
    async ([D, V]) => {
      const { data: g } = await wg(h, p == null ? void 0 : p.id);
      return {
        history: g ? kg(g.history) : [],
        faq: (g == null ? void 0 : g.faq) ?? [],
        initial_questions: (g == null ? void 0 : g.initial_questions) ?? [],
        logo: (g == null ? void 0 : g.logo) ?? ""
      };
    },
    {
      onSuccess(D) {
        _({
          type: "PREPEND_HISTORY",
          payload: D.history
        });
      },
      fallbackData: {
        history: [],
        faq: [],
        initial_questions: [],
        logo: ""
      },
      revalidateOnFocus: !1,
      revalidateOnReconnect: !1,
      revalidateOnMount: !0
    }
  ), F = be(() => {
    p && m && m.emit("join_session", { session_id: p.id });
  }, [p == null ? void 0 : p.id, m]), k = be(() => {
    p && m && m.emit("join_session", { session_id: p.id });
  }, [m]);
  He(() => (m == null || m.on("connect", F), m == null || m.on("reconnect", k), () => {
    m == null || m.off("connect", F), m == null || m.off("reconnect", k);
  }), [F, m, k]);
  function L(D) {
    m == null || m.emit("join_session", {
      session_id: D
    });
  }
  function R() {
    m == null || m.emit("leave_session", { session_id: p == null ? void 0 : p.id }), y(null), _({ type: "RESET" }), i == null || i();
  }
  function M() {
    R(), Do(h, n).then(({ data: D }) => {
      y(D), L(D.id);
    });
  }
  const G = (D) => {
    by({
      _message: D,
      _socket: m,
      onSessionUpdate(V, g) {
        y(V.value.session);
      },
      onBotMessage(V, g) {
        _({ type: "ADD_RESPONSE_MESSAGE", payload: V });
      },
      onChatEvent(V, g) {
        _({ type: "ADD_RESPONSE_MESSAGE", payload: V });
      },
      onUi(V, g) {
        _({ type: "ADD_RESPONSE_MESSAGE", payload: V });
      },
      onForm(V, g) {
        _({ type: "ADD_RESPONSE_MESSAGE", payload: V });
      },
      onOptions(V, g) {
        _({
          type: "SET_KEYBOARD",
          payload: {
            options: V.value.options
          }
        });
      },
      onVote(V, g) {
        V.server_message_id && V.client_message_id && _({
          type: "SET_SERVER_ID",
          payload: {
            clientMessageId: V.client_message_id,
            ServerMessageId: V.server_message_id
          }
        });
      }
    });
  }, q = be(
    (D) => {
      P(D);
    },
    [P]
  ), J = be(
    (D) => {
      _({
        type: "APPEND_USER_MESSAGE",
        payload: {
          user: D.user,
          type: "FROM_USER",
          deliveredAt: null,
          serverId: null,
          session_id: (p == null ? void 0 : p.id) ?? "",
          content: D.content,
          id: D.id ?? ze(10)
        }
      });
    },
    []
  ), re = be((D) => {
    _({
      type: "SET_DELIVERED_AT",
      payload: {
        clientMessageId: D.id,
        deliveredAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  }, []);
  He(() => {
    if (m)
      return m.on("structured_message", G), m.on("user_message_broadcast", J), m.on("ack:chat_message:delivered", re), m.on("info", q), () => {
        m.off("structured_message"), m.off("info"), m.off("user_message_broadcast"), m.off("ack:chat_message:delivered");
      };
  }, [G, q, J, m]), He(() => {
    _({ type: "INIT" });
  }, []);
  const ie = O.messages.length === 0;
  async function ae({
    content: D,
    user: V,
    headers: g,
    PathParams: de,
    query_params: Se,
    ...le
  }) {
    let Te = p;
    if (!p && ie)
      try {
        const { data: ce } = await Do(h, n);
        if (ce)
          y(ce), L(ce.id), Te = ce;
        else
          throw new Error("Failed to create session");
      } catch (ce) {
        return console.error("Error creating session:", ce), null;
      }
    if (Te && m) {
      const ce = ze(), Pe = {
        id: ce,
        bot_token: n,
        content: D.text,
        session_id: Te.id,
        headers: {
          ...o,
          ...g
        },
        pathParams: {
          ...a,
          ...de
        },
        query_params: {
          ...s,
          ...Se
        },
        user: {
          ...l,
          ...V
        },
        language: u,
        ...le
      };
      try {
        return _({
          type: "APPEND_USER_MESSAGE",
          payload: {
            type: "FROM_USER",
            id: ce,
            content: D.text,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: Te.id,
            user: Pe.user,
            deliveredAt: null,
            serverId: null
          }
        }), O.keyboard && _({
          type: "SET_KEYBOARD",
          payload: null
        }), m.emit("send_chat", Pe), Pe;
      } catch (Ee) {
        return console.error("Error sending message:", Ee), null;
      }
    }
    return null;
  }
  const b = be((D) => {
    ae({
      content: {
        text: D
      }
    }), _({
      type: "SET_KEYBOARD",
      payload: null
    });
  }, [_, ae, m]);
  return console.log("✨ Welcome to Open Widget"), {
    version: qo.version,
    state: O,
    session: p ?? null,
    // Derived // 
    isSessionClosed: (p == null ? void 0 : p.status) === Rn.CLOSED_RESOLVED || (p == null ? void 0 : p.status) === Rn.CLOSED_UNRESOLVED,
    noMessages: ie,
    initialData: (N == null ? void 0 : N.data) ?? null,
    // ------- //
    recreateSession: M,
    clearSession: R,
    sendMessage: ae,
    info: x,
    settings: c,
    setSettings: S,
    axiosInstance: h,
    handleKeyboard: b,
    hookState: "idle"
  };
}
const [ux, Qw] = ei();
function cx({
  children: e
}) {
  var r, i;
  const t = ti(), n = Kw({
    apiUrl: t.apiUrl ?? "https://api-v2.opencopilot.so/backend",
    socketUrl: t.socketUrl ?? "https://api-v2.opencopilot.so",
    botToken: t.token,
    headers: t.headers ?? {},
    queryParams: t.queryParams ?? {},
    pathParams: t.pathParams ?? {},
    userData: t.user ?? {},
    language: t.language,
    defaultHookSettings: {
      persistSession: ((r = t.settings) == null ? void 0 : r.persistSession) ?? !0,
      useSoundEffects: ((i = t.settings) == null ? void 0 : i.useSoundEffects) ?? !1
    }
  });
  return /* @__PURE__ */ ue(Qw, { value: n, children: e });
}
export {
  Si as A,
  ix as B,
  yg as C,
  ig as F,
  Ml as L,
  Ta as M,
  Ea as a,
  ki as b,
  ei as c,
  ti as d,
  ox as e,
  zl as f,
  rx as g,
  cx as h,
  vm as i,
  rg as j,
  gg as k,
  Do as l,
  wg as m,
  xg as n,
  ax as o,
  us as p,
  Hw as q,
  ux as u,
  sx as w
};
