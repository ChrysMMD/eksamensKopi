import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) =>
    set((state) => ({ events: [event, ...state.events] })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
export default useEventStore;
