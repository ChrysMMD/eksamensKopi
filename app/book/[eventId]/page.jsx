"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useEventStore from "../../stores/useEventStore";
import EventSidebar from "../../components/EventSidebar";
import BookingForm from "../../components/BookingForm";
import axios from "axios";

export default function BookingPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const { events, updateEvent } = useEventStore();
  const event = events.find((e) => e.id === eventId);
  const [notFound, setNotFound] = useState(false);


   // Hent event
  useEffect(() => {
  const match = events.find((e) => e.id === eventId);
  if (!match && eventId) {
    axios.get(`http://localhost:8080/events/${eventId}`)
      .then((res) => {
        updateEvent(res.data); // 👈 det er nok!
      })
      .catch((err) => {
        console.error("Kunne ikke hente event:", err);
        setNotFound(true);
      });
  }
}, [eventId, events]);


const handleSubmit = async (formData) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/events/${eventId}/book`,
        { tickets: Number(formData.tickets) },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        updateEvent(res.data.event);
      const updatedEvent = {
        ...event,
        bookedTickets: res.data.event.bookedTickets
      };
      localStorage.setItem("bookingConfirmation", JSON.stringify({
        event: updatedEvent,
        name: formData.name,
        email: formData.email,
        tickets: formData.tickets
      }));
      router.push("/book/confirmation");
    }
    } catch (err) {
      console.error("Booking-fejl:", err);
      alert("Der skete en fejl under bookingen.");
    }
  };

  if (notFound) return <p>Event ikke fundet.</p>;
  if (!event) return <p>Henter event...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <EventSidebar event={event} />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-purple-800">Book billet</h1>
        <BookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}