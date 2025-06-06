import SmkImage from "../components/SmkImage";
import getLedigePladser from "../lib/getLedigePladser";

export default function EventSidebar({ event }) {
  const ledigePladser = getLedigePladser(event);

  return (
    <aside className="w-full md:w-1/3 border border-[var(--color-sand)] p-4 bg-gray-50 rounded-lg shadow-sm">
      <h2>{event.title}</h2>
      <p className="text-sm text-gray-600 mb-1"> {event.date}</p>

      {event.location && (
        <p className="text-sm text-gray-600 mb-1">
          {event.location.name}, {event.location.address}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-1">
         {ledigePladser} / {event.totalTickets} ledige pladser
      </p>

      {event.artworkIds?.length > 0 && (
  <div className="mt-4 h-40 w-full rounded overflow-hidden">
    <SmkImage
      artworkId={event.artworkIds[0]}
      alt={`Artwork for ${event.title}`}
      width={400}
      height={160}
    />
  </div>
)}
    </aside>
  );
}
