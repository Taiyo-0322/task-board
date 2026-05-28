import TaskItem from './TaskItem'

// タスク一覧コンポーネント
// props:
//   tasks            - 表示するタスクの配列
//   onToggle         - 親タスクの完了状態を切り替えるコールバック
//   onDelete         - 親タスクを削除するコールバック
//   onAddSubtask     - サブタスクを追加するコールバック
//   onToggleSubtask  - サブタスクの完了状態を切り替えるコールバック
//   onDeleteSubtask  - サブタスクを削除するコールバック
export default function TaskList({ tasks, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  // タスクが0件のときは案内メッセージを表示する
  if (tasks.length === 0) {
    return <p className="task-list__empty">タスクがありません。追加してください。</p>
  }

  return (
    <ul className="task-list">
      {/* タスクの数だけTaskItemを描画し、各操作のハンドラーを渡す */}
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
