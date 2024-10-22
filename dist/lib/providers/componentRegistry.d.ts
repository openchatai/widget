import { ComponentType, OptionsType } from '../types';
/**
 * this a singleton  class helps me to easily control the components present/available in the widget.
 * it also manages the various types of components to be added along the way.
 */
export declare class ComponentRegistry {
    components: ComponentType[];
    constructor(opts: OptionsType);
    register(com: ComponentType): this;
    private get;
    private getOrFallback;
    getComponent(key: string, getFallback?: boolean): import('react').ElementType<any, keyof import("react").JSX.IntrinsicElements> | undefined;
}
