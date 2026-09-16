// The real client. Every function here talks to YOUR Express API.
//
// This is the version that matters for your finals submission. mockApi.js
// exists so you can build the interface before this has anywhere to point.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    // Try to use the API's own message; fall back to the status line.
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // The body was not JSON. The status line is all we have.
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const listExercises = () => request('/api/exercises')

export const getExercise = (id) => request(`/api/exercises/${id}`)

// Returns { sets, suggestion }, same shape as mockApi.
export const listSetsForExercise = (exerciseId) =>
  request(`/api/exercises/${exerciseId}/sets`)

export const listToday = () => request('/api/sets/today')

export const createSet = ({ exerciseId, weightKg, reps }) =>
  request('/api/sets', { method: 'POST', body: JSON.stringify({ exerciseId, weightKg, reps }) })

export const deleteSet = (id) => request(`/api/sets/${id}`, { method: 'DELETE' })
