import './App.css'
import { WidgetRoot, type WidgetOptions } from "@openchatai/widget";
import { Widget } from "@openchatai/widget/basic";
import "@openchatai/widget/dist/style.css";
import { Pane } from "tweakpane";
import { useEffect, useState } from 'react';

const pane = new Pane({
  title: 'Widget Options',
  expanded: true,
});

function App() {
  const [options, setOptions] = useState<WidgetOptions>({
    token: '',
    initialMessages: [],
    apiUrl: '',
    socketUrl: '',
    debug: false,
    language: 'en',
    user: {
      name: '',
      email: '',
      phone: '',
      customData: {},
      avatarUrl: '',
    },
    bot: {
      name: '',
      avatarUrl: '',
    },
    theme: {
      primaryColor: 'hsl(211,65%,59%)',
      triggerOffset: '20px',
    },
    settings: {
      persistSession: false,
      useSoundEffects: false,
    },
    collectUserData: false,
    soundEffectFiles: {
      messageArrived: '',
    },
  });

  useEffect(() => {
    const opts = { ...options };
    pane.addBinding(opts, 'token');
    pane.addBinding(opts, 'initialMessages', {
      view: 'textarea',
      multiline: true,
    });
    pane.addBinding(opts, 'apiUrl');
    pane.addBinding(opts, 'socketUrl');
    pane.addBinding(opts, 'debug');
    pane.addBinding(opts, 'language');
    
    const userFolder = pane.addFolder({ title: 'User' });
    if (opts.user) {
      userFolder.addBinding(opts.user, 'name');
      userFolder.addBinding(opts.user, 'email');
      userFolder.addBinding(opts.user, 'phone');
      userFolder.addBinding(opts.user, 'avatarUrl');
    }
    
    const botFolder = pane.addFolder({ title: 'Bot' });
    if (opts.bot) {
      botFolder.addBinding(opts.bot, 'name');
      botFolder.addBinding(opts.bot, 'avatarUrl');
    }
    
    const themeFolder = pane.addFolder({ title: 'Theme' });
    themeFolder.addBinding(opts.theme, 'primaryColor');
    themeFolder.addBinding(opts.theme, 'triggerOffset');
    
    const settingsFolder = pane.addFolder({ title: 'Settings' });
    settingsFolder.addBinding(opts.settings, 'persistSession');
    settingsFolder.addBinding(opts.settings, 'useSoundEffects');
    
    pane.addBinding(opts, 'collectUserData');
    
    const soundEffectFilesFolder = pane.addFolder({ title: 'Sound Effects' });
    soundEffectFilesFolder.addBinding(opts.soundEffectFiles, 'messageArrived');
    
    pane.on('change', (ev) => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        ...opts,
      }));
    });
    
    return () => {
      pane.dispose();
    };
  }, [options]);

  return (
    <div>
      <WidgetRoot options={options}>
        <Widget style={{ height: '500px', width: '400px' }} />
      </WidgetRoot>
    </div>
  );
}

export default App;
