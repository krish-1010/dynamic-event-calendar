// src/App.tsx
import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CalendarEvent } from "./types";
import { useCalendar } from "./hooks/useCalendar";

import { CalendarGrid } from "./components/CalendarGrid";
import { EventForm } from "./components/EventForm";
import { EventList } from "./components/EventList";

function App() {
  const { currentDate, getCalendarDays, goToNextMonth, goToPrevMonth } =
    useCalendar();
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>(
    "calendar-events",
    []
  );

  // For controlling the "selected date" in the calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // For controlling the "Add/Edit" modal
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // 1) Global filter state
  const [filterKeyword, setFilterKeyword] = useState("");

  // Generate the calendar days for the current month
  const days = getCalendarDays();

  // A helper to format Date -> "YYYY-MM-DD"
  function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // 2) Compute a global 'filteredEvents' array: includes only events that match filter
  const filteredEvents = events.filter((ev) => {
    const kw = filterKeyword.toLowerCase();
    return (
      ev.name.toLowerCase().includes(kw) ||
      (ev.description ?? "").toLowerCase().includes(kw)
    );
  });

  // Overlap checks omitted
  function handleSaveEvent(eventData: Omit<CalendarEvent, "id">) {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...eventData } : ev
        )
      );
    } else {
      const newId = crypto.randomUUID();
      setEvents((prev) => [...prev, { id: newId, ...eventData }]);
    }
    setEditingEvent(null);
    setShowForm(false);
  }

  function handleDayClick(date: Date) {
    setSelectedDate(date);
  }

  function handleEditEvent(event: CalendarEvent) {
    setEditingEvent(event);
    setShowForm(true);
  }

  function handleDeleteEvent(id: string) {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  // 3) For the selected date, show only "filteredEvents"
  //    that match the selected date
  const eventsForSelectedDate = selectedDate
    ? filteredEvents.filter((ev) => ev.date === formatDate(selectedDate))
    : [];

  return (
    <div className="min-h-screen xl:max-w-[70%] ml-auto mr-auto bg-gray-50 p-4">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="px-3 py-1 bg-gray-200 rounded shadow-sm"
        >
          Previous
        </button>
        <h1 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h1>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 bg-gray-200 rounded shadow-sm"
        >
          Next
        </button>
      </header>

      {/* 4) Global filter text box */}
      <div className="mb-4">
        <label className="mr-2 text-sm font-medium">Global Filter:</label>
        <input
          type="text"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          placeholder="Type keyword..."
          className="border p-1 rounded text-sm"
        />
      </div>

      {/* CALENDAR GRID */}
      <CalendarGrid
        days={days}
        currentDate={currentDate}
        onDayClick={handleDayClick}
        // 5) Pass "filteredEvents" to highlight days that match the global filter
        filteredEvents={filteredEvents}
      />

      {/* SELECTED DATE DETAILS */}
      {selectedDate && (
        <div className="mt-4 p-2 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">
            Events on {selectedDate.toDateString()}
          </h2>

          {/* Display only the filtered events for this date */}
          <EventList
            events={eventsForSelectedDate}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />

          <button
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add Event
          </button>
        </div>
      )}

      {/* MODAL: Event Form */}
      {showForm && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg w-96">
            <div className="border-b p-2 font-bold text-lg">
              {editingEvent ? "Edit Event" : "New Event"}
            </div>
            <EventForm
              date={formatDate(selectedDate)}
              existingEvent={editingEvent || undefined}
              onSave={handleSaveEvent}
              onCancel={() => {
                setEditingEvent(null);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
