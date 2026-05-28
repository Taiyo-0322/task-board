import { useState } from 'react'

export default function TaskItem({ task, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  const [subtaskInput, setSubtaskInput] = useState('')

  const handleAddSubtask = (e) => {
    e.preventDefault()
    const trimmed = subtaskInput.trim()
    if (!trimmed) return
    onAddSubtask(task.id, trimmed)
    setSubtaskInput('')
  }

  const subtasks = task.subtasks ?? []

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-item__checkbox"
        />
        <span className="task-item__text">{task.text}</span>
        <button
          onClick={() => onDelete(task.id)}
          className="task-item__delete"
          aria-label="タスクを削除"
        >
          削除
        </button>
      </div>

      <div className="task-item__subtasks">
        {subtasks.map((sub) => (
          <div
            key={sub.id}
            className={`subtask ${sub.completed ? 'subtask--completed' : ''}`}
          >
            <input
              type="checkbox"
              checked={sub.completed}
              onChange={() => onToggleSubtask(task.id, sub.id)}
              className="task-item__checkbox"
            />
            <span className="subtask__text">{sub.text}</span>
            <button
              onClick={() => onDeleteSubtask(task.id, sub.id)}
              className="task-item__delete"
              aria-label="サブタスクを削除"
            >
              削除
            </button>
          </div>
        ))}

        <form className="subtask-input" onSubmit={handleAddSubtask}>
          <input
            type="text"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            placeholder="サブタスクを追加..."
            className="subtask-input__field"
          />
          <button type="submit" className="subtask-input__button">+ 追加</button>
        </form>
      </div>
    </li>
  )
}
