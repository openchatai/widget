import React from 'react';
import { Widget } from './src';
import { HandoffComponent } from './src/components/custom-components/Handoff.component';

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
