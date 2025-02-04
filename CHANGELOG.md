# @opencx/widget

## 3.0.33

### Patch Changes

- fix sessions refresh

## 3.0.32

### Patch Changes

- allow adding custom components to default react widget

## 3.0.31

### Patch Changes

- fix text wrapping and overflow and breaking and whatnot

## 3.0.30

### Patch Changes

- allow sending attachments even with empty message text content

## 3.0.29

### Patch Changes

- break very long words in messages

## 3.0.28

### Patch Changes

- add condition to abort sendMessage if session is assigned to ai and the last message is a user message (still awaiting bot response)

## 3.0.27

### Patch Changes

- enhance attachment preview

## 3.0.26

### Patch Changes

- fix is-awaiting-bot-reply

## 3.0.25

### Patch Changes

- style fixes

## 3.0.24

### Patch Changes

- enhance avatars will fallbacks and name in tooltip

## 3.0.23

### Patch Changes

- fix isAwaitingBotReply (when session is not handed-off but agent took over the chat)

## 3.0.22

### Patch Changes

- include agent object when mapping messages

## 3.0.21

### Patch Changes

- enhance session card styles

## 3.0.20

### Patch Changes

- fix custom components

## 3.0.19

### Patch Changes

- refresh sessions every 10 seconds

## 3.0.18

### Patch Changes

- fix ai res might solve user issue

## 3.0.17

### Patch Changes

- fix initial sessions fetch when user.token is initially provided

## 3.0.16

### Patch Changes

- prevent re-renderes from reinitializing the widget context

## 3.0.15

### Patch Changes

- export useWidgetRouter

## 3.0.14

### Patch Changes

- add loading when fetching messages

## 3.0.13

### Patch Changes

- add sessions screen

## 3.0.12

### Patch Changes

- get persisted sessions

## 3.0.11

### Patch Changes

- refactor `basic` dir

## 3.0.10

### Patch Changes

- fetch previous sessions

## 3.0.9

### Patch Changes

- rtl fixes

## 3.0.8

### Patch Changes

- fix config.theme.primaryColor

## 3.0.7

### Patch Changes

- styling changes

## 3.0.6

### Patch Changes

- refactor components types

## 3.0.5

### Patch Changes

- republish

## 3.0.4

### Patch Changes

- rename states in utility hooks

## 3.0.3

### Patch Changes

- fix: persist api schema types after build

## 3.0.2

### Patch Changes

- fix exposing types

## 3.0.1

### Patch Changes

- use relative paths

## 3.0.0

### Major Changes

- Improve data layer architecture

## 2.6.3

### Patch Changes

- fix file uploads

## 2.6.2

### Patch Changes

- fix collect user data

## 2.6.1

### Patch Changes

- integrate with new core

## 2.6.0

### Minor Changes

- just another version :p

## 2.5.1

### Patch Changes

- provide uuid when saving user messages

## 2.5.0

### Minor Changes

- change chat messages styles

## 2.4.4

### Patch Changes

- 9e1a329: disable storage cleanups
- bad8a80: .
- d726352: some changes
- a90a3c3: rn
- 5b62158: export more stuff

## 2.4.4-rn.4

### Patch Changes

- disable storage cleanups

## 2.4.4-rn.3

### Patch Changes

- .

## 2.4.4-rn.2

### Patch Changes

- some changes

## 2.4.4-rn.1

### Patch Changes

- export more stuff

## 2.4.4-rn.0

### Patch Changes

- rn

## 2.4.3

### Patch Changes

- change session-closed section

## 2.4.2

### Patch Changes

- remove headerStyle option

## 2.4.1

### Patch Changes

- fix WidgetOptions import

## 2.4.0

### Minor Changes

- voting component, headless support

## 2.3.1

### Patch Changes

- fix loading

## 2.3.0

### Minor Changes

- no more socket

## 2.2.0

### Minor Changes

- cec8bf7: export Widget and WidgetRoot from basic dir

## 2.1.0

### Minor Changes

- 191a0e1: change opencopilot occurrences to opencx

## 2.0.0

### Major Changes

- 2c9c18c: change namespace

## 1.6.0

### Minor Changes

- 4b9261d: design v2 phase-1

## 1.5.23

## 2.0.0

### Major Changes

- b19f7c6: http, removed socket

## 2.0.0-next.0

### Major Changes

- http, removed socket

### Patch Changes

- fdcede4: .

## 1.5.22

### Patch Changes

- 0fc9829: .

## 1.5.21

### Patch Changes

- 2b95020: fix loading

## 1.5.20

### Patch Changes

- 108fd44: add sourcemaps

## 1.5.19

### Patch Changes

- 579c972: .

## 1.5.18

### Patch Changes

- b480200: .

## 1.5.17

