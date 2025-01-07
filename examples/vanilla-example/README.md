# OpenChat Widget - Vanilla Example

This is a vanilla TypeScript example of using the OpenChat Widget without any framework.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the configuration in `src/main.ts`:
```typescript
const configOptions: CoreOptions = {
    token: 'YOUR_BOT_TOKEN', // Replace with your bot token
    apiUrl: 'YOUR_API_URL', // Replace with your API URL
};
```

3. Start the development server:
```bash
npm run dev
```

## Features

- Simple chat interface
- Real-time message updates
- Loading states
- Error handling
- Keyboard input support
- Mobile-friendly design

## Project Structure

- `index.html` - Main HTML file with styles and layout
- `src/main.ts` - TypeScript entry point with chat logic
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build:

```bash
npm run preview
``` 