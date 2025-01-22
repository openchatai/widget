import type { WidgetComponentKey } from "../core";
import type { WidgetComponentType } from "./types/components";

export class ComponentRegistry {
  components: WidgetComponentType[] = [
    {
      key: "fallback",
      component: (data) => "fallback",
    },
    {
      key: "loading",
      component: (data) => "loading",
    },
  ] as const;

  constructor(opts: { components?: WidgetComponentType[] }) {
    const { components } = opts;

    if (components) {
      components.forEach((c) => this.register(c));
    }

    if (this.components.length === 0) {
      throw new Error("No components registered");
    } else if (!this.get("fallback")) {
      throw new Error("No fallback component registered");
    }
  }

  register(com: WidgetComponentType) {
    // Replace the key if it already exists
    const index = this.components.findIndex((c) => c.key === com.key);
    if (index !== -1) {
      this.components[index] = com;
    } else {
      this.components.push(com);
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

  private getOrFallback(key?: string) {
    return key ? this.get(key) || this.get("fallback")! : this.get("fallback")!;
  }

  public getComponent(key: string, getFallback?: boolean) {
    if (getFallback) {
      return this.getOrFallback(key).component;
    }

    return this.get(key)?.component;
  }
}
