import { useEffect, useRef } from "react";
import { useConfigData } from "./ConfigDataProvider";

interface useAudioOptions {
  src: string;
  soundEnabled: boolean;
  volume: number;
}

function useSound(opts: useAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio(opts.src);
      a.volume = opts.volume;
      a.loop = false;
      a.preload = "auto";
      audioRef.current = a;
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current?.remove();
    };
  }, [opts]);

  return {
    play: () => {
      if (opts.soundEnabled) {
        audioRef.current?.play();
      }
    },
    stop: () => {
      audioRef.current?.pause();
    },
  };
}

function useWidgetSoundEffects() {
  const { soundEffectFiles, widgetSettings, defaultSettings } = useConfigData();
  const soundEnabled =
    widgetSettings?.useSoundEffects ?? defaultSettings.useSoundEffects;
  const sfxVolume = 0.5;

  const messageArrivedSound = useSound({
    src: soundEffectFiles.messageArrived,
    soundEnabled,
    volume: sfxVolume,
  });

  return {
    messageArrivedSound,
  };
}

export { useWidgetSoundEffects };
