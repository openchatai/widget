export * from "./helpers";
export * from "./messages";
export * from "./options";
export * from "./translations";
export * from "./components";

interface DayOfficeHours {
    from: string;
    to: string;
}

export const workingDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "WeekDays",
    "Everyday",
] as const;

type Day = typeof workingDays[number];

export type WorkingHours = {
    [K in Day]: DayOfficeHours;
};

export type PreludeData = {
    initial_questions: string[];
    ai_enabled: boolean,
    office_hours: WorkingHours;
    office_hours_timezone: string;
};
