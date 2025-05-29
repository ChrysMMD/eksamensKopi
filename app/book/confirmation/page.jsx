"use client";

import { useEffect, useState } from "react";

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Tak for din booking!</h1>

      <p className="mb-2">🎉 Du har nu reserveret <strong>{tickets}</strong> billet{tickets > 1 && "ter"} til:</p>

      <div className="border p-4 rounded mb-4 bg-gray-50">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p>📅 {event.date}</p>
        {event.location && (
          <p>📍 {event.location.name}, {event.location.address}</p>
        )}
      </div>

      <div className="border-t pt-4 mt-4 text-sm text-gray-600">
        <p>Navn: <strong>{name}</strong></p>
        <p>Email: <strong>{email}</strong></p>
      </div>

      <button
        onClick={() => window.location.href = "/events"}
        className="mt-6 bg-purple-700 text-white px-4 py-2 rounded"
      >
        Tilbage til arrangementer
      </button>
    </div>
  );
}
