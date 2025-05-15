"use client";

//CRUD dashboard

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {useState} from "react";
import Button from "../components/Button";

//Definerering til Typescript
type Event = {
  id: number;
  title: string;
  description: string;
};

export default function DashboardPage() {
  //eventliste som starter tom
  const [events, setEvents] = useState<Event[]>([]);
  //Event titel input
  const [title, setTitle] = useState("");
  //Event beskrivelse input
  const [description, setDescription] = useState("");

  //tilføj event 
  const handleAddEvent = () => {
    //sikkerhed om at der SKAL skrives en titel 
    if (!title) return;
    //event skal have unik id
    const newEvent = {
      id: Date.now(),
      title,
      description,
    };
    //nyt event ligger automatisk øverst
    setEvents((prev) => [newEvent, ...prev]);
    //ryd titel input
    setTitle("");
    //ryd beskrivelse input
    setDescription("");
  };

  //slette events
  const handleDeleteEvent = (id: number) => {
    //slette det event med det id, der bliver klippet på
    setEvents((prev) => prev.filter((e) => e.id !=id));
  };

  return (
  <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <div className="mb-6">
        <input
          className="border rounded p-2 w-full mb-2"
          placeholder="Event titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded p-2 w-full mb-2"
          placeholder="Event beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
  <Button size="lg">
    Tilføj event
  </Button>
      
      </div>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.description}</p>
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
