import { useConfigData } from ".";
import useSound from 'use-sound';


function useWidgetSoundEffects() {
    const { soundEffectFiles, widgetSettings, defaultSettings } = useConfigData();
    const soundEnabled = widgetSettings?.useSoundEffects ?? defaultSettings.useSoundEffects
    const sfxVolume = 0.5;
    
    const messageArrivedSound = useSound(soundEffectFiles.messageArrived, { soundEnabled, volume: sfxVolume });

    return {
        messageArrivedSound,
    }
}

export {
    useWidgetSoundEffects
}
