import React from "react";

export default function EventList({ events, renderEvent, title, titleClassName }) {
  return (
    <div>
      {title && <h2 className={titleClassName}>{title}</h2>}
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-snap-x scroll-snap-mandatory px-2">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="w-64 flex-shrink-0 scroll-snap-start">
              {renderEvent(event)}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Ingen events fundet.</p>
        )}
      </div>
    </div>
  );
}
