import React from "react";
import { CalendarEvent } from "../types";

interface EventListProps {
  events: CalendarEvent[];
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return <p className="p-2 text-gray-600">No events for this day.</p>;
  }

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="border border-gray-300 p-2 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold">{event.name}</p>
            <p className="text-sm text-gray-700">
              {event.startTime} - {event.endTime}
            </p>
            {event.description && (
              <p className="text-sm text-gray-600">{event.description}</p>
            )}
          </div>
          <div className="mt-2 sm:mt-0">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => onEdit(event)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
