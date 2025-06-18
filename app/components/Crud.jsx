"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Galleri from "./Galleri";
import useImageStore from "../stores/useImageStore";
import useLocations from "../lib/useLocation";
import useDates from "../lib/useDates";
import useCreateEvent from '../lib/useCreateEvent';
import useUpdateEvent from '../lib/useUpdateEvent';

export default function Crud({ onSave, onCancel, initialData, existingEvents }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({ mode: "onBlur" });

  const { locations, loading: loadingLocations, error: locationsError } = useLocations();
  const { dates: validDates, loading: loadingDates, error: datesError } = useDates();

  const selectedImages = useImageStore((state) => state.selectedImages);
  const watchDate = watch("date");
  const watchLocationId = watch("locationId");

    // Vælg create eller update baseret på initialData
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  // Hvis redigering, udfyld felter fra initial data
  useEffect(() => {
    if (initialData) {
      const { location, ...rest } = initialData;
      Object.entries(rest).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

// Konflikt-tjek
  const [conflictError, setConflictError] = useState("");
  useEffect(() => {
    if (watchDate && watchLocationId) {
      const conflict = existingEvents.find((e) => {
        return (
          e.date === watchDate &&
          e.locationId === watchLocationId &&
          (!initialData || e.id !== initialData.id)
        );
      });
      setConflictError(
        conflict
          ? "Der findes allerede et event med denne dato og lokation."
          : ""
      );
    } else {
      setConflictError("");
    }
  }, [watchDate, watchLocationId, existingEvents, initialData]);

  // Gem valgte billeder til form state
  useEffect(() => {
    setValue("images", selectedImages);
  }, [selectedImages, setValue]);

  const onSubmit = async (data) => {
    console.log("Alle locations:", locations);

    if (conflictError) return;
    try {
      if (initialData){
        await updateEvent({
           ...initialData,
          ...data,
          locationId: data.locationId,
          artworkIds: selectedImages,
        });
      } else {
      await createEvent({
        ...data,
        locationId: data.locationId,
        artworkIds: selectedImages,
      });
    }
    onCancel();
    } catch (err) {
      alert("Fejl ved gemning af event!");
    }
  };


  return (
    <form
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div> 
        <label htmlFor="title" className="font-semibold">
          Titel:
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Titel er påkrævet" })}
          className="input"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
     
      <div>
        <label htmlFor="description" className="font-semibold">
          Beskrivelse:
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Beskrivelse er påkrævet" })}
          className="input"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="date" className="font-semibold">
          Dato:
        </label>
        <select
          id="date"
          {...register("date", { required: "Vælg en dato" })}
          className="input"
          defaultValue=""
          disabled={loadingDates}
        >
          <option value="" disabled>
            {loadingDates ? "Indlæser..." : "Vælg dato"}
          </option>
          {validDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
        {datesError && <span className="text-red-500">Fejl: Kan ikke hente datoer.</span>}
      </div>
      <div>
        <label htmlFor="locationId" className="font-semibold">
          Lokation:
        </label>
        <select
          id="locationId"
          {...register("locationId", { required: "Vælg en lokation" })}
          className="input"
          defaultValue=""
          disabled={loadingLocations}
        >
          <option value="" disabled>
            {loadingLocations ? "Indlæser..." : "Vælg lokation"}
          </option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        {errors.locationId && (
          <span className="text-red-500">{errors.locationId.message}</span>
        )}
        {locationsError && <span className="text-red-500">Fejl: Kan ikke hente lokationer.</span>}
      </div>
      <div>
        <label className="font-semibold">Galleri:</label>
        <Galleri />
      </div>
      {conflictError && (
        <div className="text-red-500 font-bold">{conflictError}</div>
      )}
      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting || !!conflictError}
        >
          Gem
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Annuller
        </Button>
      </div>
    </form>
  );
}
