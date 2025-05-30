import api from './api';

export async function getEvent(id) {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fejl ved hentning af event:', error);
    return null;
  }
}
