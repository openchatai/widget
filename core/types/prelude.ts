export interface PreludeData {
  initial_questions?: string[];
  organization_name?: string;
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
