import api from "./api";

/**
 * Hent ALLE events fra serveren
 */
export async function getEvents() {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error("Fejl ved hentning af ALLE events:", error);
    return [];
  }
}

/**
 * Hent ét specifikt event via ID
 */
export async function getEvent(id) {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Fejl ved hentning af event med ID: ${id}`, error);
    return null;
  }
}
