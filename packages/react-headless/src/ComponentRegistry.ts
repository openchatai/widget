import type { WidgetComponentKey } from '@opencx/widget-core';
import type { WidgetComponentType } from './types/components';

export class ComponentRegistry {
  components: WidgetComponentType[] = [];

  constructor(opts: { components?: WidgetComponentType[] }) {
    const { components } = opts;

    if (components) {
      components.forEach((c) => this.register(c));
    }

    if (this.components.length === 0) {
      throw new Error('No components registered');
    }
    if (!this.get('fallback')) {
      throw new Error('No fallback component registered');
    }
  }

  // TODO test that this registers or replaces the component
  register(component: WidgetComponentType) {
    // Replace the key if it already exists
    const index = this.components.findIndex((c) => c.key === component.key);
    if (index !== -1) {
      this.components[index] = component;
    } else {
      this.components.push(component);
    }
    return this;
  }

  private get(key: WidgetComponentKey) {
    const c = this.components.find(
      (c) => c.key.toUpperCase() === key.toUpperCase(),
    );
    if (c) return c;
    return null;
  }

  public getComponent(key: string) {
    return this.get(key)?.component;
  }
}
