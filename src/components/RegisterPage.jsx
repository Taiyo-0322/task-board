import { useState } from 'react'

// 新規登録画面コンポーネント
// props:
//   users      - すでに登録済みのユーザー名配列（重複チェックに使用）
//   onRegister - 登録成功時に呼ばれるコールバック（ユーザー名を渡す）
//   onGoLogin  - ログインに戻るボタンを押したときに呼ばれるコールバック
export default function RegisterPage({ users, onRegister, onGoLogin }) {
  // 入力欄の値
  const [name, setName] = useState('')
  // エラーメッセージ（重複したユーザー名を登録しようとしたときに表示）
  const [error, setError] = useState('')

  const handleRegister = (e) => {
    // フォームのデフォルト送信（ページリロード）を防ぐ
    e.preventDefault()
    const trimmed = name.trim()
    // 空欄のままでは処理しない
    if (!trimmed) return
    // 同じユーザー名がすでに存在する場合は登録不可（一意性の保証）
    if (users.includes(trimmed)) {
      setError('このログイン名はすでに使用されています。')
      return
    }
    // 親コンポーネントに登録成功を通知する
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
            登録
          </button>
        </form>
        {/* ログイン画面へ切り替える */}
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
