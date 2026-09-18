export async function getAll(pool) {
  const result = await pool.query('SELECT * FROM exercises ORDER BY muscle_group, name')
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM exercises WHERE id = $1', [id])
  return result.rows[0] ?? null
}
