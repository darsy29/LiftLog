export default function SetRow({ row, showExerciseName, onDelete }) {
  return (
    <li className="card set-row">
      <div>
        {showExerciseName && <strong>{row.exercise_name}</strong>}
        <div className="set-detail">
          {row.weight_kg}kg &times; {row.reps} reps
        </div>
        <time className="muted" dateTime={row.logged_at}>
          {new Date(row.logged_at).toLocaleString()}
        </time>
      </div>
      {onDelete && (
        <button className="ghost-button" onClick={() => onDelete(row.id)}>
          Delete
        </button>
      )}
    </li>
  )
}
