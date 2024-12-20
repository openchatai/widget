import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSound } from "./use-sound";

const sampleSfx = "https://cloud.opencopilot.so/sfx/notification3.mp3";

describe('useSound', () => {
    let mockPlay: ReturnType<typeof vi.fn>;
    let mockPause: ReturnType<typeof vi.fn>;
    let mockAudioInstance: any;

    beforeEach(() => {
        mockPlay = vi.fn().mockImplementation(() => Promise.resolve());
        mockPause = vi.fn();

        mockAudioInstance = {
            play: mockPlay,
            pause: mockPause,
            volume: 1,
            currentTime: 0,
            src: '',
            preload: 'none',
            loop: false,
        };

        global.Audio = vi.fn().mockImplementation(() => mockAudioInstance);

        console.error = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    it('should create an Audio instance with correct initial properties', () => {
        renderHook(() =>
            useSound({
                src: sampleSfx,
                volume: 0.5
            })
        );
        expect(global.Audio).toHaveBeenCalledWith(sampleSfx);
        expect(mockAudioInstance.volume).toBe(0.5);
        expect(mockAudioInstance.preload).toBe('auto');
        expect(mockAudioInstance.loop).toBe(false);
    });

    it('should use default volume when not provided', () => {
        renderHook(() =>
            useSound({
                src: sampleSfx
            })
        );
        expect(mockAudioInstance.volume).toBe(1);
    });

    it('should play audio when soundEnabled is true', () => {
        const { result } = renderHook(() =>
            useSound({
                src: sampleSfx,
                soundEnabled: true
            })
        );

        act(() => {
            result.current.play();
        });

        expect(mockPlay).toHaveBeenCalled();
    });
    it('should not play audio when soundEnabled is false', () => {
        const { result } = renderHook(() =>
            useSound({
                src: sampleSfx,
                soundEnabled: false
            })
        );

        act(() => {
            result.current.play();
        });

        expect(mockPlay).not.toHaveBeenCalled();
    });

    it('should stop audio correctly', () => {
        const { result } = renderHook(() => 
            useSound({ 
                src:sampleSfx
            })
        );

        act(() => {
            result.current.stop();
        });

        expect(mockPause).toHaveBeenCalled();
        expect(mockAudioInstance.currentTime).toBe(0);
    });


    
    it('should pause audio without resetting time', () => {
        const { result } = renderHook(() => 
            useSound({ 
                src: sampleSfx
            })
        );

        mockAudioInstance.currentTime = 10;

        act(() => {
            result.current.pause();
        });

        expect(mockPause).toHaveBeenCalled();
        expect(mockAudioInstance.currentTime).toBe(10);
    });


    it('should handle play errors gracefully', async () => {
        mockPlay.mockRejectedValueOnce(new Error('Play failed'));

        const { result } = renderHook(() => 
            useSound({ 
                src: sampleSfx
            })
        );

        await act(async () => {
            result.current.play();
        });

        expect(console.error).toHaveBeenCalledWith(
            'Error playing audio:',
            expect.any(Error)
        );
    });
})