export interface Platform {
    storage?: Storage
    env: {
        version: string
    }
    date: {
        now(): number
        toISOString(date: number): string
    }
}

// Default platform implementation
export class DefaultPlatform implements Platform {
    env = {
        version: process.env.npm_package_version || '1.0.0'
    }
    date = {
        now: () => Date.now(),
        toISOString: (date: number) => new Date(date).toISOString()
    }
} 