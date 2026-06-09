import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      const from = (location.state as { from?: Location } | null)?.from?.pathname ?? '/dashboard'
      navigate(from, { replace: true })
    } catch {
      setError('Unable to sign in with those credentials.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>
      {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <label className="block text-sm font-medium">
        Email
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="block text-sm font-medium">
        Password
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button className="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white" type="submit">
        Login
      </button>
      <p className="text-sm text-slate-600">
        New merchant? <Link className="font-medium text-slate-950" to="/register">Create an account</Link>
      </p>
    </form>
  )
}
