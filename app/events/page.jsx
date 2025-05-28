"use client";
import { useEffect } from "react";
import useEventStore from "../stores/useEventStore";
import Button from "../components/Button";
import EventList from "../components/EventList";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // skift ved deploy
});

export default function EventPage() {
  const { events, setEvents } = useEventStore();


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("🚨 Kunne ikke hente events", err);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
    <h1 className="font-h1 text-4xl mb-3">Kommende arangementer</h1>
  
    <EventList
  events={events}
  className="flex gap-4"
  renderEvent={(event) => (
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
      <h3 className="text-lg font-bold text-purple-800">{event.title}</h3>
      </div>

      <p className="text-sm text-gray-600">
            📅 {event.date} • 🎫 {event.totalTickets} pladser
            {event.pris && <> • 💸 {event.pris} kr</>}
          </p>

    </div>
    </div>
  )}
/>
</div>

  );
}
