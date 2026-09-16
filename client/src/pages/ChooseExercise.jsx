import ExerciseGroup from '../components/ExerciseGroup.jsx'

// Screen 2 of 4. Exercises grouped by muscle group; picking one moves on to
// Log Set for that exercise.
export default function ChooseExercise({ status, slow, error, exercises, onRetry, onSelect }) {
  const groups = exercises.reduce((byGroup, exercise) => {
    const key = exercise.muscle_group
    byGroup[key] = byGroup[key] || []
    byGroup[key].push(exercise)
    return byGroup
  }, {})

  return (
    <div>
      <h1>Choose an exercise</h1>
      <p className="lede">Grouped by muscle group. Tap one to log a set.</p>

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

      {status === 'ready' &&
        Object.entries(groups).map(([muscleGroup, groupExercises]) => (
          <ExerciseGroup
            key={muscleGroup}
            muscleGroup={muscleGroup}
            exercises={groupExercises}
            onSelect={onSelect}
          />
        ))}
    </div>
  )
}
