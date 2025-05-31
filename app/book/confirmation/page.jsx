"use client";

import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function ConfirmationPage() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookingConfirmation");
    if (stored) {
      try {
        setBooking(JSON.parse(stored));
      } catch (err) {
        console.error("Kunne ikke parse booking:", err);
      }
    }
  }, []);

  if (!booking || !booking.event)  
    return <p className="p-4">Henter bookingdata...</p>;

  const { event, name, email, tickets } = booking;

    console.log("Event-data:", event);


  return (
    <div className="max-w-2xl mx-auto p-6 border border-[var(--color-sand)] p-4 bg-gray-50">
      <h1>Tak for din booking!</h1>

      <p className="mb-2">Du har nu reserveret <strong>{tickets}</strong> billet{tickets > 1 && "ter"} til:</p>

      <div className="border border-[var(--color-lightgreen)] p-4 rounded mb-4 bg-gray-50">
        <h2 className="text-lg mt-0 font-semibold">{event.title}</h2>
        <p className="text-[var(--color-sand)]"> {event.date}</p>
        {event.location && (
          <p className="text-[var(--color-sand)]">{event.location.name}, {event.location.address}</p>
        )}
      </div>

      <div className="border-t border-[var(--color-sand)] pt-4 mt-4 mb-8 text-sm text-gray-600">
        <p>Navn: <strong>{name}</strong></p>
        <p>Email: <strong>{email}</strong></p>
      </div>

      <Button
        onClick={() => window.location.href = "/events"}
        variant="secondary"
      >
        Tilbage til arrangementer
      </Button>
    </div>
  );
}
