// The "home base" every other screen can return to. Small on purpose: this
// app has four screens, not a full site.
export default function Nav({ view, onHome, onChoose }) {
  return (
    <nav className="nav">
      <span className="brand">LiftLog</span>
      <div className="nav-links">
        <button
          className={view === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={onHome}
        >
          Home
        </button>
        <button
          className={view === 'choose' ? 'nav-link active' : 'nav-link'}
          onClick={onChoose}
        >
          Choose exercise
        </button>
      </div>
    </nav>
  )
}
