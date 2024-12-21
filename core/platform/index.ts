export interface Platform {
    storage?: Storage
    env: {
        platform: string;
    }
    date: {
        now(): number
        toISOString(date: number): string
    }
}

// Default platform implementation
export class DefaultPlatform implements Platform {
    env = {
        platform: this.detectPlatform()
    }

    date = {
        now: () => Date.now(),
        toISOString: (date: number) => new Date(date).toISOString()
    }

    private detectPlatform() {
        if (typeof window !== "undefined") {
            return "browser"
        }
        return "node"
    }
} 