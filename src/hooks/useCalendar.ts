// src/hooks/useCalendar.ts
import { useState } from "react";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Holds the current viewed month/year

  // Returns an array of dates for the month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calculate the first day of the month (0 = Sunday, 1 = Monday, ...)
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay(); // in many locales, 0 = Sunday

    // Number of days in this month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create an array for days
    const daysArray = [];

    // Fill in empty days before the first day
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    // Fill in days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  const goToPrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  return {
    currentDate,
    goToNextMonth,
    goToPrevMonth,
    getCalendarDays,
  };
}
