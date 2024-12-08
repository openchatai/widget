import type { ComponentType, OptionsType } from "@lib/types";

/**
 * this a singleton  class helps me to easily control the components present/available in the widget.
 * it also manages the various types of components to be added along the way.
 */
export class ComponentRegistry {
  components: ComponentType[] = [
    {
      key: "FALLBACK",
      component: (data) => "fallback",
    },
    {
      key: "LOADING",
      component: (data) => "loading",
    },
  ] as const;

  constructor(opts: OptionsType) {
    const { components } = opts;

    if (components) {
      components.forEach((c) => this.register(c));
    }

    if (this.components.length === 0) {
      throw new Error("No components registered");
    } else if (!this.get("FALLBACK")) {
      throw new Error("No fallback component registered");
    }
  }

  register(com: ComponentType) {
    // Replace the key if it already exists
    const index = this.components.findIndex((c) => c.key === com.key);
    if (index !== -1) {
      this.components[index] = com;
    } else {
      this.components.push(com);
    }
    return this;
  }

  private get(key: string) {
    const c = this.components.find(
      (c) => c.key.toUpperCase() === key.toUpperCase(),
    );
    if (c) return c;
    return null;
  }

  private getOrFallback(key?: string) {
    return key ? this.get(key) || this.get("FALLBACK")! : this.get("FALLBACK")!;
  }

  public getComponent(key: string, getFallback?: boolean) {
    if (getFallback) {
      return this.getOrFallback(key).component;
    }

    return this.get(key)?.component;
  }
}
