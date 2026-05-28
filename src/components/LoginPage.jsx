import { useState } from 'react'

// ログイン画面コンポーネント
// props:
//   users       - 登録済みユーザー名の配列
//   onLogin     - ログイン成功時に呼ばれるコールバック（ユーザー名を渡す）
//   onGoRegister - 新規登録ボタンを押したときに呼ばれるコールバック
export default function LoginPage({ users, onLogin, onGoRegister }) {
  // 入力欄の値
  const [name, setName] = useState('')
  // エラーメッセージ（未登録のユーザー名でログインしようとしたときに表示）
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    // フォームのデフォルト送信（ページリロード）を防ぐ
    e.preventDefault()
    const trimmed = name.trim()
    // 空欄のままでは処理しない
    if (!trimmed) return
    // 登録済みユーザー一覧に存在しない名前はログイン不可
    if (!users.includes(trimmed)) {
      setError('登録されていないログイン名です。')
      return
    }
    // 親コンポーネントにログイン成功を通知する
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
            // 文字を入力するたびにstateを更新し、エラーをクリアする
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="ログイン名を入力"
            className="auth-input"
          />
          {/* エラーがある場合のみメッセージを表示 */}
          {error && <p className="auth-error">{error}</p>}
          {/* 入力欄が空のときはボタンを非活性にする */}
          <button
            type="submit"
            className="auth-button auth-button--primary"
            disabled={!name.trim()}
          >
            ログイン
          </button>
        </form>
        {/* 新規登録画面へ切り替える */}
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
