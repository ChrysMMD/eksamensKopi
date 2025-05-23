"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import Galleri from "./Galleri";
import useImageStore from "../stores/useImageStore";

export default function Crud({ onSave, onCancel, initialData }) {
    //gem inputfelterne. 
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

   const selectedImages = useImageStore((state) => state.selectedImages);//state til valgte billeder


  //hvis initialData er med så skal formularen til redigering
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  //funktion til at opdatere formData hvis input ændres alt efter inputtyperne
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  //kaldes når knappen trykkes. Data videre til dashboardPage gennem onSave. Zustand?
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    onSave(formData); //giver data tilbage til DashboardPage
    //formularen nulstilles kun hvis vi opretter nyt
    if (!initialData) {
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
    }
  };

  return (
    /* inputfelter bundet til formData */
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

        <Button
    type="button"
    size="md"
    variant={formData.isDraft ? "default" : "outline"}
    onClick={() => handleChange({ target: { name: "isDraft", value: !formData.isDraft } })}
  >
    {formData.isDraft ? "Er kladde" : "Gem som kladde"}
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
