"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Galleri from "./Galleri";
import useImageStore from "../stores/useImageStore";
import axios from "axios";

export default function Crud({ onSave, onCancel, initialData, existingEvents }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({ mode: "onBlur" })

  const [locations, setLocations] = useState([]);
  const [validDates, setValidDates] = useState([]);
  const [conflictError, setConflictError] = useState("");
  const selectedImages = useImageStore((state) => state.selectedImages);
  const watchDate = watch("date");
  const watchLocationId = watch("locationId");

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
      Object.entries(rest).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

  // Konflikttjek automatisk
  useEffect(() => {
    const currentDate = watchDate;
    const currentLocation = watchLocationId;

    if (currentDate && currentLocation) {
      const conflict = existingEvents.find((e) => {
        return (
          String(e.locationId) === String(currentLocation) &&
          e.date === currentDate &&
          e.id !== initialData?.id
        );
      });

      setConflictError(conflict ? "⚠️ Dato og lokation er allerede optaget." : "");
    }
  }, [watchDate, watchLocationId, existingEvents, initialData]);

  // OnSubmit
  const onSubmit = (data, isDraft = false) => {
    if (conflictError) return;

    const selectedLocation = locations.find(
      (loc) => String(loc.id) === String(data.locationId)
    );

    const newEvent = {
      ...data,
      isDraft,
      date: data.date.split("T")[0],
      totalTickets: Number(data.totalTickets || 0),
      price: Number(data.price || 0),
      artworkIds: selectedImages
        .map((url) => {
          const match = url.match(/_(kks[^.]+)\./i);
          return match ? match[1].toLowerCase() : null;
        })
        .filter(Boolean),
      images: selectedImages,
    };

    onSave(newEvent);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, false))}
      className="border rounded border-[var(--color-lightgreen)] p-6 bg-gray-50 mb-8 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Rediger event" : "Opret nyt event"}
      </h2>

      <input
        className="border rounded p-2 w-full"
        placeholder="Event titel"
        {...register("title", { required: "Titel er påkrævet" })}
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      <textarea
        className="border rounded p-2 w-full"
        placeholder="Event beskrivelse"
        {...register("description", { required: "Beskrivelse er påkrævet" })}
      />
      {errors.description && <p className="text-red-600">{errors.description.message}</p>}

      <input
        type="number"
        className="border rounded p-2 w-full"
        placeholder="Antal billetter"
        {...register("totalTickets")}
      />

      <select
        className="border rounded p-2 w-full"
        {...register("date", { required: "Dato er påkrævet" })}
      >
        <option value="">Vælg dato</option>
        {validDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      {errors.date && <p className="text-red-600">{errors.date.message}</p>}

      <select
        className="border rounded p-2 w-full"
        {...register("locationId", { required: "Lokation er påkrævet" })}
      >
        <option value="">Vælg lokation</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name} – {loc.address} ({loc.maxGuests} pladser)
          </option>
        ))}
      </select>
      {errors.locationId && <p className="text-red-600">{errors.locationId.message}</p>}

      {conflictError && <p className="text-red-600">{conflictError}</p>}

      <Galleri />

      <div className="flex gap-4 mt-4">
        <Button 
        type="submit"
        variant="secondary"
        >Opret event
        </Button>

        <Button
          type="button"
          variant="secondary"
          disabled={!isValid || isSubmitting} 
          onClick={handleSubmit((data) => onSubmit(data, true))}
        >
          Gem som kladde
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
