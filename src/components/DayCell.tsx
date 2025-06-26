// src/components/DayCell.tsx
import React from "react";

interface DayCellProps {
  date: Date | null;
  isToday: boolean;
  isSelected: boolean;
  hasMatchingEvents: boolean; // new
  onClick: () => void;
}

export function DayCell({
  date,
  isToday,
  isSelected,
  hasMatchingEvents,
  onClick,
}: DayCellProps) {
  if (!date) {
    // Empty cell placeholder
    return <div className="border border-gray-200 p-4 bg-gray-50"></div>;
  }

  return (
    <div
      className={`
        border border-gray-200 p-4 cursor-pointer transition-colors 
        ${
          isToday
            ? "bg-blue-200 hover:bg-blue-200"
            : "bg-white hover:bg-gray-100"
        }
        ${isSelected ? "ring-2 ring-blue-600" : ""}
        ${
          hasMatchingEvents ? "bg-yellow-100" : ""
        }  /* highlight if has events */ text-center
      `}
      onClick={onClick}
    >
      <span className="font-medium ">{date.getDate()}</span>
    </div>
  );
}
