// @deprecated
export interface PreludeData {
  initial_questions?: string[];
  organization_name?: string;
}

// @deprecated
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
