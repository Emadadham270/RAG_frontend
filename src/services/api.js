/**
 * api.js
 * Centralised fetch wrapper for all backend calls.
 * Base URL points to the local Express backend.
 */

const BASE = import.meta.env.VITE_API_URL || "https://ragbackend-production.up.railway.app";

// ── helpers ──────────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem("rag_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.errors?.join(", ") ||
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  register: (name, email, password) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// ── Chat ─────────────────────────────────────────────────────────────────────

export const chatApi = {
  getHistory: () => request("/api/chat"),

  ask: (question, language = "auto") =>
    request("/api/chat/ask", {
      method: "POST",
      body: JSON.stringify({ question, language }),
    }),

  deleteMessage: (id) =>
    request(`/api/chat/${id}`, { method: "DELETE" }),

  clearHistory: () =>
    request("/api/chat", { method: "DELETE" }),
};
