import { useRef, useEffect } from 'react';

interface UseAudioOptions {
    src: string;
    soundEnabled?: boolean;
    volume?: number;
}

function useSound(opts: UseAudioOptions) {
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

    return {
        play: () => {
            if (opts.soundEnabled ?? true) {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                }
            }
        },
        stop: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        },
        pause: () => {
            audioRef.current?.pause();
        },
        isPlaying: () => {
            return audioRef.current ? !audioRef.current.paused : false;
        },
        instance: audioRef.current,
    };
}

export { useSound };