// Same rule as server/progression.js, duplicated here because demo mode has
// no server to ask. If you change one, change the other.
//
// Rule: if every set in your most recent session for an exercise hit the top
// of the rep range, suggest more weight next time. Otherwise, suggest the
// same weight.

export const REP_TARGET_HIGH = 12

function incrementFor(exercise) {
  return exercise.region === 'lower' && exercise.exercise_type === 'compound' ? 2.5 : 1
}

export function suggestNextWeight(exercise, setsForExercise) {
  if (!setsForExercise || setsForExercise.length === 0) {
    return {
      suggestedWeightKg: null,
      hitTargetLastSession: null,
      message: 'No history yet. Log your first set to get a starting point.',
    }
  }

  const sorted = [...setsForExercise].sort(
    (a, b) => new Date(b.logged_at) - new Date(a.logged_at)
  )
  const newest = sorted[0]
  const lastSessionDay = new Date(newest.logged_at).toDateString()
  const lastSession = sorted.filter(
    (row) => new Date(row.logged_at).toDateString() === lastSessionDay
  )

  const hitTarget = lastSession.every((row) => row.reps >= REP_TARGET_HIGH)
  const lastWeight = Number(newest.weight_kg)

  if (hitTarget) {
    const nextWeight = Math.round((lastWeight + incrementFor(exercise)) * 100) / 100
    return {
      suggestedWeightKg: nextWeight,
      hitTargetLastSession: true,
      message: `You hit ${REP_TARGET_HIGH}+ reps on every set last time. Try ${nextWeight}kg next session.`,
    }
  }

  return {
    suggestedWeightKg: lastWeight,
    hitTargetLastSession: false,
    message: `Stick with ${lastWeight}kg. Aim for ${REP_TARGET_HIGH} reps on every set before moving up.`,
  }
}
