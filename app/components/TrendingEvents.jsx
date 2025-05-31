"use client";
import useEventStore from "../stores/useEventStore";
import EventCard from "./EventCard";

export default function TrendingEvents() {
  const events = useEventStore((state) => state.events);
  const trending = [...events]
    //chatgbt
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 6);

  return (
    <section>
      <h2>Mest Trending</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {trending.map((event) => (
          <div className="min-w-[250px] flex-shrink-0" key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </section>
  );
}
