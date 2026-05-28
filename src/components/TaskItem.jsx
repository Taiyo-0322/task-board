import { useState } from 'react'

// 1件のタスクを表示するコンポーネント
// props:
//   task             - 表示するタスクオブジェクト { id, text, completed, subtasks }
//   onToggle         - 親タスクの完了状態を切り替えるコールバック
//   onDelete         - 親タスクを削除するコールバック
//   onAddSubtask     - サブタスクを追加するコールバック
//   onToggleSubtask  - サブタスクの完了状態を切り替えるコールバック
//   onDeleteSubtask  - サブタスクを削除するコールバック
export default function TaskItem({ task, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  // サブタスク一覧の展開・折りたたみ状態（タスク名をクリックで切り替える）
  const [expanded, setExpanded] = useState(false)
  // サブタスク入力欄の現在の値
  const [subtaskInput, setSubtaskInput] = useState('')

  // subtasks が undefined の場合に備えて空配列を初期値にする
  const subtasks = task.subtasks ?? []

  const handleAddSubtask = (e) => {
    // フォームのデフォルト送信（ページリロード）を防ぐ
    e.preventDefault()
    const trimmed = subtaskInput.trim()
    // 空欄のままでは追加しない
    if (!trimmed) return
    // 親コンポーネントにサブタスクの追加を通知する
    onAddSubtask(task.id, trimmed)
    // 追加後に入力欄をリセットする
    setSubtaskInput('')
  }

  return (
    // 完了済みのタスクには task-item--completed クラスを付けてグレー表示にする
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>

      {/* タスクのメイン行：チェックボックス・タスク名・削除ボタン */}
      <div className="task-item__main">
        {/* チェックボックスを押すと親タスクの完了状態が切り替わる（サブタスクも連動） */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-item__checkbox"
        />
        {/* タスク名をクリックするとサブタスク一覧を展開・折りたたみする */}
        <span
          className="task-item__text task-item__text--clickable"
          onClick={() => setExpanded((v) => !v)}
        >
          {/* サブタスクが1件以上あるときだけ矢印アイコンを表示する */}
          {subtasks.length > 0 && (
            <span className="task-item__arrow">{expanded ? '▼' : '▶'}</span>
          )}
          {task.text}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="task-item__delete"
          aria-label="タスクを削除"
        >
          削除
        </button>
      </div>

      {/* expanded が true のときだけサブタスク一覧と入力フォームを表示する */}
      {expanded && (
        <div className="task-item__subtasks">
          {/* サブタスクの数だけ行を描画する */}
          {subtasks.map((sub) => (
            <div
              key={sub.id}
              className={`subtask ${sub.completed ? 'subtask--completed' : ''}`}
            >
              {/* サブタスクのチェックボックス：このサブタスクのみ完了状態を切り替える */}
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => onToggleSubtask(task.id, sub.id)}
                className="task-item__checkbox"
              />
              <span className="subtask__text">{sub.text}</span>
              {/* サブタスクの削除ボタン */}
              <button
                onClick={() => onDeleteSubtask(task.id, sub.id)}
                className="task-item__delete"
                aria-label="サブタスクを削除"
              >
                削除
              </button>
            </div>
          ))}

          {/* サブタスク追加フォーム */}
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
      )}
    </li>
  )
}
