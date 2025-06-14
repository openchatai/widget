import React from 'react';
import { Widget } from './src/designs/react';
import { HandoffComponent } from './src/designs/react/components/custom-components/Handoff.component';

const apiUrl = 'http://localhost:8080';
const token = import.meta.env.VITE_ORG_TOKEN;

export function DevApp() {
  return (
    <Widget
      components={[{ key: 'handoff', component: HandoffComponent }]}
      options={{
        apiUrl,
        token,
      }}
    />
  );
}
