import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { pool } from './db/pool.js'
import * as exercisesRepo from './exercisesRepo.js'
import * as setsRepo from './setsRepo.js'
import { suggestNextWeight } from './progression.js'
import { basicAuth } from './basicAuth.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '100kb' }))

app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

app.use('/api', basicAuth)

app.get('/api/exercises', async (request, response, next) => {
  try {
    response.json(await exercisesRepo.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/exercises/:id', async (request, response, next) => {
  try {
    const exercise = await exercisesRepo.getById(pool, request.params.id)
    if (!exercise) return response.status(404).json({ error: 'Not found' })
    response.json(exercise)
  } catch (error) {
    next(error)
  }
})

app.get('/api/exercises/:id/sets', async (request, response, next) => {
  try {
    const exercise = await exercisesRepo.getById(pool, request.params.id)
    if (!exercise) return response.status(404).json({ error: 'Not found' })

    const sets = await setsRepo.getForExercise(pool, request.params.id)
    response.json({ sets, suggestion: suggestNextWeight(exercise, sets) })
  } catch (error) {
    next(error)
  }
})

app.get('/api/sets/today', async (request, response, next) => {
  try {
    response.json(await setsRepo.getToday(pool))
  } catch (error) {
    next(error)
  }
})

function validateSet(body) {
  const errors = []
  const exerciseId = Number(body.exerciseId)
  const weightKg = Number(body.weightKg)
  const reps = Number(body.reps)

  if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
    errors.push('exerciseId must be a valid exercise')
  }
  if (!Number.isFinite(weightKg) || weightKg < 0 || weightKg > 500) {
    errors.push('weightKg must be a number from 0 to 500')
  }
  if (!Number.isInteger(reps) || reps <= 0 || reps > 100) {
    errors.push('reps must be a whole number from 1 to 100')
  }

  return { errors, value: { exerciseId, weightKg, reps } }
}

app.post('/api/sets', async (request, response, next) => {
  const { errors, value } = validateSet(request.body ?? {})
  if (errors.length > 0) return response.status(400).json({ error: errors.join('; ') })

  try {
    const exercise = await exercisesRepo.getById(pool, value.exerciseId)
    if (!exercise) return response.status(400).json({ error: 'exerciseId must be a valid exercise' })

    response.status(201).json(await setsRepo.create(pool, value))
  } catch (error) {
    next(error)
  }
})

app.delete('/api/sets/:id', async (request, response, next) => {
  try {
    const removed = await setsRepo.remove(pool, request.params.id)
    if (!removed) return response.status(404).json({ error: 'Not found' })
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'No such route' })
})

app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ error: 'Something went wrong on the server' })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log(`CORS allows: ${allowedOrigins.join(', ')}`)
})
