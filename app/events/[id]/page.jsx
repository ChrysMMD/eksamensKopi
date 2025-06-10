"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import getLedigePladser from "../../lib/getLedigePladser";
import Button from "../../components/Button";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axios.get(`https://async-exhibit-server-1qfz.onrender.com/events/${id}`);
        const eventData = res.data;

        // Hent detaljer for hvert SMK-værk
        const artworkPromises = eventData.artworkIds?.map(async (artId) => {
          const resArt = await axios.get(
            `https://api.smk.dk/api/v1/art?object_number=${artId}`
          );
          return resArt.data.items?.[0];
        });

        const artworks = await Promise.all(artworkPromises);
        eventData.artworks = artworks.filter(Boolean);
        setEvent(eventData);
      } catch (err) {
        console.error("Fejl ved hentning af event:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id]);

  if (isLoading) return <p>Indlæser...</p>;
  if (!event) return <p>Event ikke fundet</p>;

  const ledigePladser = getLedigePladser(event);

  return (
    <div className="p-6 max-w-3xl mx-auto border border-[var(--color-orange)]">
      {/* Tilbage-knap */}
      <Link
        href="/events"
        className="border-none text-[var(--color-lightgreen)] hover:text-[var(--color-darkgreen)] "
      >
        ← Tilbage
      </Link>

      <h1 className="font-h1 mt-2 text-lg/10">{event.title}</h1>
      <p className="text-gray-600 mb-4 text-sm">
        {event.date} • {event.location?.name} • {ledigePladser} ledige pladser
      </p>
      <p className="mb-6">{event.description}</p>

      {/* Værker fra SMK */}
      {event.artworks?.length > 0 && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {event.artworks.map((artwork) => {
            const thumb =
              artwork.image_thumbnail ||
              (artwork.image_iiif_id
                ? `${artwork.image_iiif_id}/full/!400,/0/default.jpg`
                : null);
            const title = artwork.titles?.[0]?.title || "Værk";

            return (
              <Link href={`/art/${artwork.object_number}`} key={artwork.object_number}>
                {thumb ? (
                  <img
                    src={thumb}
                    alt={title}
                    className="w-full h-48 object-cover hover:opacity-80 transition rounded"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center rounded shadow">
                    <span className="text-xs text-gray-500 text-center px-2">
                      Intet billede
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </section>
      )}

      {/* Booking-knap */}
      {ledigePladser > 0 ? (
        <Button
          variant="secondary"
          onClick={() => router.push(`/book/${event.id}`)}
        >
          Book billet
        </Button>
      ) : (
        <Button variant="secondary" disabled>
          Udsolgt
        </Button>
      )}

    </div>
  );
}
