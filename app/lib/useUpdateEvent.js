import axios from "axios";
import useEventStore from "../stores/useEventStore";

export default function useUpdateEvent() {
  const updateEvent = useEventStore((state) => state.updateEvent);

  return async function updateEventOnServer(event) {
    const res = await axios.put(`https://async-exhibit-server-1qfz.onrender.com/events/${event.id}`, event);
    updateEvent(res.data);
    return res.data;
  };
}