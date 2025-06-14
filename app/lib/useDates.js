import { useEffect, useState } from "react";
import axios from "axios";

export default function useDates() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    setLoading(true);
    axios
      .get("https://async-exhibit-server-1qfz.onrender.com/dates")
      .then((res) => setDates(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { dates, loading, error };
}

