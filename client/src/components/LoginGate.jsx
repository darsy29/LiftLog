import { useState } from 'react'
import { setStoredCredentials } from '../api/httpApi.js'

export default function LoginGate({ error, onSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setStoredCredentials(username, password)
    onSubmit()
  }

  return (
    <div className="page">
      <h1>LiftLog</h1>
      <p className="lede">Enter your username and password to continue.</p>

      {error && <p className="error" role="alert">{error}</p>}

      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" className="primary-button">Log in</button>
      </form>
    </div>
  )
}
