"use client";
import { useEffect } from "react";
import useEventStore from "../stores/useEventStore";
import Button from "../components/Button";
import EventList from "../components/EventList";
import axios from "axios";
import getLedigePladser from "../utils/getLedigePladser";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: "http://localhost:8080", // skift ved deploy
});

export default function EventPage() {
  const { events, setEvents } = useEventStore();
  const router = useRouter();

  // hent events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("🚨 Kunne ikke hente events", err);
    }
  };

  // book events og genindlæs
  const handleBooking = async (eventId) => {
    try {
      const res = await axios.put(`http://localhost:8080/events/${eventId}/book`, 
  { tickets: 1 }, 
  { headers: { "Content-Type": "application/json" } }
);


      if (res.status === 200) {
        alert("Booking bekræftet!");
        fetchEvents();
      } else {
        alert("Noget gik galt – prøv igen.");
      }
    } catch (error) {
      console.error("Booking-fejl:", error);
      alert("Kunne ikke gennemføre booking.");
    }
  };

  //hent events ved load
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="font-h1 text-4xl mb-3">Kommende arangementer</h1>

      <EventList
        events={events}
        className="flex gap-4"
        renderEvent={(event) => {
          const ledigePladser = getLedigePladser(event);
           
          return(
          <div className="w-64">
            {event.artworkIds?.length > 0 && (
              <div>
                <img
                  src={`https://iip-thumb.smk.dk/iiif/jp2/${event.artworkIds[0].toLowerCase()}.tif.jp2/full/!400,/0/default.jpg`}
                  alt=""
                  className="w-full h-40 object-cover"
                />
              </div>
            )}

            {/* taget fra chatgbt */}
            <div className="p-2 flex flex-col justify-between h-[calc(100%-10rem)]">
              <div>
                <h3 className="text-lg font-bold text-purple-800">
                  {event.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                📅 {event.date} • 🎫 {ledigePladser}
                ledige pladser
                {event.pris && <> • 💸 {event.pris} kr</>}
              </p>
            </div>
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
          );
        }}
      />
    </div>
  );
}
