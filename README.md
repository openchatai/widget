# The one and only chat widget for open

## How to Get Started

### 1. Install the Package

```bash
pnpm add @opencopilot/widget
```

### 2. Import the package

```javascript
import { Widget, WidgetRoot } from "@opencopilot/widget/basic";
```

### 3. Use the Widget

```javascript
<div>
  <WidgetRoot>
    <Widget />
  </WidgetRoot>
</div>
```

Widget Root is just the data layer for the widget. It is required to be present in the parent component of the widget.
You can Pass options to the `WidgetRoot` component to customize the widget.

```typescript
type WidgetOptions = {
  token: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  initialMessages: string;
  apiUrl: string;
  socketUrl: string;
  debug?: boolean;
  language?: LangType;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, string>;
    avatarUrl?: string;
  };
  bot?: {
    name?: string;
    avatarUrl?: string;
  };
  components?: ComponentType[];
};
```

also you must import the css file too.

```javascript
import "@opencopilot/widget/index.css";
```

also the styles are scoped to the widget only so the widget should have a container with `data-chat-widget`

```javascript
import { Widget, WidgetRoot, WidgetPopover } from "@opencopilot/widget";
import "@opencopilot/widget/index.css";
<div data-chat-widget>
  <WidgetRoot>
    <Widget />
  </WidgetRoot>
</div>;
```

## How about the WidgetPopover ?

It's a component that you can use to show the widget in a popover fixed to the bottom left corner

```javascript
<div data-chat-widget>
  <WidgetPopover>
    <Widget />
  </WidgetPopover>
</div>
```

## How can i Change the colors of the widget ?

these are the css variables that you can change to customize the widget
you may add these variables to the parent container of the widget
to override the default colors

```
const vars = `
[--primary:211_65%_59%]
[--foreground:0_0%_0%]
[--background:0_0%_100%]
[--secondary:0_0%_96%]
[--primary-foreground:217_72%_18%]
[--accent:0_0_22%]
`;
```

## I don't want your ui ? can i use my own ?

Yes You can, every thing in this lib is exported so u can build your own ui on top of it
Even the core hook of the widget is exported so you can use it to build your own ui
