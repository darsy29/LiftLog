const BASE = import.meta.env.VITE_API_BASE_URL || ''
const AUTH_KEY = 'liftlog:auth'

export function getStoredCredentials() {
  const raw = sessionStorage.getItem(AUTH_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setStoredCredentials(username, password) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify({ username, password }))
}

export function clearStoredCredentials() {
  sessionStorage.removeItem(AUTH_KEY)
}

async function request(path, options) {
  const credentials = getStoredCredentials()
  const headers = { 'Content-Type': 'application/json' }
  if (credentials) {
    headers.Authorization = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
  }

  const response = await fetch(`${BASE}${path}`, { headers, ...options })

  if (response.status === 401) {
    clearStoredCredentials()
    const error = new Error('Authentication required')
    error.status = 401
    throw error
  }

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {}
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const listExercises = () => request('/api/exercises')

export const getExercise = (id) => request(`/api/exercises/${id}`)

export const listSetsForExercise = (exerciseId) =>
  request(`/api/exercises/${exerciseId}/sets`)

export const listToday = () => request('/api/sets/today')

export const createSet = ({ exerciseId, weightKg, reps }) =>
  request('/api/sets', { method: 'POST', body: JSON.stringify({ exerciseId, weightKg, reps }) })

export const deleteSet = (id) => request(`/api/sets/${id}`, { method: 'DELETE' })
