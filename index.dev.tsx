import React from 'react';
import { createRoot } from 'react-dom/client';
import { DevApp } from './app.dev';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}
createRoot(rootElement).render(<DevApp />);
