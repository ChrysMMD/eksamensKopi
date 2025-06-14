import { useEffect } from "react";
import axios from "axios";
import useEventStore from "../stores/useEventStore";

export default function useLoadEvents() {
  const setEvents = useEventStore((state) => state.setEvents);

  useEffect(() => {
    axios.get("https://async-exhibit-server-1qfz.onrender.com/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Kunne ikke hente events", err));
  }, [setEvents]);
}
