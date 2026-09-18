export async function getForExercise(pool, exerciseId) {
  const result = await pool.query(
    'SELECT * FROM sets WHERE exercise_id = $1 ORDER BY logged_at DESC',
    [exerciseId]
  )
  return result.rows
}

export async function getToday(pool) {
  const result = await pool.query(
    `SELECT sets.*, exercises.name AS exercise_name, exercises.muscle_group
     FROM sets
     JOIN exercises ON exercises.id = sets.exercise_id
     WHERE sets.logged_at >= date_trunc('day', now())
     ORDER BY sets.logged_at DESC`
  )
  return result.rows
}

export async function create(pool, { exerciseId, weightKg, reps }) {
  const result = await pool.query(
    `INSERT INTO sets (exercise_id, weight_kg, reps) VALUES ($1, $2, $3) RETURNING *`,
    [exerciseId, weightKg, reps]
  )
  return result.rows[0]
}

export async function remove(pool, id) {
  const result = await pool.query('DELETE FROM sets WHERE id = $1 RETURNING id', [id])
  return result.rowCount > 0
}
