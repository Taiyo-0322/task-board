import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

// localStorageに保存するときのキー名
const USERS_KEY = 'task-board-users'           // 登録済みユーザー一覧
const CURRENT_USER_KEY = 'task-board-current-user' // 現在ログイン中のユーザー名

// ユーザーごとにタスクを分けて保存するためのキーを生成する
const taskKey = (user) => `task-board-tasks-${user}`

// localStorageからJSONを読み込むヘルパー関数
// 読み込みに失敗した場合はfallbackの値を返す
const loadJSON = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  // 現在表示する画面: 'login' | 'register' | 'app'
  const [view, setView] = useState('login')

  // 登録済みユーザー名の一覧（localStorage から初期値を読み込む）
  const [users, setUsers] = useState(() => loadJSON(USERS_KEY, []))

  // 現在ログイン中のユーザー名（セッション維持のため localStorage から読み込む）
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(CURRENT_USER_KEY) ?? null)

  // 現在表示中のタスク一覧
  const [tasks, setTasks] = useState([])

  // 初回レンダリング時：すでにログイン済みであればタスクを読み込んでアプリ画面へ移動する
  useEffect(() => {
    if (currentUser) {
      setTasks(loadJSON(taskKey(currentUser), []))
      setView('app')
    }
  }, [])

  // tasksが変わるたびに、ログイン中ユーザーのタスクをlocalStorageへ保存する
  useEffect(() => {
    if (currentUser && view === 'app') {
      localStorage.setItem(taskKey(currentUser), JSON.stringify(tasks))
    }
  }, [tasks, currentUser, view])

  // ログイン処理：ユーザー名をlocalStorageに保存し、そのユーザーのタスクを読み込んでアプリ画面へ
  const handleLogin = (name) => {
    localStorage.setItem(CURRENT_USER_KEY, name)
    setCurrentUser(name)
    setTasks(loadJSON(taskKey(name), []))
    setView('app')
  }

  // 新規登録処理：ユーザー一覧に追加してlocalStorageへ保存し、ログイン画面へ戻る
  const handleRegister = (name) => {
    const updated = [...users, name]
    setUsers(updated)
    localStorage.setItem(USERS_KEY, JSON.stringify(updated))
    setView('login')
  }

  // ログアウト処理：セッション情報を削除してログイン画面へ戻る
  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setCurrentUser(null)
    setTasks([])
    setView('login')
  }

  // ---------- タスク操作 ----------

  // 新しいタスクをリストの末尾に追加する
  // id にはユニーク値として現在のタイムスタンプを使用する
  const addTask = (text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false, subtasks: [] }])
  }

  // タスクの完了状態を切り替える
  // 親タスクを切り替えると、すべてのサブタスクも同じ状態に合わせる
  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id !== id) return task
      const next = !task.completed
      return { ...task, completed: next, subtasks: (task.subtasks ?? []).map((s) => ({ ...s, completed: next })) }
    }))
  }

  // 指定したIDのタスクをリストから削除する
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // 指定した親タスクにサブタスクを追加する
  const addSubtask = (taskId, text) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: [...(task.subtasks ?? []), { id: Date.now(), text, completed: false }] }
        : task
    ))
  }

  // 指定したサブタスクの完了状態を切り替える
  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.map((s) => s.id === subtaskId ? { ...s, completed: !s.completed } : s) }
        : task
    ))
  }

  // 指定したサブタスクを削除する
  const deleteSubtask = (taskId, subtaskId) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.filter((s) => s.id !== subtaskId) }
        : task
    ))
  }

  // view の値に応じて表示する画面を切り替える
  if (view === 'login') return (
    <LoginPage users={users} onLogin={handleLogin} onGoRegister={() => setView('register')} />
  )

  if (view === 'register') return (
    <RegisterPage users={users} onRegister={handleRegister} onGoLogin={() => setView('login')} />
  )

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="title">Task Board</h1>
        {/* ヘッダー右側にログイン中のユーザー名とログアウトボタンを表示 */}
        <div className="app-header__user">
          <span className="app-header__username">{currentUser}</span>
          <button className="logout-button" onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
      {/* タスク入力フォーム */}
      <TaskInput onAdd={addTask} />
      {/* タスク一覧。各操作のハンドラーを子コンポーネントへ渡す */}
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onAddSubtask={addSubtask}
        onToggleSubtask={toggleSubtask}
        onDeleteSubtask={deleteSubtask}
      />
    </div>
  )
}
