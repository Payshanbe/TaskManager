import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

function Header() {
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
        : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
    }`

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold sm:text-xl">Task Manager Pro</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Organize. Track. Deliver.</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <NavLink to="/" className={navClass} end>
              Tasks
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header