### Patch Changes

- c7e82f1: tree shakeable imports

## 1.5.16

### Patch Changes

- bce6fed: .
- d3c7e67: vite again

## 1.5.16-alpha.0

### Patch Changes

- bce6fed: .

## 1.5.15

### Patch Changes

- ffb4b60: .

## 1.5.14

### Patch Changes

- 6b837f2: bundle rehype-raw
- 48ca9c3: change the default bundler
- a9c8c7b: .

## 1.5.14-alpha.2

### Patch Changes

- d3c7e67: vite again

## 1.5.14-alpha.1

### Patch Changes

- a9c8c7b: .

## 1.5.14-alpha.0

### Patch Changes

- 48ca9c3: change the default bundler

## 1.5.13

### Patch Changes

- 87fa489: minor package.json update

## 1.5.12

### Patch Changes

- dcbeb2e: clean release

## 1.5.11

### Patch Changes

- 1ba4482: minify more

## 1.5.10

### Patch Changes

- bf8425d: some ui adjustments

## 1.5.9

### Patch Changes

- 316831e: patch

## 1.5.8

### Patch Changes

- 78a810d: send contact data

## 1.5.7

### Patch Changes

- 93c322b: ..

## 1.5.6

### Patch Changes

- 2a7e503: ..

## 1.5.5

### Patch Changes

- 57458a3: remove the timeout from hook state

## 1.5.4

### Patch Changes

- 2781299: render html sometimes

## 1.5.3

### Patch Changes

- ac73291: fix the attachment visiblity

## 1.5.2

### Patch Changes

- e552692: ui enhancements

## 1.5.1

### Patch Changes

- 1da13be: allow file attachment when the session is handed off

## 1.5.0

### Minor Changes

- 82efa46: file attachment

## 1.4.33

### Patch Changes

- e15ffa3: open links in the parent window insted of the containing iframe

## 1.4.32

### Patch Changes

- 78facf9: 123

## 1.4.31

### Patch Changes

- e5922e9: fix the language thingy

## 1.4.30

### Patch Changes

- 084a956: hidden by default

## 1.4.29

### Patch Changes

- 955b185: -

## 1.4.28

### Patch Changes

- dbb3efc: ---

## 1.4.27

### Patch Changes

- b179af6: style changes

## 1.4.26

### Patch Changes

- 83a1064: iframed by default for the embeded widget

## 1.4.25

### Patch Changes

- c18ec9b: update styles

## 1.4.24

### Patch Changes

- 95287f3: don't send a message when the consumer data get submitted

## 1.4.23

### Patch Changes

- 6cf07e5: --

## 1.4.22

### Patch Changes

- f5eb463: fixing some styling issues

## 1.4.21

### Patch Changes

- 236e797: --

## 1.4.20

### Patch Changes

- bcc4d82: talk to support button should respect the widget theme

## 1.4.19

### Patch Changes

- 41bcf3f: minor styling fix

## 1.4.18

### Patch Changes

- e8bacb9: remove branding

## 1.4.17

### Patch Changes

- efb38e4: setting background none to links, some websites does that weird styling

## 1.4.16

### Patch Changes

- b417b51: new welcome screen

## 1.4.15

### Patch Changes

- b43bfc2: fixing styling issues

## 1.4.14

### Patch Changes

- 22c5687: animation changes, also persist open state

## 1.4.13

### Patch Changes

- 1e6ffed: fixed text color

## 1.4.12

### Patch Changes

- 604ac03: fixing bugs, major styling upgrade

## 1.4.11

### Patch Changes

- 74a7709: send the contact data also

## 1.4.10

### Patch Changes

- 9631623: fix a styling issue, more enhancements

## 1.4.9

### Patch Changes

- cc3972f: collect data

## 1.4.8

### Patch Changes

- a8b00f0: remove halwer

## 1.4.7

### Patch Changes

- 8e7d5b8: remove unused session, history properties

## 1.4.6

### Patch Changes

- 900501e: fix the header

## 1.4.5

### Patch Changes

- 751fb36: implementing sound effects, better ui

## 1.4.4

### Patch Changes

- a39a56c: update the iframed widget

## 1.4.3

### Patch Changes

- e3937d8: minor adjustments

## 1.4.2

### Patch Changes

- 8f088ad: handle when the status of ticket doesn't change

## 1.4.1

### Patch Changes

- 8ab01c1: fix the loading states

## 1.4.0

### Minor Changes

- af0d886: improvements

## 1.3.10

### Patch Changes

- df4d748: fixing the session persistance

## 1.3.9

### Patch Changes

- 639d20d: fix the agent name issue

## 1.3.8

### Patch Changes

- 3934edf: use external id

## 1.3.7

### Patch Changes

- 209bd7f: additional key to persist

