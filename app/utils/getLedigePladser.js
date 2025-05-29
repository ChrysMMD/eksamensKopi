//chatgbt brugt 

export default function getLedigePladser(event) {
  if (!event || typeof event.totalTickets !== "number" || typeof event.bookedTickets !== "number") {
    return 0;
  }

  return event.totalTickets - event.bookedTickets;
}
