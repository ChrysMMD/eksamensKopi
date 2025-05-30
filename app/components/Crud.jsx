"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import Galleri from "./Galleri";
import useImageStore from "../stores/useImageStore";
import axios from "axios";

export default function Crud({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalTickets: "",
    price: "",
    date: "",
    isDraft: false,
    locationId: "",
  });

  const [locations, setLocations] = useState([]);
  const selectedImages = useImageStore((state) => state.selectedImages);
  const [validDates, setValidDates] = useState([]);

  // Hent datoer
  useEffect(() => {
    axios
      .get("http://localhost:8080/dates")
      .then((res) => setValidDates(res.data))
      .catch((err) => console.error("Kunne ikke hente datoer:", err));
  }, []);

  // Hent lokationer
  useEffect(() => {
    axios
      .get("http://localhost:8080/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Kunne ikke hente lokationer", err));
  }, []);

  // Hvis redigering, udfyld felter
  useEffect(() => {
    if (initialData) {
      const { location, ...rest } = initialData;

      setFormData((prev) => ({
        ...prev,
        ...rest,
        totalTickets: rest.totalTickets?.toString() || "",
        price: rest.price?.toString() || "",
        date: rest.date || "",
        locationId: rest.locationId || "",
      }));
    }
  }, [initialData]);

  // Input ændringer
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Gem event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.locationId) return;

    const selectedLocation = locations.find(
      (loc) => loc.id === formData.locationId
    );
    const onlyDate = formData.date.split("T")[0];

    onSave({
      ...formData,
      date: onlyDate,
      totalTickets: Number(formData.totalTickets),
      price: Number(formData.price),
      artworkIds: selectedImages
        .map((url) => {
          const match = url.match(/_(kks[^.]+)\./i);
          return match ? match[1].toLowerCase() : null;
        })
        .filter(Boolean),
        images: selectedImages,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-6 rounded bg-gray-50 mb-8 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Rediger event" : "Opret nyt event"}
      </h2>

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
        name="totalTickets"
        placeholder="Antal ledige pladser"
        value={formData.totalTickets}
        onChange={handleChange}
      />
      <input
        type="number"
        className="border rounded p-2 w-full"
        name="price"
        placeholder="Pris"
        value={formData.price}
        onChange={handleChange}
      />
      <select
        className="border rounded p-2 w-full"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      >
        <option value="">Vælg dato</option>
        {validDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>

      <select
        className="border rounded p-2 w-full"
        name="locationId"
        value={formData.locationId}
        onChange={handleChange}
        required
      >
        <option value="">Vælg lokation</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name} – {loc.address} ({loc.maxGuests} pladser)
          </option>
        ))}
      </select>

      <Galleri />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDraft"
          checked={formData.isDraft}
          onChange={handleChange}
        />
        Gem som kladde
      </label>

      <div className="flex gap-4 mt-4">
        <Button type="submit" size="md" variant="secondary">
          {initialData ? "Gem ændringer" : "Opret event"}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 cursor-pointer hover:underline"
        >
          Annuller
        </button>
      </div>
    </form>
  );
}