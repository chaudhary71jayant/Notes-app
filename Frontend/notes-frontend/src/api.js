import axios from "axios";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const baseURL = configuredApiBaseUrl || "/api/v1";

if (import.meta.env.PROD && !configuredApiBaseUrl) {
  console.warn(
    "VITE_API_BASE_URL is not set. The frontend will call its own origin and login may fail in production.",
  );
}

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
