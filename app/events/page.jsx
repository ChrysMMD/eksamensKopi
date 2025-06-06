"use client";
import { useEffect, useState } from "react";
import useEventStore from "../stores/useEventStore";
import axios from "axios";
import getLedigePladser from "../lib/getLedigePladser";
import { useRouter } from "next/navigation";
import DiscoverEvents from "../components/DiscoverEvents";
import TrendingEvents from "../components/TrendingEvents";
import Button from "../components/Button";
import api from "../lib/api";

export default function EventPage() {
  const { events, setEvents } = useEventStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // hent events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("🚨 Kunne ikke hente events", err);
    } finally {
      setLoading(false);
    }
  };

  // booking
  const handleBooking = async (eventId) => {
    try {
      const res = await axios.put(
        `https://async-exhibit-server-1qfz.onrender.com/events/${eventId}/book`,
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
      <h1 className="font-h1 text-4xl mb-3">Kommende arrangementer</h1>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin h-10 w-10 border-4 border-[var(--color-lightgreen)] border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="min-h-[300px]">
            <TrendingEvents />
          </div>

          <div className="h-[2px] bg-[var(--color-orange)]/20 mb-4 mt-8"></div>

          <div className="min-h-[500px]">
            <DiscoverEvents />
          </div>
        </>
      )}
    </div>
  );
}