import axios from "axios";
import useEventStore from "../stores/useEventStore";

export default function useDeleteEvent() {
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  return async function deleteEventOnServer(id) {
    await axios.delete(`https://async-exhibit-server-1qfz.onrender.com/events/${id}`);
    deleteEvent(id);
  };
}