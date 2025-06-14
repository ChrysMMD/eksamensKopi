import { useEffect } from "react";
import useEventStore from "../stores/useEventStore";
import { getEvents } from "./eventApi";

export default function useLoadEvents() {
  const setEvents = useEventStore((state) => state.setEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents(); 
      setEvents(data);
    };

    fetchEvents();
  }, [setEvents]);
}
