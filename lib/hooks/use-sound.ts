import { useRef, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import Sound from 'react-native-sound';

interface UseAudioOptions {
    src: string;
    soundEnabled?: boolean;
    volume?: number; // Between 0 and 1
}

function useSound(opts: UseAudioOptions) {
    if (Platform.OS === 'web') {
        // Web implementation
        return useWebSound(opts);
    } else {
        // React Native implementation
        return useNativeSound(opts);
    }
}

// Web implementation using HTMLAudioElement
function useWebSound(opts: UseAudioOptions) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            const audio = new Audio(opts.src);
            audio.volume = opts.volume ?? 1;
            audio.loop = false;
            audio.preload = 'auto';
            audioRef.current = audio;
        } else {
            audioRef.current.src = opts.src;
            audioRef.current.volume = opts.volume ?? 1;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = ''; // Clear the source
                audioRef.current = null;
            }
        };
    }, [opts.src, opts.volume]);

    const play = useCallback(() => {
        if (opts.soundEnabled ?? true) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
        }
    }, [opts.soundEnabled]);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const isPlaying = useCallback(() => {
        return audioRef.current ? !audioRef.current.paused : false;
    }, []);

    return {
        play,
        stop,
        pause,
        isPlaying,
        instance: audioRef.current,
    };
}

// Native implementation using react-native-sound
function useNativeSound(opts: UseAudioOptions) {
    const soundRef = useRef<Sound | null>(null);

    useEffect(() => {
        if (!opts.src) return;

        // Initialize sound
        const sound = new Sound(opts.src, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
                return;
            }
            // Set initial volume
            sound.setVolume(opts.volume ?? 1);
        });

        soundRef.current = sound;

        return () => {
            // Cleanup
            soundRef.current?.release();
            soundRef.current = null;
        };
    }, [opts.src]);

    useEffect(() => {
        // Adjust volume when `volume` changes
        if (soundRef.current) {
            soundRef.current.setVolume(opts.volume ?? 1);
        }
    }, [opts.volume]);

    const play = useCallback(() => {
        if (opts.soundEnabled ?? true) {
            soundRef.current?.stop(() => {
                soundRef.current?.play((success) => {
                    if (!success) {
                        console.error('Playback failed due to audio decoding errors');
                    }
                });
            });
        }
    }, [opts.soundEnabled]);

    const stop = useCallback(() => {
        soundRef.current?.stop();
    }, []);

    const pause = useCallback(() => {
        soundRef.current?.pause();
    }, []);

    const isPlaying = useCallback(() => {
        // Note: `react-native-sound` does not provide a direct way to check if it's playing.
        return false; // Manage state manually if needed
    }, []);

    return {
        play,
        stop,
        pause,
        isPlaying,
        instance: soundRef.current,
    };
}

export { useSound };
