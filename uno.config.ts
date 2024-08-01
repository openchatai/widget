// uno.config.ts
import { defineConfig, presetUno, presetWind, presetTypography } from "unocss";
export default defineConfig({
  details: true,
  theme: {
    colors: {
      primary: "hsl(var(--primary))",
      foreground: "hsl(var(--foreground))",
      background: "hsl(var(--background))",
      "primary-foreground": "hsl(var(--primary-foreground))",
      accent: "hsl(var(--accent))",
      secondary: "hsl(var(--secondary))",
    },
  },
  preflights: [
    {
      getCSS: () => {
        return `
*,
::before,
::after {
  box-sizing: border-box; 
  border-width: 0;
  border-style: solid;
  font-family: inherit;
  min-height: 0;
  min-width: 0;
  border-color: var(--un-default-border-color, #e5e7eb);
}
.mesh-gradient {
    background: radial-gradient(at 79.72176190214597% 20.412320497817582%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 1) 0%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 0) 100%), radial-gradient(at 24.413187967900242% 28.27256794794579%, hsla(180, 65.87677725118483%, 58.62745098039215%, 1) 0%, hsla(180, 65.87677725118483%, 58.62745098039215%, 0) 100%), radial-gradient(at 30.34125287587619% 5.401737468288581%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 1) 0%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 0) 100%), radial-gradient(at 57.6007624202924% 88.50047878878982%, hsla(180, 65.87677725118483%, 58.62745098039215%, 1) 0%, hsla(180, 65.87677725118483%, 58.62745098039215%, 0) 100%), radial-gradient(at 37.88374714683545% 57.23078357676581%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 1) 0%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 0) 100%), radial-gradient(at 50.83962840413041% 88.3184908438116%, hsla(180, 65.87677725118483%, 58.62745098039215%, 1) 0%, hsla(180, 65.87677725118483%, 58.62745098039215%, 0) 100%), radial-gradient(at 74.20232419014442% 54.065814714755646%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 1) 0%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 0) 100%), radial-gradient(at 3.1579470440860735% 86.36362193530418%, hsla(180, 65.87677725118483%, 58.62745098039215%, 1) 0%, hsla(180, 65.87677725118483%, 58.62745098039215%, 0) 100%), radial-gradient(at 60.88519854763468% 80.0489760878012%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 1) 0%, hsla(210.65693430656935, 64.92890995260665%, 58.62745098039215%, 0) 100%);            
}
::before,
::after {
  --un-content: '';
}

html,
:host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4; 
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0; 
  line-height: inherit;
}

hr {
  height: 0; 
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal;
  font-variation-settings: normal;
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit; 
  border-collapse: collapse; 
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button,
select {
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}


[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}


::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}


blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

dialog {
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}


button,
[role="button"] {
  cursor: pointer;
}


:disabled {
  cursor: default;
}


img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

img,
video {
  max-width: 100%;
  height: auto;
}
.flex-center {
display: flex;
align-items: center;
justify-content:center;
}
[hidden] {
  display: none;
}`;
      },
    },
  ],
  presets: [presetWind(), presetUno(), presetTypography()],
});
