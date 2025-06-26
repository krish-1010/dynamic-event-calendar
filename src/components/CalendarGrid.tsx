// src/components/CalendarGrid.tsx
import React, { useState } from "react";
import { DayCell } from "./DayCell";
import { CalendarEvent } from "../types";

interface CalendarGridProps {
  days: Array<Date | null>;
  currentDate: Date;
  onDayClick: (day: Date) => void;
  filteredEvents: CalendarEvent[]; // new prop
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({
  days,
  currentDate,
  onDayClick,
  filteredEvents,
}: CalendarGridProps) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Helper function to format a date to "YYYY-MM-DD"
  function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return (
    <div>
      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {daysOfWeek.map((dayName) => (
          <div key={dayName} className="p-2">
            {dayName}
          </div>
        ))}
      </div>

      {/* Actual Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          // Handle empty slots
          if (!day) {
            return (
              <DayCell
                key={index}
                date={null}
                isToday={false}
                isSelected={false}
                onClick={() => {}}
                hasMatchingEvents={false}
              />
            );
          }

          // Does this day have any "filteredEvents"?
          const dayHasFilteredEvents = filteredEvents.some(
            (ev) => ev.date === formatDate(day)
          );

          // Determine if 'day' is "today"
          const today = new Date();
          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();

          // Determine if 'day' is "selected"
          const isSelected =
            !!selectedDay && day.toDateString() === selectedDay?.toDateString();

          return (
            <DayCell
              key={index}
              date={day}
              isToday={isToday}
              isSelected={isSelected}
              //highlight if that day has events matching the global filter
              hasMatchingEvents={dayHasFilteredEvents}
              onClick={() => {
                setSelectedDay(day);
                onDayClick(day);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
