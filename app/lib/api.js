import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://async-exhibit-server-1qfz.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
