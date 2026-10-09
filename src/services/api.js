// src/services/api.js
// Small fetch wrapper for the Django backend. No extra packages needed.
// Set VITE_API_URL in a .env file in your frontend folder if the backend isn't on port 8000.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// "Remember Me" -> localStorage (survives closing the browser). Otherwise sessionStorage.
const store = {
  get: (k) => localStorage.getItem(k) || sessionStorage.getItem(k),
  set: (k, v, remember) => (remember ? localStorage : sessionStorage).setItem(k, v),
}

export function clearSession() {
  ;['access', 'refresh', 'user'].forEach((k) => {
    localStorage.removeItem(k)
    sessionStorage.removeItem(k)
  })
}

export const getAccessToken = () => store.get('access')

// Keep the saved user in sync after the profile changes (name, photo...).
export function saveStoredUser(user) {
  const remember = !!localStorage.getItem('refresh')
  store.set('user', JSON.stringify(user), remember)
}

export function getStoredUser() {
  try {
    return JSON.parse(store.get('user'))
  } catch {
    return null
  }
}

async function refreshAccessToken() {
  const refresh = store.get('refresh')
  if (!refresh) return false
  const res = await fetch(`${BASE_URL}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!res.ok) return false
  const { access } = await res.json()
  store.set('access', access, !!localStorage.getItem('refresh'))
  return true
}

let onSessionExpired = null

export function setSessionExpiredHandler(fn) {
  onSessionExpired = fn
}

export async function api(path, { method = 'GET', body, auth = true } = {}) {
  const send = () =>
    fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        ...(body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
        ...(auth && store.get('access') ? { Authorization: `Bearer ${store.get('access')}` } : {}),
      },
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    })

  let res = await send()
  if (res.status === 401 && auth && (await refreshAccessToken())) res = await send()

  if (res.status === 401 && auth) {
    // Session expired or token invalid: clear it and notify AuthContext.
    clearSession()
    if (onSessionExpired) {
      onSessionExpired()
    } else {
      window.location.href = '/login'
    }
    throw Object.assign(new Error('Session expired. Please sign in again.'), { status: 401 })
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null)
  if (!res.ok) {
    throw Object.assign(new Error(data?.detail || 'Something went wrong. Please try again.'), {
      status: res.status,
      data,
    })
  }
  return data
}

export async function loginRequest(identifier, password, rememberMe) {
  const data = await api('/auth/login/', {
    method: 'POST',
    auth: false,
    body: { identifier, password, remember_me: rememberMe },
  })
  clearSession()
  store.set('access', data.access, rememberMe)
  store.set('refresh', data.refresh, rememberMe)
  store.set('user', JSON.stringify(data.user), rememberMe)
  return data.user
}
