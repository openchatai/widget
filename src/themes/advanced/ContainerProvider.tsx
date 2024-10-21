import { createSafeContext } from "@lib/utils/create-safe-context";

const [
    useContainer,
    ContainerProvider
] = createSafeContext<{
    containerElement: HTMLElement;
}>()

export {
    ContainerProvider,
    useContainer
}