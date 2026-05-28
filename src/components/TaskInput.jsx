import { useState } from 'react'

// タスク入力フォームコンポーネント
// props:
//   onAdd - 追加ボタンを押したときに呼ばれるコールバック（タスクのテキストを渡す）
export default function TaskInput({ onAdd }) {
  // 入力欄の現在の値
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    // フォームのデフォルト送信（ページリロード）を防ぐ
    e.preventDefault()
    const trimmed = value.trim()
    // 空欄のままでは追加しない
    if (!trimmed) return
    // 親コンポーネントにタスクのテキストを渡す
    onAdd(trimmed)
    // 追加後に入力欄をリセットする
    setValue('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        // 文字を入力するたびにstateを更新する
        onChange={(e) => setValue(e.target.value)}
        placeholder="タスクを入力してください..."
        className="task-input__field"
      />
      <button type="submit" className="task-input__button">追加</button>
    </form>
  )
}
