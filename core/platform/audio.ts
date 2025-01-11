export interface WidgetAudio {
    /**
     * Plays an audio file from the given URL or path
     * @param file URL or path to the audio file
     * @returns A promise that resolves when the audio starts playing
     */
    play: (file: string) => Promise<void>;

    /**
     * Stops playing the current audio
     */
    stop: () => void;

    /**
     * Sets the volume level (0.0 to 1.0)
     * @param level Volume level between 0.0 (silent) and 1.0 (full volume)
     */
    setVolume: (level: number) => void;

    /**
     * Preloads an audio file for faster playback
     * @param file URL or path to the audio file to preload
     */
    preload: (file: string) => Promise<void>;

    /**
     * Checks if the audio system is available and working
     * @returns true if audio is available and can be played
     */
    isAvailable: () => boolean;
}

/**
 * Creates a web audio implementation using the HTML5 Audio API
 * @returns An Audio implementation for web platforms
 */
export function createWebAudio(): WidgetAudio {
    const audioElements = new Map<string, HTMLAudioElement>();

    return {
        async play(file: string) {
            try {
                let audio = audioElements.get(file);
                if (!audio) {
                    audio = new Audio(file);
                    audioElements.set(file, audio);
                }
                await audio.play();
            } catch (error) {
                console.warn('Failed to play audio:', error);
            }
        },

        stop() {
            audioElements.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        },

        setVolume(level: number) {
            const volume = Math.max(0, Math.min(1, level));
            audioElements.forEach(audio => {
                audio.volume = volume;
            });
        },

        async preload(file: string) {
            if (!audioElements.has(file)) {
                const audio = new Audio(file);
                audio.preload = 'auto';
                audioElements.set(file, audio);
                try {
                    // Start loading the audio file
                    audio.load();
                } catch (error) {
                    console.warn('Failed to preload audio:', error);
                }
            }
        },

        isAvailable() {
            return typeof Audio !== 'undefined';
        }
    };
}

/**
 * Creates a no-op audio implementation for environments without audio support
 * @returns A no-op Audio implementation
 */
export function createNoopAudio(): WidgetAudio {
    return {
        async play() {
            // No-op implementation
        },
        stop() {
            // No-op implementation
        },
        setVolume() {
            // No-op implementation
        },
        async preload() {
            // No-op implementation
        },
        isAvailable: () => false
    };
}