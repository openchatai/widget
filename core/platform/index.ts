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

export function createDefaultPlatform(): Platform {
    const detectPlatform = () => {
        // detect browser
        if (typeof window !== "undefined") {
            return "browser";
        }
        return "server";
    };

    return {
        env: {
            platform: detectPlatform()
        },
        date: {
            now: () => Date.now(),
            toISOString: (date: number) => new Date(date).toISOString()
        }
    };
}