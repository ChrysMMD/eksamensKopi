export default function DashboardCard({ event, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow-sm">
        {/* Indhold */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>{event.description}</p>

          <p className="text-sm text-gray-600">
            📅 {event.date} • 🎫 {event.totalTickets} pladser
            {event.price && <> • 💸 {event.price} kr</>}
          </p>

          <p className="text-sm italic text-gray-500">
            📍 Lokation: {event.location?.name || "Ukendt"}
          </p>

          {event.artworkIds?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {event.artworkIds.map((id, idx) => (
                <img
                  key={idx}
                  src={`https://iip-thumb.smk.dk/iiif/jp2/${id.toLowerCase()}.tif.jp2/full/!200,/0/default.jpg`}
                  alt={`Kunstværk ${id}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-end">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => onEdit(event)}
          >
            Rediger
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDelete(event.id)}
          >
            Slet
          </button>
        </div>
      </div>
    </div>
  );
}
