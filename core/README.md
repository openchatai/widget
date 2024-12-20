# OpenChatAI Core Module

## Overview
The `core` module is a fundamental part of the OpenChatAI widget, providing essential functionality for building and managing chat-related applications.

## Installation

### Package Manager

```bash
# npm
npm install @openchatai/widget

# pnpm
pnpm add @openchatai/widget

# yarn
yarn add @openchatai/widget
```

## Importing Core Module

### ES Module (Recommended)
```typescript
import { ChatClient } from '@openchatai/widget/core';
import { ChatSession } from '@openchatai/widget/core';
```

### CommonJS
```javascript
const { ChatClient } = require('@openchatai/widget/core');
const { ChatSession } = require('@openchatai/widget/core');
```

## Peer Dependencies
Ensure you have the following peer dependencies installed:

- `react@^18.3.1`
- `lucide-react@^0.412.0`
- `rehype-raw@^7.0.0`

## Basic Usage

### Creating a Chat Client

```typescript
import { ChatClient } from '@openchatai/widget/core';
import { ChatSession } from '@openchatai/widget/core';

// Initialize a new chat client
const client = new ChatClient({
  // Configuration options
  apiKey: 'your-api-key',
  platform: 'your-platform'
});

// Create a new chat session
const session = new ChatSession(client);

// Send a message
await session.sendMessage('Hello, how are you?');
```

### Error Handling

```typescript
import { ChatError } from '@openchatai/widget/core/errors';

try {
  // Your chat operations
} catch (error) {
  if (error instanceof ChatError) {
    // Handle specific chat-related errors
    console.error('Chat Error:', error.message);
  }
}
```

## Module Structure
The core module is organized into several key directories:

- `client/`: Client-side implementations and interfaces
- `errors/`: Custom error handling and exception classes
- `platform/`: Platform-specific utilities and integrations
- `session/`: Session management and tracking
- `transport/`: Communication and data transport mechanisms
- `types/`: TypeScript type definitions and interfaces
- `utils/`: Utility functions and helper methods

## Advanced Usage

### Custom Transport Layer

```typescript
import { BaseTransport } from '@openchatai/widget/core/transport';

class CustomTransport extends BaseTransport {
  async send(message) {
    // Implement custom message sending logic
  }
}

const client = new ChatClient({
  transport: new CustomTransport()
});
```
