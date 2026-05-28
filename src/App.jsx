import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false, subtasks: [] },
    ])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addSubtask = (taskId, text) => {
    setTasks(tasks.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: [...(task.subtasks ?? []), { id: Date.now(), text, completed: false }] }
        : task
    ))
  }

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.map((s) => s.id === subtaskId ? { ...s, completed: !s.completed } : s) }
        : task
    ))
  }

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId
        ? { ...task, subtasks: task.subtasks.filter((s) => s.id !== subtaskId) }
        : task
    ))
  }

  return (
    <div className="app">
      <h1 className="title">Task Board</h1>
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
