import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">タスクがありません。追加してください。</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  )
}
