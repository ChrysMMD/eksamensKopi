"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Crud from "../components/Crud";
import Button from "../components/Button";
import Galleri from "../components/Galleri";
import useImageStore from "../stores/useImageStore";

export default function DashboardPage() {
  const { user } = useUser(); //info om bruger
  const [events, setEvents] = useState([]); //liste med events
  const [editingId, setEditingId] = useState(null); //gem id hvis ændring
  const [showCrudForm, setShowCrudForm] = useState(false); //vise formular eller ej

  //tjek om der er gemt events i localstorage - hvis ja så hent
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  //kør når event ændres. Gemmer opdateret liste i localstorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  //slet event med det id, som der trykkes på
  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  //rediger event med det id, som der trykkes på
  const handleEdit = (event) => {
    setEditingId(event.id);
    setShowCrudForm(true);
  };

  //opret nyt event med nyt id
  const handleCreateNew = () => {
    setEditingId(null);
    setShowCrudForm(true);
  };

  //opdater eksisterende eller opret nyt event
const selectedImages = useImageStore((state) => state.selectedImages);
const clearImages = useImageStore((state) => state.clearImages);

const handleSave = (newEvent) => {
  const fullEvent = { ...newEvent, images: selectedImages };

  if (editingId) {
    setEvents((prev) =>
      prev.map((e) => (e.id === editingId ? { ...e, ...fullEvent } : e))
    );
  } else {
    setEvents((prev) => [
      { id: Date.now(), ...fullEvent },
      ...prev,
    ]);
  }

  setShowCrudForm(false);
  clearImages(); // nulstil billeder
};


  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-bold mb-10 mt-10 font-h1">
        Velkommen {user?.firstName || "bruger"}
      </h1>

      <div className="flex justify-between mb-6">
        <Button
          onClick={handleCreateNew}
          type="submit"
          variant="secondary"
          size="md"
        >
          Opret nyt event
        </Button>
      </div>

      {showCrudForm && (
        <>
          <Crud
            onSave={handleSave}
            onCancel={() => setShowCrudForm(false)}
            initialData={
              editingId ? events.find((e) => e.id === editingId) : null
            }
          />
        </>
      )}

      <h2 className="text-2xl self-start font-semibold mb-4">Eventoversigt</h2>

      <ul className="space-y-4">
        {/* genneløber evens og viser titel, osv. */}
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  {event.antal} pladser • {event.pris} kr • {event.time}
                </p>
                <p className="text-sm italic text-gray-500">
                  Kategori: {event.category} •{" "}
                  {event.isDraft ? "Kladde" : "Offentliggjort"}
                </p>
                {event.images && event.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {event.images.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Event billede ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(event)}
                >
                  Rediger
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(event.id)}
                >
                  Slet
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
