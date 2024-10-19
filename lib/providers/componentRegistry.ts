import type { ComponentType, OptionsType } from "@lib/types";
import {
  BotLoadingComponent,
  BotTextResponse,
  ChatEventComponent,
  FallbackComponent,
} from "../@components";

/**
 * Singleton class for managing components within the widget.
 * Allows registering and fetching components with fallback options.
 */
export class ComponentRegistry {
  private components: ComponentType[] = [
    {
      key: "TEXT",
      component: BotTextResponse,
    },
    {
      key: "FALLBACK",
      component: FallbackComponent,
    },
    {
      key: "LOADING",
      component: BotLoadingComponent,
    },
    {
      key: "CHAT_EVENT",
      component: ChatEventComponent,
    },
  ];

  constructor(opts: OptionsType) {
    if (opts?.components) {
      opts.components.forEach((c) => this.register(c));
    }

    if (this.components.length === 0) {
      throw new Error("ComponentRegistry initialization failed: No components registered.");
    }

    if (!this.getComponent("FALLBACK")) {
      throw new Error("ComponentRegistry requires a fallback component.");
    }
  }

  /**
   * Registers a new component or replaces an existing one with the same key.
   * @param component - The component to be registered.
   */
  register(component: ComponentType): this {
    const existingIndex = this.components.findIndex((c) => c.key === component.key);

    if (existingIndex !== -1) {
      this.components[existingIndex] = component;
    } else {
      this.components.push(component);
    }

    return this;
  }

  /**
   * Retrieves a component by its key. If not found, returns null.
   * @param key - The key of the component to retrieve.
   */
  private getComponentByKey(key: string): ComponentType | null {
    return this.components.find((c) => c.key.toUpperCase() === key.toUpperCase()) || null;
  }

  /**
   * Retrieves a component by key or falls back to the fallback component.
   * @param key - The key of the component to retrieve (optional).
   */
  private getComponentOrFallback(key?: string): ComponentType {
    return this.getComponentByKey(key ?? "FALLBACK") || this.getComponentByKey("FALLBACK")!;
  }

  /**
   * Public method to retrieve a component.
   * Optionally, returns a fallback component if the key is not found.
   * @param key - The key of the component to retrieve.
   * @param useFallback - Whether to return the fallback component if the key is not found.
   */
  public getComponent(key: string, useFallback: boolean = false): ComponentType["component"] | null {
    if (useFallback) {
      return this.getComponentOrFallback(key).component;
    }

    return this.getComponentByKey(key)?.component ?? null;
  }

  public destroy(): void {
    this.components = [];
  }

}
