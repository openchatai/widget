import React from 'react';
import { Widget } from './src';
import { HandoffDefaultComponent } from './src/components/custom-components/HandoffDefaultComponent';

const apiUrl = 'http://localhost:8080';
const token = import.meta.env.VITE_ORG_TOKEN;

export function DevApp() {
  return (
    <Widget
      components={[{ key: 'handoff', component: HandoffDefaultComponent }]}
      options={{
        apiUrl,
        token,
      }}
    />
  );
}
