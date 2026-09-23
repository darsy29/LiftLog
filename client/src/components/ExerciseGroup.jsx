export default function ExerciseGroup({ muscleGroup, exercises, onSelect }) {
  return (
    <section className="exercise-group">
      <h2>{muscleGroup}</h2>
      <ul className="list">
        {exercises.map((exercise) => (
          <li key={exercise.id} className="card exercise-row">
            <button className="exercise-pick" onClick={() => onSelect(exercise.id)}>
              <span>{exercise.name}</span>
              <span className="muted tag">{exercise.exercise_type}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
