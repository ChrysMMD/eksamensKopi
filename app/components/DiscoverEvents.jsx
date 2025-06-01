'use client'
import { useState } from 'react'
import { format, addMonths } from 'date-fns'
import useEventStore from '../stores/useEventStore'
import EventCard from './EventCard'
import Button from './Button'

export default function DiscoverEvents() {
  const events = useEventStore((state) => state.events)
  const [selectedMonth, setSelectedMonth] = useState('')

  //Generer næste 4 mdr
  const months = Array.from({ length: 4 }).map((_, i) =>
    format(addMonths(new Date(), i), 'MMMM yyyy')
  )

  const visibleEvents = selectedMonth
    ? events.filter(
        (event) =>
          format(new Date(event.date), 'MMMM yyyy') === selectedMonth
      )
    : events

  return (
    <section className="mb-8">
      <h2 className='text-[var(--color-lightgreen)]'>Discover</h2>

      <div className="flex gap-2 mb-4">
        {months.map((month) => (
          <Button
            key={month}
            onClick={() => setSelectedMonth(month === selectedMonth ? '' : month)}
            variant={selectedMonth === month ? 'selected' : 'unselected'}
          >
            {month}
          </Button>
        ))}
      </div>

      {visibleEvents.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ingen events fundet for den valgte måned.</p>
      )}
    </section>
  )
}
