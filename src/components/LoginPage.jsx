import { useState } from 'react'

export default function LoginPage({ users, onLogin, onGoRegister }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    if (!users.includes(trimmed)) {
      setError('登録されていないログイン名です。')
      return
    }
    onLogin(trimmed)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Task Board</h1>
        <h2 className="auth-subtitle">ログイン</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="ログイン名を入力"
            className="auth-input"
          />
          {error && <p className="auth-error">{error}</p>}
          <button
            type="submit"
            className="auth-button auth-button--primary"
            disabled={!name.trim()}
          >
            ログイン
          </button>
        </form>
        <button
          type="button"
          className="auth-button auth-button--secondary"
          onClick={onGoRegister}
        >
          新規登録
        </button>
      </div>
    </div>
  )
}
