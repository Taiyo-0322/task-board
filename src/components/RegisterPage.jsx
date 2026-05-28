import { useState } from 'react'

export default function RegisterPage({ users, onRegister, onGoLogin }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    if (users.includes(trimmed)) {
      setError('このログイン名はすでに使用されています。')
      return
    }
    onRegister(trimmed)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Task Board</h1>
        <h2 className="auth-subtitle">新規登録</h2>
        <form onSubmit={handleRegister} className="auth-form">
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
            登録
          </button>
        </form>
        <button
          type="button"
          className="auth-button auth-button--secondary"
          onClick={onGoLogin}
        >
          ログインに戻る
        </button>
      </div>
    </div>
  )
}
