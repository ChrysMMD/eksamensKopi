'use client';

import { useEffect, useState } from "react";

export default function PublicEventsPage(){
    const [events, setEvents] = useState([]);


return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offentlige Events</h1>
      {events.length === 0 ? (
        <p>Ingen events endnu 🕊️</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}