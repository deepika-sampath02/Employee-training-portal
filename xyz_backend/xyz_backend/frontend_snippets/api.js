// src/services/api.js  -- drop this into your React (Vite) project.
// Uses fetch, so no extra packages are needed.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const store = {
  get: (k) => localStorage.getItem(k) || sessionStorage.getItem(k),
  set: (k, v, remember) => (remember ? localStorage : sessionStorage).setItem(k, v),
  clear: () => {
    ["access", "refresh", "user"].forEach((k) => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  },
};

async function refreshAccessToken() {
  const refresh = store.get("refresh");
  if (!refresh) return false;
  const res = await fetch(`${BASE_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) return false;
  const { access } = await res.json();
  const remember = !!localStorage.getItem("refresh");
  store.set("access", access, remember);
  return true;
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const doFetch = () =>
    fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
        ...(auth && store.get("access") ? { Authorization: `Bearer ${store.get("access")}` } : {}),
      },
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });

  let res = await doFetch();
  if (res.status === 401 && auth && (await refreshAccessToken())) res = await doFetch();
  if (res.status === 401 && auth) {
    store.clear();
    window.location.href = "/login";
    return;
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.detail || "Request failed"), { status: res.status, data });
  return data;
}

export async function login(identifier, password, rememberMe) {
  const data = await api("/auth/login/", {
    method: "POST",
    auth: false,
    body: { identifier, password, remember_me: rememberMe },
  });
  store.clear();
  store.set("access", data.access, rememberMe);
  store.set("refresh", data.refresh, rememberMe);
  store.set("user", JSON.stringify(data.user), rememberMe);
  return data.user;
}

export const logout = () => {
  store.clear();
  window.location.href = "/login";
};

export const currentUser = () => {
  try { return JSON.parse(store.get("user")); } catch { return null; }
};
