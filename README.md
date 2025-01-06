# The one and only chat widget for open

## How to Get Started

### 1. Installation

```bash
pnpm add @opencx/widget
```

### 2. Imports

```typescript
import { Widget, WidgetRoot } from "@opencx/widget/basic";
```

### 3. Usage

```typescript
<WidgetRoot options={options}>
  <Widget />
</WidgetRoot>
```

`WidgetRoot` is just the data layer for the widget. It is required to be present in the parent component of the widget.
You can Pass [options](./react-web/types/options.ts) to the `WidgetRoot` component to customize the widget.

## I don't want your UI? can I use my own?

Yes, everything in this lib is exported so you can build your own UI on top of it. Check out `core` and `react-lib` directories.
