import SetRow from '../components/SetRow.jsx'

// Screen 1 of 4. Today's log at a glance, plus the way into logging a set.
export default function Home({ status, slow, error, today, onRetry, onChoose }) {
  return (
    <div>
      <h1>Today</h1>
      <p className="lede">What you have logged so far today.</p>

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

      {status === 'ready' && today.length === 0 && (
        <p className="muted">Nothing logged yet today. Choose an exercise to start.</p>
      )}

      {status === 'ready' && today.length > 0 && (
        <ul className="list">
          {today.map((row) => (
            <SetRow key={row.id} row={row} showExerciseName />
          ))}
        </ul>
      )}

      <button className="primary-button" onClick={onChoose}>
        Log a set
      </button>
    </div>
  )
}
