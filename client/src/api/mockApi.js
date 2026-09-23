import seed from './seed.json'
import { suggestNextWeight } from './progression.js'

const KEY = 'liftlog:data'
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function read() {
  const stored = localStorage.getItem(KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(KEY)
    }
  }

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
