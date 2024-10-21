import { css } from "styled-components";

export const modernNormalize = css`
*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: currentColor; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
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
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
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
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}


button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

button,
select {
  text-transform: none;
}

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
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
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
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
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

img,
video {
  max-width: 100%;
  height: auto;
}
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.ProseMirror {
  @apply p-12 px-8 sm:px-12;
}

.ProseMirror .is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: hsl(var(--muted-foreground));
  pointer-events: none;
  height: 0;
}
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: hsl(var(--muted-foreground));
  pointer-events: none;
  height: 0;
}

/* Custom image styles */
.ProseMirror img {
  transition: filter 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &.ProseMirror-selectednode {
    outline: 3px solid #5abbf7;
    filter: brightness(90%);
  }
}

.img-placeholder {
  position: relative;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid var(--novel-stone-200);
    border-top-color: var(--novel-stone-800);
    animation: spinning 0.6s linear infinite;
  }
}

@keyframes spinning {
  to {
    transform: rotate(360deg);
  }
}

/* Custom TODO list checkboxes – shoutout to this awesome tutorial: https://moderncss.dev/pure-css-custom-checkbox-style/ */
ul[data-type="taskList"] li > label {
  margin-right: 0.2rem;
  user-select: none;
}

@media screen and (max-width: 768px) {
  ul[data-type="taskList"] li > label {
    margin-right: 0.5rem;
  }
}

ul[data-type="taskList"] li > label input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: hsl(var(--background));
  margin: 0;
  cursor: pointer;
  width: 1.2em;
  height: 1.2em;
  position: relative;
  top: 5px;
  border: 2px solid hsl(var(--border));
  margin-right: 0.3rem;
  display: grid;
  place-content: center;

  &:hover {
    background-color: hsl(var(--accent));
  }

  &:active {
    background-color: hsl(var(--accent));
  }

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em;
    transform-origin: center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }
}

ul[data-type="taskList"] li[data-checked="true"] > div > p {
  color: var(--muted-foreground);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

/* Overwrite tippy-box original max-width */
.tippy-box {
  max-width: 400px !important;
}

.ProseMirror:not(.dragging) .ProseMirror-selectednode {
  outline: none !important;
  background-color: var(--novel-highlight-blue);
  transition: background-color 0.2s;
  box-shadow: none;
}

.drag-handle {
  position: fixed;
  opacity: 1;
  transition: opacity ease-in 0.2s;
  border-radius: 0.25rem;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(0, 0, 0, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
  background-repeat: no-repeat;
  background-position: center;
  width: 1.2rem;
  height: 1.5rem;
  z-index: 50;
  cursor: grab;

  &:hover {
    background-color: var(--novel-stone-100);
    transition: background-color 0.2s;
  }

  &:active {
    background-color: var(--novel-stone-200);
    transition: background-color 0.2s;
    cursor: grabbing;
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
    pointer-events: none;
  }
}

.dark .drag-handle {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(255, 255, 255, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
}

/* Custom Youtube Video CSS */
iframe {
  border: 8px solid #ffd00027;
  border-radius: 4px;
  min-width: 200px;
  min-height: 200px;
  display: block;
  outline: 0px solid transparent;
}

div[data-youtube-video] > iframe {
  cursor: move;
  aspect-ratio: 16 / 9;
  width: 100%;
}

.ProseMirror-selectednode iframe {
  transition: outline 0.15s;
  outline: 6px solid #fbbf24;
}

@media only screen and (max-width: 480px) {
  div[data-youtube-video] > iframe {
    max-height: 50px;
  }
}

@media only screen and (max-width: 720px) {
  div[data-youtube-video] > iframe {
    max-height: 100px;
  }
}

/* CSS for bold coloring and highlighting issue*/
span[style] > strong {
  color: inherit;
}

mark[style] > strong {
  color: inherit;
}

`