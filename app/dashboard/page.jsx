"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Crud from "../components/Crud";
import Button from "../components/Button";
import EventList from "../components/EventList";
import api from "../lib/api";
import DashboardCard from "../components/DashboardCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  const [showCrudForm, setShowCrudForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const router = useRouter();

  //hentning af locations fra backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations");
        setLocations(res.data);
      } catch (err) {
        console.error("Kunne ikke hente lokationer:", err);
      }
    };

    fetchLocations();
  }, []);

  //hentning af events fra backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Kunne ikke hente events:", err);
      }
    };

    fetchEvents();
  }, []);

  //redigering
  const handleEdit = (event) => {
    setEditingId(event.id);
    setShowCrudForm(true);
  };

  //gem
  const handleSave = async (formData) => {
    const eventToSend = {
      ...formData,
      curator: user?.firstName || "Ukendt",
    };
    console.log("📦 Klar til at sende:", eventToSend);

    const conflict = events.find((e) => {
      const sameLocation = String(e.locationId) === String(formData.locationId);
      const sameDate = e.date === formData.date;
      const notSameEvent = e.id !== editingId;

      return sameLocation && sameDate && notSameEvent;
    });

    if (conflict) {
      alert("Der findes allerede et event med denne lokation og dato.");
      return;
    }

    try {
      let response;

      if (editingId) {
        response = await api.patch(`/events/${editingId}`, eventToSend);

        // Find tilhørende lokation
        const locationObj = locations.find(
          (loc) => String(loc.id) === String(response.data.locationId)
        );

        setEvents((prev) =>
          prev.map((event) =>
            event.id === editingId
              ? { ...response.data, location: locationObj || null }
              : event
          )
        );
      } else {
        console.log("📦 Klar til at sende:", eventToSend);

        response = await api.post("/events", eventToSend);
        console.log("✅ Serverens svar:", response);
        console.log("🧪 Inkluderer svar isDraft?", response.data.isDraft);

        // Find tilhørende lokation
        const locationObj = locations.find(
          (loc) => String(loc.id) === String(response.data.locationId)
        );

        setEvents((prev) => [
          { ...response.data, location: locationObj || null },
          ...prev,
        ]);
      }

      setShowCrudForm(false);
      setEditingId(null);
    } catch (err) {
      if (err.response) {
        console.error("🧨 Fejl-svar fra backend:", err.response.data);
      } else {
        console.error("🧨 Ingen svar, fejl i request:", err.message);
      }
    }
  };

  //sletning
  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Fejl ved sletning:", err);
      alert("Noget gik galt ved sletning. Se konsollen.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="mb-3">Velkommen {user?.firstName || "bruger"}</h1>

      <div className="flex flex-rows gap-10">

        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => setShowCrudForm(!showCrudForm)}
        >
          {showCrudForm ? "Luk formular" : "Opret nyt event"}
        </Button>

         <Button
          variant="secondary"
          className="mb-4"
          onClick={() => router.push('/events')}
        >
          Til offentlig liste
        </Button>
      </div>

      {showCrudForm && (
        <Crud
          existingEvents={events}
          initialData={events.find((e) => e.id === editingId)}
          onSave={handleSave}
          onCancel={() => {
            setShowCrudForm(false);
            setEditingId(null);
          }}
        />
      )}

      <div className="space-y-10">
        <div>
          <h2>Offentlige events</h2>
          <EventList
            events={events.filter((e) => !e.isDraft)}
            renderEvent={(event) => (
              <DashboardCard
                event={event}
                onEdit={() => handleEdit(event)}
                onDelete={handleDelete}
              />
            )}
          />
        </div>

        <div>
          <h2>Kladder</h2>
          <EventList
            events={events.filter((e) => e.isDraft)}
            renderEvent={(event) => (
              <DashboardCard
                event={event}
                onEdit={() => handleEdit(event)}
                onDelete={handleDelete}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
