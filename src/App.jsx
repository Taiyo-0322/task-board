import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

const USERS_KEY = 'task-board-users'
const CURRENT_USER_KEY = 'task-board-current-user'
const taskKey = (user) => `task-board-tasks-${user}`

const loadJSON = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState('login')
  const [users, setUsers] = useState(() => loadJSON(USERS_KEY, []))
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(CURRENT_USER_KEY) ?? null)
  const [tasks, setTasks] = useState([])

  // ログイン済みならそのままアプリへ
  useEffect(() => {
    if (currentUser) {
      setTasks(loadJSON(taskKey(currentUser), []))
      setView('app')
    }
  }, [])

  // タスク変更をlocalStorageに保存
  useEffect(() => {
    if (currentUser && view === 'app') {
      localStorage.setItem(taskKey(currentUser), JSON.stringify(tasks))
    }
  }, [tasks, currentUser, view])

  const handleLogin = (name) => {
    localStorage.setItem(CURRENT_USER_KEY, name)
    setCurrentUser(name)
    setTasks(loadJSON(taskKey(name), []))
    setView('app')
  }

  const handleRegister = (name) => {
    const updated = [...users, name]
    setUsers(updated)
    localStorage.setItem(USERS_KEY, JSON.stringify(updated))
    setView('login')
  }

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setCurrentUser(null)
    setTasks([])
    setView('login')
  }

  // ---------- タスク操作 ----------
  const addTask = (text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false, subtasks: [] }])
  }

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id !== id) return task
      const next = !task.completed
      return { ...task, completed: next, subtasks: (task.subtasks ?? []).map((s) => ({ ...s, completed: next })) }
    }))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const addSubtask = (taskId, text) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: [...(task.subtasks ?? []), { id: Date.now(), text, completed: false }] }
        : task
    ))
  }

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.map((s) => s.id === subtaskId ? { ...s, completed: !s.completed } : s) }
        : task
    ))
  }

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks((prev) => prev.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.filter((s) => s.id !== subtaskId) }
        : task
    ))
  }

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
        <div className="app-header__user">
          <span className="app-header__username">{currentUser}</span>
          <button className="logout-button" onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
      <TaskInput onAdd={addTask} />
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
