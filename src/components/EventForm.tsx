import React, { useState, useEffect } from "react";
import { CalendarEvent } from "../types";

interface EventFormProps {
  date: string; // YYYY-MM-DD
  existingEvent?: CalendarEvent;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onCancel: () => void;
}

export function EventForm({
  date,
  existingEvent,
  onSave,
  onCancel,
}: EventFormProps) {
  const [name, setName] = useState(existingEvent?.name || "");
  const [startTime, setStartTime] = useState(
    existingEvent?.startTime || "09:00"
  );
  const [endTime, setEndTime] = useState(existingEvent?.endTime || "10:00");
  const [description, setDescription] = useState(
    existingEvent?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, startTime, endTime, description, date });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-2">
      <label className="font-medium">Event Name:</label>
      <input
        className="border p-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="font-medium">Start Time:</label>
      <input
        className="border p-1"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <label className="font-medium">End Time:</label>
      <input
        className="border p-1"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />

      <label className="font-medium">Description:</label>
      <textarea
        className="border p-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
