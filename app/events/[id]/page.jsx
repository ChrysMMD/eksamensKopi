"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import getLedigePladser from '../../lib/getLedigePladser'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation'

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axios.get(`http://localhost:8080/events/${id}`)
        setEvent(res.data)
      } catch (err) {
        console.error('Fejl ved hentning af event:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) fetchEvent()
  }, [id])

  if (isLoading) return <p>Indlæser...</p>
  if (!event) return <p>Event ikke fundet</p>

  const ledigePladser = getLedigePladser(event)

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="font-h1 text-lg/10">{event.title}</h1>
      <p className="text-gray-600 mb-4 text-sm">
         {event.date} • {event.location?.name} •  {ledigePladser} ledige pladser
      </p>
      <p className="mb-6">{event.description}</p>

      {/* Værker fra SMK */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {event.artworkIds?.map((id) => (
          <img
            key={id}
            src={`https://iip-thumb.smk.dk/iiif/jp2/${id.toLowerCase()}.tif.jp2/full/!400,/0/default.jpg`}
            alt=""
            className="w-full h-48 object-cover"
          />
        ))}
      </section>

      {/* Booking-knap */}
      {ledigePladser > 0 ? (
        <Button variant="secondary" onClick={() => router.push(`/book/${event.id}`)}>
          Book billet
        </Button>
      ) : (
        <Button variant="secondary" disabled>
          Udsolgt
        </Button>
      )}
    </main>
  )
}