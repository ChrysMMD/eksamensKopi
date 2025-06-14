"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Crud from "../components/Crud";
import Button from "../components/Button";
import EventList from "../components/EventList";
import DashboardCard from "../components/DashboardCard";
import { useRouter } from "next/navigation";
import useLoadEvents from '../lib/useLoadEvents';
import useDeleteEvent from '../lib/useDeleteEvent';
import useEventStore from "../stores/useEventStore";

export default function DashboardPage() {
  useLoadEvents();
  const { user } = useUser();
  const router = useRouter();

  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents); 
  const deleteEvent = useDeleteEvent();

  // CRUD-form state
  const [showCrudForm, setShowCrudForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Opret
  const handleCreate = () => {
    setEditingEvent(null);
    setShowCrudForm(true);
  };

  // Rediger
  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowCrudForm(true);
  };

  // Annuller
  const handleCancel = () => {
    setShowCrudForm(false);
    setEditingEvent(null);
  };

  // Slet
  const handleDelete = async (id) => {
    if (confirm("Er du sikker på at du vil slette?")) {
      await deleteEvent(id);
    }
  };

  // Gem
  const handleSave = (savedEvent) => {
    handleCancel();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="mb-3">Velkommen {user?.firstName || "bruger"}</h1>

      <div className="flex flex-rows gap-10">
        <Button
          variant="secondary"
          className="mb-4"
          onClick={handleCreate}
        >
          Opret nyt event
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
          initialData={editingEvent}
          onSave={handleSave}
          onCancel={handleCancel}
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
                onDelete={() => handleDelete(event.id)}
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
                onDelete={() => handleDelete(event.id)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
