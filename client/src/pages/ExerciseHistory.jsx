import SuggestionBanner from '../components/SuggestionBanner.jsx'
import SetRow from '../components/SetRow.jsx'

// Screen 4 of 4. Every set logged for one exercise, newest first, with the
// same suggestion shown on the Log Set screen.
export default function ExerciseHistory({
  exercise,
  status,
  slow,
  error,
  sets,
  suggestion,
  onRetry,
  onDelete,
  onLogAnother,
}) {
  return (
    <div>
      <h1>{exercise ? exercise.name : 'History'}</h1>
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

          <button className="primary-button" onClick={onLogAnother}>
            Log another set
          </button>

          {sets.length === 0 && (
            <p className="muted">No sets logged yet for this exercise.</p>
          )}

          {sets.length > 0 && (
            <ul className="list">
              {sets.map((row) => (
                <SetRow key={row.id} row={row} onDelete={onDelete} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
