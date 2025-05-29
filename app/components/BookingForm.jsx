"use client"

import {useForm} from "react-hook-form";
import Button from "./Button";

//chatgbt hjælp
export default function BookingForm ({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
      {/* Navn */}
      <div>
        <label className="block mb-1 font-semibold">Navn</label>
        <input
          {...register("name", { required: "Navn er påkrævet" })}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          {...register("email", {
            required: "Email er påkrævet",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Ugyldig email-adresse",
            },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Antal billetter */}
      <div>
        <label className="block mb-1 font-semibold">Antal billetter</label>
        <input
          type="number"
          {...register("tickets", {
            required: "Vælg antal billetter",
            min: { value: 1, message: "Mindst 1 billet" },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.tickets && <p className="text-red-500 text-sm">{errors.tickets.message}</p>}
      </div>

      {/* Submit-knap */}
      <Button 
      type="submit" 
      variant="secondary">
        Bekræft booking
      </Button>
    </form>
    );
}