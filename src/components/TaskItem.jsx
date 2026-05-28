export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
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
    </li>
  )
}
