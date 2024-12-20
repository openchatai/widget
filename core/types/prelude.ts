export interface PreludeData {
    isInOfficeHours: boolean;
    isOutOfOfficeEnabled: boolean;
    outOfOfficeMessage?: string;
    welcomeMessage?: string;
}

export interface WorkingHours {
    timezone: string;
    weekdays: {
        [key: string]: {
            enabled: boolean;
            start: string;
            end: string;
        };
    };
} 