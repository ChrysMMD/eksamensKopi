"use client";
import { useEffect } from "react";
import useEventStore from "../stores/useEventStore";

export default function EventPage() {
  const { events, setEvents } = useEventStore();

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  const publicEvents = events.filter((e) => !e.isDraft);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Offentlige Events</h1>
      {publicEvents.length === 0 ? (
        <p>Ingen events er endnu offentliggjort.</p>
      ) : (
        publicEvents.map((event) => (
          <div key={event.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
             <p className="text-sm text-gray-600">
                  {event.antal} pladser • {event.pris} kr • {event.time}
                </p>
                <p className="text-sm italic text-gray-500">
                  Kategori: {event.category} •{" "}
                  {event.isDraft ? "Kladde" : "Offentliggjort"}
                </p>
                 {event.images && event.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {event.images.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Event billede ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
          </div>
        ))
      )}
    </div>
  );
}
