"use client";

import { useForm } from "react-hook-form";
import Button from "./Button";
import {useRouter} from "next/navigation"

export default function BookingForm({ onSubmit }) {
  //chatgbt
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

   const router = useRouter();

  const handleCancel = () => {
    router.back();
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-gray-50 p-4 rounded shadow"
    >
      {/* Navn */}
      <div>
        <label>Navn</label>
        <input
          type="text"
          {...register("name", { required: "Navn er påkrævet" })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email er påkrævet",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ugyldig email-adresse",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Antal billetter */}
      <div>
        <label>Antal billetter</label>
        <input
          type="number"
          {...register("tickets", {
            required: "Antal billetter er påkrævet",
            min: { value: 1, message: "Du skal vælge mindst 1 billet" },
          })}
        />
        {errors.tickets && (
          <p className="text-red-600 text-sm mt-1">{errors.tickets.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="secondary" disabled={!isValid || isSubmitting}>
          Bekræft booking
        </Button>

        <Button onClick={handleCancel} variant="back" size="sm">
          Annuller
        </Button>
      </div>
    </form>
  );
}
