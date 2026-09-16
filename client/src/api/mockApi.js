// The simulated backend.
//
// Same function names, same return shapes, and the same shape of failure as
// httpApi.js, so your components cannot tell the difference. Data lives in
// the visitor's own browser and goes no further.
//
// This exists so the template's GitHub Pages link works on day one and so you
// can build the interface before your API is deployed. It is NOT a finished
// project: your real data and your real progression logic live on the server.

import seed from './seed.json'
import { suggestNextWeight } from './progression.js'

const KEY = 'liftlog:data'

// A real network is not instant. Keeping this delay is what forces you to
// build a loading state now, while it is cheap, instead of discovering you
// need one the day you switch to the real API.
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function read() {
  const stored = localStorage.getItem(KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Corrupted storage. Start again rather than crashing the app.
      localStorage.removeItem(KEY)
    }
  }

  // One seed row is dated "TODAY" so the Home screen's Today section always
  // has something to show, no matter when someone opens this for the first
  // time.
  const fresh = {
    exercises: seed.exercises,
    sets: seed.sets.map((row) =>
      row.logged_at === 'TODAY' ? { ...row, logged_at: new Date().toISOString() } : row
    ),
  }
  localStorage.setItem(KEY, JSON.stringify(fresh))
  return fresh
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

export async function listExercises() {
  await delay()
  return read()
    .exercises.slice()
    .sort((a, b) => a.muscle_group.localeCompare(b.muscle_group) || a.name.localeCompare(b.name))
}

export async function getExercise(id) {
  await delay()
  const found = read().exercises.find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

export async function listSetsForExercise(exerciseId) {
  await delay()
  const data = read()
  const exercise = data.exercises.find((row) => String(row.id) === String(exerciseId))
  if (!exercise) throw new Error('Not found')

  const sets = data.sets
    .filter((row) => String(row.exercise_id) === String(exerciseId))
    .sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at))

  return { sets, suggestion: suggestNextWeight(exercise, sets) }
}

export async function listToday() {
  await delay()
  const data = read()
  const todayKey = new Date().toDateString()

  return data.sets
    .filter((row) => new Date(row.logged_at).toDateString() === todayKey)
    .map((row) => {
      const exercise = data.exercises.find((e) => String(e.id) === String(row.exercise_id))
      return { ...row, exercise_name: exercise?.name ?? 'Unknown exercise' }
    })
    .sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at))
}

export async function createSet({ exerciseId, weightKg, reps }) {
  await delay()
  const data = read()
  const created = {
    id: crypto.randomUUID(),
    exercise_id: exerciseId,
    weight_kg: weightKg,
    reps,
    logged_at: new Date().toISOString(),
  }
  write({ ...data, sets: [...data.sets, created] })
  return created
}

export async function deleteSet(id) {
  await delay()
  const data = read()
  write({ ...data, sets: data.sets.filter((row) => String(row.id) !== String(id)) })
}
