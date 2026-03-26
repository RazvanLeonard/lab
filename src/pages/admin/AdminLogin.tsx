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
      <div className="panel-dark w-full max-w-sm rounded-card p-8">
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
              className="input-dark w-full rounded-lg px-4 py-3 text-text placeholder-muted"
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
      </div>
    </div>
  )
}
