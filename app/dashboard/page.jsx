"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Crud from "../components/Crud";
import Button from "../components/Button";
import EventList from "../components/EventList";
import api from "../lib/api/api";
import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [showCrudForm, setShowCrudForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
    console.log("🔍 Data der sendes til serveren:", eventToSend);

    try {
      let response;

      if (editingId) {
        response = await api.patch(`/events/${editingId}`, eventToSend);
        setEvents((prev) =>
          prev.map((event) => (event.id === editingId ? response.data : event))
        );
      } else {
        response = await api.post("/events", eventToSend);
        setEvents((prev) => [response.data, ...prev]);
      }

      setShowCrudForm(false);
      setEditingId(null);
    } catch (err) {
      console.error("Kunne ikke gemme event:", err);
      alert("Noget gik galt. Se konsollen.");
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
      <h1 className="text-3xl font-bold mb-6">
        Velkommen {user?.firstName || "bruger"}
      </h1>

      <Button onClick={() => setShowCrudForm(!showCrudForm)}>
        {showCrudForm ? "Luk formular" : "Opret nyt event"}
      </Button>

      {showCrudForm && (
        <Crud
          initialData={events.find((e) => e.id === editingId)}
          onSave={handleSave}
          onCancel={() => {
            setShowCrudForm(false);
            setEditingId(null);
          }}
        />
      )}

      <EventList
        events={events}
        title="Eventoversigt"
        titleClassName="text-2xl font-semibold mb-4"
        renderEvent={(event) => (
          <DashboardCard
            event={event}
            onEdit={() => handleEdit(event)}
            onDelete={handleDelete}
          />
        )}
      />
    </div>
  );
}
