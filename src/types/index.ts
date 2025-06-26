// src/types/index.ts
export interface CalendarEvent {
  id: string;
  name: string;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  description?: string;
  date: string; // "YYYY-MM-DD"
  category?: string; // for optional color-coding
}
