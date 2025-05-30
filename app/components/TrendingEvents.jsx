'use client'
import useEventStore from '../stores/useEventStore';
import EventCard from './EventCard'

export default function TrendingEvents() {
  const events = useEventStore((state) => state.events)
  const trending = [...events]
  //chatgbt
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 6)

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">🔥 Mest Trending</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trending.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
