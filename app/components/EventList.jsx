import React from "react";

export default function EventList({ events, renderEvent, className = "space-y-4" }) {
  return (
    <div className={className}>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>{renderEvent(event)}</div>
        ))
      ) : (
        <p className="text-gray-500 italic">Ingen events fundet.</p>
      )}
    </div>
  );
}
