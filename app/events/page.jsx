"use client";
import { useEffect } from "react";
import useEventStore from "../stores/useEventStore";
import Button from "../components/Button";
import EventList from "../components/EventList";

export default function EventPage() {
  const { events, setEvents } = useEventStore();

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  const publicEvents = events.filter((e) => !e.isDraft);

  return (
    <div>
    <h1 className="font-h1 text-4xl mb-3">Kommende arangementer</h1>
    <EventList
  events={events}
  renderEvent={(event) => (
    <div className="bg-purple-100 rounded shadow w-full h-72 overflow-hidden">
       {event.images?.length > 0 && (
        <div>
           <img
          src={event.images[0]}
          alt=""
          className="w-full h-40 object-cover"
        />
        </div>
      )}

    {/* taget fra chatgbt */}
      <div className="p-2 flex flex-col justify-between h-[calc(100%-10rem)]">
        <div>
      <h3 className="text-lg font-bold text-purple-800">{event.title}</h3>
      <p>{event.category}</p>
      </div>

      <div>
        <p>Tidspunkt:{event.time}</p>
        <p>Pladser: {event.antal}</p>
    </div>

    </div>
    </div>
  )}
/>
</div>

  );
}
