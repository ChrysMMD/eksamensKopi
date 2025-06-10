export default function DashboardCard({ event, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {/* Indhold */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          {event.isDraft && (
            <span className="inline-block text-xs bg-yellow-400 text-black px-2 py-1 rounded font-semibold mb-2">
              Kladde
            </span>
          )}

          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>{event.description}</p>

          <p className="text-sm text-gray-600">
            {event.date} • {event.totalTickets} pladser
          </p>

          <p className="text-sm italic text-gray-500">
             Lokation: {event.location?.name || "Ukendt"}
          </p>

          {(event.artworkIds?.length > 0 || event.images?.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {event.artworkIds?.length > 0
                ? event.artworkIds.map((id, idx) => (
                    <img
                      key={idx}
                      src={`https://iip-thumb.smk.dk/iiif/jp2/${id.toLowerCase()}.tif.jp2/full/!200,/0/default.jpg`}
                      alt={`Kunstværk ${id}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))
                : event.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Thumbnail"
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
