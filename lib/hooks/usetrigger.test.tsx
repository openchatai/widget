import '@testing-library/jest-dom/vitest';
import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTrigger } from './useTrigger';

const elementId = "test-trigger";
const newElementId = "new-test-trigger";

describe('useTrigger', () => {
    beforeEach(() => {
        // Set up the element in the DOM before rendering the hook
        const triggerElement = document.createElement("div");
        triggerElement.setAttribute("id", elementId);
        triggerElement.textContent = "Click me!";
        document.body.appendChild(triggerElement);
    });

    afterEach(() => {
        // Clean up the elements from the DOM after each test
        const triggerElement = document.getElementById(elementId);
        const newTriggerElement = document.getElementById(newElementId);
        if (triggerElement) {
            document.body.removeChild(triggerElement);
        }
        if (newTriggerElement) {
            document.body.removeChild(newTriggerElement);
        }
        cleanup();
    });

    it("should be defined", () => {
        expect(useTrigger).toBeDefined();
    });

    it("should trigger a click event when the target element is clicked", () => {
        const handleClickMock = vi.fn();

        // Render the hook with the correct triggerId
        renderHook(() =>
            useTrigger({
                triggerId: elementId,
                handleClick: handleClickMock,
            })
        );

        // Get the element and trigger a click event
        const triggerElement = document.getElementById(elementId);
        triggerElement?.click();

        // Expect that the handleClick function was called once
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });

    it("should not attach an event listener if no triggerId is provided", () => {
        const handleClickMock = vi.fn();

        // Render the hook without providing a triggerId
        renderHook(() =>
            useTrigger({
                handleClick: handleClickMock,
            })
        );

        // Get the element and trigger a click event
        const triggerElement = document.getElementById(elementId);
        triggerElement?.click();

        // Expect that the handleClick function was not called
        expect(handleClickMock).not.toHaveBeenCalled();
    });

    it("should not throw errors if the target element is not found", () => {
        const handleClickMock = vi.fn();

        // Render the hook with a non-existent triggerId
        const { result } = renderHook(() =>
            useTrigger({
                triggerId: "non-existent-id",
                handleClick: handleClickMock,
            })
        );

        // Expect that the hook returns null (since no element is found)
        expect(result.current).toBeNull();

        // Get the element and trigger a click event
        const triggerElement = document.getElementById(elementId);
        triggerElement?.click();

        // Expect that the handleClick function was not called
        expect(handleClickMock).not.toHaveBeenCalled();
    });

    it("should remove the event listener on unmount", () => {
        const handleClickMock = vi.fn();

        // Render the hook
        const { unmount } = renderHook(() =>
            useTrigger({
                triggerId: elementId,
                handleClick: handleClickMock,
            })
        );

        // Unmount the hook
        unmount();

        // Get the element and trigger a click event
        const triggerElement = document.getElementById(elementId);
        triggerElement?.click();

        // Expect that the handleClick function was not called since the hook is unmounted
        expect(handleClickMock).not.toHaveBeenCalled();
    });

    it("should handle triggerId changes", () => {
        const handleClickMock = vi.fn();

        // Set up a new element in the DOM
        const newTriggerElement = document.createElement("div");
        newTriggerElement.setAttribute("id", newElementId);
        newTriggerElement.textContent = "New Click me!";
        document.body.appendChild(newTriggerElement);

        // Render the hook with the initial triggerId
        const { rerender } = renderHook(
            ({ triggerId }) =>
                useTrigger({
                    triggerId,
                    handleClick: handleClickMock,
                }),
            { initialProps: { triggerId: elementId } }
        );

        // Click the old element
        const triggerElement = document.getElementById(elementId);
        triggerElement?.click();

        // Expect that the handleClick function was called once
        expect(handleClickMock).toHaveBeenCalledTimes(1);

        // Rerender the hook with the new triggerId
        rerender({ triggerId: newElementId });

        // Click the old element again
        triggerElement?.click();

        // Expect that the handleClick function was still called only once (since it should no longer listen to the old element)
        expect(handleClickMock).toHaveBeenCalledTimes(1);

        // Click the new element
        const newTriggerElementInstance = document.getElementById(newElementId);
        newTriggerElementInstance?.click();

        // Expect that the handleClick function was called again for the new element
        expect(handleClickMock).toHaveBeenCalledTimes(2);
    });
});
