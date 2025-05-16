"use client";

import { useState } from "react";
import Button from "../components/Button";

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    antal: "",
    pris: "",
    time: "",
    category: "",
    image: null,
    isDraft: false,
  });

  const [events, setEvents] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value,
    }));
  };

  const handleAddEvent = () => {
    if (!formData.title) return;

    const newEvent = {
      id: Date.now(),
      ...formData,
    };

    setEvents((prev) => [newEvent, ...prev]);

    // nulstil form
    setFormData({
      title: "",
      description: "",
      antal: "",
      pris: "",
      time: "",
      category: "",
      image: null,
      isDraft: false,
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <div className="mb-6 space-y-2">
        <input
          className="border rounded p-2 w-full"
          name="title"
          placeholder="Event titel"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="border rounded p-2 w-full"
          name="description"
          placeholder="Event beskrivelse"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          className="border rounded p-2 w-full"
          name="antal"
          placeholder="Antal ledige pladser"
          value={formData.antal}
          onChange={handleChange}
        />
        <input
          type="number"
          className="border rounded p-2 w-full"
          name="pris"
          placeholder="Pris"
          value={formData.pris}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          className="border rounded p-2 w-full"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <select
          className="border rounded p-2 w-full"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Vælg kategori</option>
          <option value="musik">Musik</option>
          <option value="foredrag">Foredrag</option>
          <option value="workshop">Workshop</option>
        </select>
        <input
          type="file"
          name="image"
          className="w-full"
          onChange={handleChange}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isDraft"
            checked={formData.isDraft}
            onChange={handleChange}
          />
          Gem som kladde
        </label>
        <Button size="lg" onClick={handleAddEvent}>
          Tilføj event
        </Button>
      </div>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  {event.antal} pladser • {event.pris} kr • {event.time}
                </p>
                <p className="text-sm italic text-gray-500">
                  Kategori: {event.category} •{" "}
                  {event.isDraft ? "Kladde" : "Offentliggjort"}
                </p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Slet
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
