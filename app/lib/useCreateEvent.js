import axios from "axios";
import useEventStore from "../stores/useEventStore";

export default function useCreateEvent() {
  const addEvent = useEventStore((state) => state.addEvent);

  return async function createEvent(eventData) {
    console.log("Eventdata der sendes:", eventData);
    const res = await axios.post("https://async-exhibit-server-1qfz.onrender.com/events", eventData);
    addEvent(res.data);
    return res.data;
  };
}