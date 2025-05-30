"use client";

import { useForm } from "react-hook-form";

export default function BookingForm({ onSubmit }) {
  //chatgbt
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      {/* Navn */}
      <div>
        <label className="block font-semibold">Navn</label>
        <input
          type="text"
          {...register("name", { required: "Navn er påkrævet" })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email er påkrævet",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ugyldig email-adresse",
            },
          })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Antal billetter */}
      <div>
        <label className="block font-semibold">Antal billetter</label>
        <input
          type="number"
          {...register("tickets", {
            required: "Antal billetter er påkrævet",
            min: { value: 1, message: "Du skal vælge mindst 1 billet" },
          })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.tickets && (
          <p className="text-red-600 text-sm mt-1">{errors.tickets.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Bekræft booking
      </button>
    </form>
  );
}