## 1.3.6

### Patch Changes

- 64b4057: refresh the chat session on startup!

## 1.3.5

### Patch Changes

- c5cf81a: add box shadow

## 1.3.4

### Patch Changes

- e8c2312: remove BroadcastChannel

## 1.3.3

### Patch Changes

- 3687c56: handle cross tab sync

## 1.3.2

### Patch Changes

- 4eca145: fix initial data

## 1.3.1

### Patch Changes

- 055a518: update widget file structure

## 1.3.0

### Minor Changes

- 0833601: refactored socket message handling

## 1.2.20

### Patch Changes

- e987a81: iframed option

## 1.2.19

### Patch Changes

- 9f16c77: fix the resolution

## 1.2.18

### Patch Changes

- 24f5a69: fix the duplicate first message

## 1.2.17

### Patch Changes

- 0db6737: using variables

## 1.2.16

### Patch Changes

- bb11a05: another trial to fix the sizing issue

## 1.2.15

### Patch Changes

- dfaffeb: rr

## 1.2.14

### Patch Changes

- dbe8c58: d

## 1.2.13

### Patch Changes

- 4f5cfbf: d

## 1.2.12

### Patch Changes

- efcb83a: another trial

## 1.2.11

### Patch Changes

- 29beb30: another trial

## 1.2.10

### Patch Changes

- 1cc6940: scoping the embeded widget

## 1.2.9

### Patch Changes

- 8604e16: fix the font

## 1.2.8

### Patch Changes

- a0af183: fix the font-size issue

## 1.2.7

### Patch Changes

- c33dfcc: fix the initial messages

## 1.2.6

### Patch Changes

- 5d51210: fix a bug!

## 1.2.5

### Patch Changes

- bb5f0a9: keyboard, options overall bug fixes

## 1.2.4

### Patch Changes

- 70e0648: add pt translations

## 1.2.3

### Patch Changes

- 6def731: fix the font size on some websites

## 1.2.2

### Patch Changes

- c6bf3dc: fix the z-index on widgetPopover

## 1.2.1

### Patch Changes

- 95aad4a: fix the display of the open ui

## 1.2.0

### Minor Changes

- f64a2f2: realtime features and localization support

## 1.1.27

### Patch Changes

- 9b28ec6: same

## 1.1.26

### Patch Changes

- ba37901: get the version

## 1.1.25

### Patch Changes

- 82979f2: allow sendmessage to recieve extra object keys, and return the payload on success

## 1.1.24

### Patch Changes

- 7a64465: users can pass settings object to persist the sesion

## 1.1.23

### Patch Changes

- 0e16581: same

## 1.1.22

### Patch Changes

- 9442830: fixed useConfigData which was removed by mistake

## 1.1.21

### Patch Changes

- 9b2ce64: rename useChat, refactor exports

## 1.1.20

### Patch Changes

- 3775ab6: users don't have to pass the user object to send a chat

## 1.1.19

### Patch Changes

- 9c28a7c: send the user object

## 1.1.18

### Patch Changes

- b8609d7: send the user object with every message

## 1.1.17

### Patch Changes

- 717a7d5: fix the message appending issue

## 1.1.16

### Patch Changes

- a523b17: chat events, rendering, handling

## 1.1.15

### Patch Changes

- 2f0b5b0: added office hours getter `getOfficeHours`

## 1.1.14

### Patch Changes

- 7709108: handle when the session gets handoffed to a human agent,

## 1.1.13

### Patch Changes

- e97953c: update deps

## 1.1.12

### Patch Changes

- 8b22cb6: export correct types

## 1.1.11

### Patch Changes

- 6b66e9d: fix the type exports

## 1.1.10

### Patch Changes

- 14b0aee: pass the correct data to ui components

## 1.1.9

### Patch Changes

- 88c4c73: fix the headers, queryParams passing, added font fot openUI

## 1.1.8

### Patch Changes

- ef7abb8: fix the CI

## 1.1.7

### Patch Changes

- d80f143: fix serverId, ui handling

## 1.1.6

### Patch Changes

- 43efe75: decode json function to fix invalid json responses, added voting hooks

## 1.1.5

### Patch Changes

- cffa8ea: export botMessage too

## 1.1.4

### Patch Changes

- 479aeba: export botmessage wrapper

## 1.1.3

### Patch Changes

- 26374f5: fix the other exports

## 1.1.2

### Patch Changes

- 09319ae: fix the useChat export

## 1.1.1

### Patch Changes

- 0c1edbe: handle agent response, partial message response

## 1.1.0

### Minor Changes

- 103ebb7: new refreshed ui, no need to add data-chat on the container element to scope the styles

## 1.0.0

### Major Changes

- fd99178: manage the widget from one hook, encapsulated logic.
