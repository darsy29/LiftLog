import { useEffect, useState } from 'react'
import {
  listExercises,
  listSetsForExercise,
  listToday,
  createSet,
  deleteSet,
  USING_MOCK_API,
} from './api'
import { getStoredCredentials } from './api/httpApi.js'
import DemoNotice from './components/DemoNotice.jsx'
import LoginGate from './components/LoginGate.jsx'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import ChooseExercise from './pages/ChooseExercise.jsx'
import LogSet from './pages/LogSet.jsx'
import ExerciseHistory from './pages/ExerciseHistory.jsx'

function useSlowFlag(status) {
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    if (status !== 'loading') {
      setSlow(false)
      return
    }
    const timer = setTimeout(() => setSlow(true), 3000)
    return () => clearTimeout(timer)
  }, [status])
  return slow
}

export default function App() {
  const [view, setView] = useState('home')

  const [needsLogin, setNeedsLogin] = useState(!USING_MOCK_API && !getStoredCredentials())
  const [loginAttempted, setLoginAttempted] = useState(false)

  const [exercises, setExercises] = useState([])
  const [exercisesStatus, setExercisesStatus] = useState('loading')
  const [exercisesError, setExercisesError] = useState(null)
  const exercisesSlow = useSlowFlag(exercisesStatus)

  const [today, setToday] = useState([])
  const [todayStatus, setTodayStatus] = useState('loading')
  const [todayError, setTodayError] = useState(null)
  const todaySlow = useSlowFlag(todayStatus)

  const [selectedExerciseId, setSelectedExerciseId] = useState(null)
  const [detail, setDetail] = useState({ sets: [], suggestion: null })
  const [detailStatus, setDetailStatus] = useState('loading')
  const [detailError, setDetailError] = useState(null)
  const detailSlow = useSlowFlag(detailStatus)

  const [saving, setSaving] = useState(false)

  async function loadExercises() {
    setExercisesStatus('loading')
    setExercisesError(null)
    try {
      setExercises(await listExercises())
      setExercisesStatus('ready')
    } catch (caught) {
      if (caught.status === 401) return setNeedsLogin(true)
      setExercisesError(caught)
      setExercisesStatus('error')
    }
  }

  async function loadToday() {
    setTodayStatus('loading')
    setTodayError(null)
    try {
      setToday(await listToday())
      setTodayStatus('ready')
    } catch (caught) {
      if (caught.status === 401) return setNeedsLogin(true)
      setTodayError(caught)
      setTodayStatus('error')
    }
  }

  async function loadDetail(exerciseId) {
    setDetailStatus('loading')
    setDetailError(null)
    try {
      setDetail(await listSetsForExercise(exerciseId))
      setDetailStatus('ready')
    } catch (caught) {
      if (caught.status === 401) return setNeedsLogin(true)
      setDetailError(caught)
      setDetailStatus('error')
    }
  }

  useEffect(() => {
    if (needsLogin) return
    loadExercises()
    loadToday()
  }, [needsLogin])

  function handleLoginSubmit() {
    setLoginAttempted(true)
    setNeedsLogin(false)
  }

  function goHome() {
    setView('home')
    loadToday()
  }

  function goChoose() {
    setView('choose')
  }

  function selectExercise(exerciseId) {
    setSelectedExerciseId(exerciseId)
    setView('log')
    loadDetail(exerciseId)
  }

  function viewHistory() {
    setView('history')
  }

  function logAnother() {
    setView('log')
  }

  async function handleCreateSet({ weightKg, reps }) {
    setSaving(true)
    try {
      await createSet({ exerciseId: selectedExerciseId, weightKg, reps })
      await loadDetail(selectedExerciseId)
    } catch (caught) {
      if (caught.status === 401) {
        setNeedsLogin(true)
      } else {
        setDetailError(caught)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSet(id) {
    try {
      await deleteSet(id)
      await loadDetail(selectedExerciseId)
    } catch (caught) {
      if (caught.status === 401) {
        setNeedsLogin(true)
      } else {
        setDetailError(caught)
      }
    }
  }

  if (needsLogin) {
    return (
      <LoginGate
        error={loginAttempted ? 'Incorrect username or password.' : null}
        onSubmit={handleLoginSubmit}
      />
    )
  }

  const selectedExercise = exercises.find(
    (exercise) => String(exercise.id) === String(selectedExerciseId)
  )

  return (
    <div className="page">
      <Nav view={view} onHome={goHome} onChoose={goChoose} />
      <DemoNotice />

      {view === 'home' && (
        <Home
          status={todayStatus}
          slow={todaySlow}
          error={todayError}
          today={today}
          onRetry={loadToday}
          onChoose={goChoose}
        />
      )}

      {view === 'choose' && (
        <ChooseExercise
          status={exercisesStatus}
          slow={exercisesSlow}
          error={exercisesError}
          exercises={exercises}
          onRetry={loadExercises}
          onSelect={selectExercise}
        />
      )}

      {view === 'log' && (
        <LogSet
          exercise={selectedExercise}
          status={detailStatus}
          slow={detailSlow}
          error={detailError}
          suggestion={detail.suggestion}
          saving={saving}
          onRetry={() => loadDetail(selectedExerciseId)}
          onSubmit={handleCreateSet}
          onViewHistory={viewHistory}
        />
      )}

      {view === 'history' && (
        <ExerciseHistory
          exercise={selectedExercise}
          status={detailStatus}
          slow={detailSlow}
          error={detailError}
          sets={detail.sets}
          suggestion={detail.suggestion}
          onRetry={() => loadDetail(selectedExerciseId)}
          onDelete={handleDeleteSet}
          onLogAnother={logAnother}
        />
      )}
    </div>
  )
}
