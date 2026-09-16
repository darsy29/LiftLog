import { useEffect, useState } from 'react'
import SuggestionBanner from '../components/SuggestionBanner.jsx'

// Screen 3 of 4. Shows the progression suggestion for this exercise, and a
// short form to log a set.
export default function LogSet({
  exercise,
  status,
  slow,
  error,
  suggestion,
  saving,
  onRetry,
  onSubmit,
  onViewHistory,
}) {
  const [weightKg, setWeightKg] = useState('')
  const [reps, setReps] = useState('')

  // Pre-fill the weight field with the suggestion once it arrives, so the
  // common case (just log what was suggested) is a single tap.
  useEffect(() => {
    if (suggestion?.suggestedWeightKg != null) {
      setWeightKg(String(suggestion.suggestedWeightKg))
    }
  }, [suggestion?.suggestedWeightKg])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!weightKg || !reps) return
    await onSubmit({ weightKg: Number(weightKg), reps: Number(reps) })
    setReps('')
  }

  return (
    <div>
      <h1>{exercise ? exercise.name : 'Log a set'}</h1>
      {exercise && <p className="lede muted">{exercise.muscle_group} &middot; {exercise.exercise_type}</p>}

      {error && (
        <p className="error" role="alert">
          {error.message} <button onClick={onRetry}>Try again</button>
        </p>
      )}

      {status === 'loading' && (
        <p className="muted">
          Loading{slow ? '. The server may be waking up, which can take up to a minute.' : '...'}
        </p>
      )}

      {status === 'ready' && (
        <>
          <SuggestionBanner suggestion={suggestion} />

          <form onSubmit={handleSubmit} className="card">
            <label htmlFor="weightKg">Weight (kg)</label>
            <input
              id="weightKg"
              type="number"
              min="0"
              max="500"
              step="0.5"
              value={weightKg}
              onChange={(event) => setWeightKg(event.target.value)}
              required
            />

            <label htmlFor="reps">Reps</label>
            <input
              id="reps"
              type="number"
              min="1"
              max="100"
              value={reps}
              onChange={(event) => setReps(event.target.value)}
              required
            />

            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? 'Saving...' : 'Log set'}
            </button>
          </form>

          <button className="ghost-button" onClick={onViewHistory}>
            View history for this exercise
          </button>
        </>
      )}
    </div>
  )
}
