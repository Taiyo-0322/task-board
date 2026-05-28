import { useState } from 'react'

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="タスクを入力してください..."
        className="task-input__field"
      />
      <button type="submit" className="task-input__button">追加</button>
    </form>
  )
}
