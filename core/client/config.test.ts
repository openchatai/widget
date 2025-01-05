import { describe, it, expect } from 'vitest';
import { createConfig } from './config';

describe('createConfig', () => {
    it('should create config with default values', () => {
        const config = createConfig({
            token: 'test-token'
        });

        expect(config.getConfig()).toMatchObject({
            token: 'test-token',
            apiUrl: 'https://api-v2.opencopilot.so/backend',
            socketUrl: 'https://api-v2.opencopilot.so',
            transport: 'socket',
            pollingInterval: 3000,
            headers: {
                'X-Bot-Token': 'test-token'
            },
            queryParams: {},
            pathParams: {},
            bot: {
                name: 'Bot',
                avatarUrl: undefined,
                id: null,
                is_ai: true
            },
            debug: false,
            language: 'en',
            user: {},
            soundEffectFiles: {
                messageArrived: 'https://cloud.opencopilot.so/sfx/notification3.mp3'
            },
            theme: {
                headerStyle: 'basic',
                primaryColor: 'hsl(211,65%,59%)',
                triggerOffset: '20px'
            },
            settings: {
                persistSession: false,
                useSoundEffects: false
            }
        });
    });

    it('should override default values with provided options', () => {
        const config = createConfig({
            token: 'test-token',
            apiUrl: 'https://custom-api.example.com',
            transport: 'http',
            headers: {
                'Custom-Header': 'value'
            },
            bot: {
                name: 'Custom Bot',
                is_ai: false
            },
            theme: {
                headerStyle: 'compact',
                primaryColor: '#ff0000'
            },
            settings: {
                persistSession: true
            }
        });

        expect(config.getConfig()).toMatchObject({
            apiUrl: 'https://custom-api.example.com',
            transport: 'http',
            headers: {
                'Custom-Header': 'value',
                'X-Bot-Token': 'test-token'
            },
            bot: {
                name: 'Custom Bot',
                avatarUrl: undefined,
                id: null,
                is_ai: false
            },
            theme: {
                headerStyle: 'compact',
                primaryColor: '#ff0000',
                triggerOffset: '20px'
            },
            settings: {
                persistSession: true,
                useSoundEffects: false
            }
        });
    });

    it('should provide access to specific config sections', () => {
        const config = createConfig({
            token: 'test-token',
            bot: {
                name: 'Custom Bot'
            },
            theme: {
                primaryColor: '#ff0000'
            }
        });

        expect(config.getApiConfig()).toEqual({
            apiUrl: 'https://api-v2.opencopilot.so/backend',
            token: 'test-token',
            headers: {
                'X-Bot-Token': 'test-token'
            },
            queryParams: {},
            pathParams: {}
        });

        expect(config.getBotConfig()).toEqual({
            name: 'Custom Bot',
            avatarUrl: undefined,
            id: null,
            is_ai: true
        });

        expect(config.getThemeConfig()).toEqual({
            headerStyle: 'basic',
            primaryColor: '#ff0000',
            triggerOffset: '20px'
        });

        expect(config.getSettings()).toEqual({
            persistSession: false,
            useSoundEffects: false
        });
    });
}); 