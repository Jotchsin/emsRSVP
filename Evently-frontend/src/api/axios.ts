import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Laravel backend
  withCredentials: true,            // ✅ allow cookies
  xsrfCookieName: "XSRF-TOKEN",     // ✅ Laravel’s CSRF cookie
  xsrfHeaderName: "X-XSRF-TOKEN",   // ✅ Laravel expects this header
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Interceptor: make sure CSRF cookie is present before mutating requests
api.interceptors.request.use(async (config) => {
  if (
    ["post", "put", "patch", "delete"].includes(config.method || "")
  ) {
    // always hit csrf-cookie endpoint before sending mutations
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  }
  return config;
});

export default api;
