"use client";
import { useState, useEffect } from "react";
import useEventStore from "../stores/useEventStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoadEvents from "../lib/useLoadEvents";
import DiscoverEvents from "../components/DiscoverEvents";
import TrendingEvents from "../components/TrendingEvents";

export default function EventPage() {
  const { events, setEvents } = useEventStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useLoadEvents();

  useEffect(() => {
    if (events.length > 0) {
      setLoading(false);
    }
  }, [events]);

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
