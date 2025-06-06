"use client";
import getLedigePladser from "../lib/getLedigePladser";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SmkImage from "../components/SmkImage";

export default function EventCard({ event }) {
  const router = useRouter();
  const ledigePladser = getLedigePladser(event);

  return (
    <div className="w-64 flex-shrink-0">
      <Link
        href={`/events/${event.id}`}
        className="group relative block rounded overflow-hidden"
      >
        {/*  Overlay */}
        <div className="absolute inset-0 bg-[var(--color-lightgreen)] opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none z-10" />

        {/* Pil-ikon */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300 z-30 text-[var(--color-darkgreen)]">
          <span className="text-2xl">→</span>
        </div>

        {/* Billede */}
        {event.artworkIds?.length > 0 && (
          <SmkImage
            artworkId={event.artworkIds[0]}
            alt={`Artwork for ${event.title}`}
            width={400}
            height={160}
            className="group-hover:scale-105 transition-transform duration-200"
          />
        )}

        {/* Tekst */}
        <div className="p-2 relative z-20">
          <h3 className="text-lg font-bold text-green-950 group-hover:underline">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600">
            {event.date} • {ledigePladser} ledige pladser
          </p>
        </div>
      </Link>

      {/* Book-knap */}
      <div className="p-2">
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
  );
}
