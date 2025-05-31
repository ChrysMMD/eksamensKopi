'use client'
import getLedigePladser from '../lib/getLedigePladser';
import Button from './Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function EventCard({ event }) {
  const router = useRouter()
  const ledigePladser = getLedigePladser(event)

  return (
    <Link href={`/events/${event.id}`}>
      <div className="w-64 flex-shrink-0">
        {event.artworkIds?.length > 0 && (
          <img
            src={`https://iip-thumb.smk.dk/iiif/jp2/${event.artworkIds[0].toLowerCase()}.tif.jp2/full/!400,/0/default.jpg`}
            alt=""
            className="w-full h-40 object-cover"
          />
        )}

        <div className="p-2 flex flex-col justify-between h-[calc(100%-10rem)]">
          <div>
            <h3 className="text-lg font-bold text-green-950">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {event.date} • {ledigePladser} ledige pladser
            </p>
          </div>

          <div className="mt-2">
            {ledigePladser > 0 ? (
              <Button
                variant="secondary"
                onClick={() => router.push(`/book/${event.id}`)}
              >
                Book
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Udsolgt
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
