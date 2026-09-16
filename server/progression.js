// The one "smart" feature: double progression.
//
// Rule: if every set in your most recent session for an exercise hit the top
// of the rep range, suggest more weight next time. Otherwise, suggest the
// same weight and say what is left to hit.
//
// This is a plain function with no database in it on purpose, so it can be
// tested and reasoned about on its own. It is duplicated (in spirit) by
// client/src/api/mockApi.js, because demo mode has no server to call this
// from. Keep the two in agreement if you change the rule.

export const REP_TARGET_LOW = 8
export const REP_TARGET_HIGH = 12

// +2.5kg for lower-body compound lifts (squat, deadlift, leg press), +1kg for
// everything else (upper body, and any isolation exercise).
function incrementFor(exercise) {
  return exercise.region === 'lower' && exercise.exercise_type === 'compound' ? 2.5 : 1
}

// setsForExercise: every logged set for one exercise, any order.
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
