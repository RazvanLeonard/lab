import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkAdminPin, setAdminAuthenticated } from '@/lib/auth'

export function AdminLogin() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (checkAdminPin(pin)) {
      setAdminAuthenticated()
      navigate('/admin')
    } else {
      setError('Incorrect PIN')
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-card border border-line bg-surface p-8 shadow-card">
        <h2 className="mb-6 text-xl font-bold text-text">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pin" className="mb-2 block text-sm font-medium text-muted">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Enter PIN"
              autoFocus
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-accent py-3 font-semibold text-bg transition-colors hover:bg-accent/90"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Default PIN: 1234 (set VITE_ADMIN_PIN in .env to change)
        </p>
      </div>
    </div>
  )
}
