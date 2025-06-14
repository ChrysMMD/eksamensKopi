import { useEffect, useState } from "react";
import axios from "axios";

export default function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://async-exhibit-server-1qfz.onrender.com/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { locations, loading, error };
}
