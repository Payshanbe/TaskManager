import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TaskContext = createContext(null)

const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Plan weekly sprint',
    description: 'Collect tasks from team and confirm priorities for the week.',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'High',
    status: STATUS.TODO,
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('task-manager-tasks', initialTasks)
  const [theme, setTheme] = useLocalStorage('task-manager-theme', 'light')
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const addTask = (taskInput) => {
    const timestamp = Date.now()
    const newTask = {
      id: crypto.randomUUID(),
      title: taskInput.title.trim(),
      description: taskInput.description.trim(),
      dueDate: taskInput.dueDate,
      priority: taskInput.priority,
      status: STATUS.TODO,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    setTasks((prev) => [newTask, ...prev])
    toast.success('Task added successfully')
  }

  const updateTask = (taskId, taskInput) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: taskInput.title.trim(),
              description: taskInput.description.trim(),
              dueDate: taskInput.dueDate,
              priority: taskInput.priority,
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
    toast.success('Task updated successfully')
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    toast.success('Task deleted')
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task

        const completed = !task.completed
        return {
          ...task,
          completed,
          status: completed ? STATUS.DONE : STATUS.TODO,
          updatedAt: Date.now(),
        }
      }),
    )
  }

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task

        return {
          ...task,
          status: newStatus,
          completed: newStatus === STATUS.DONE,
          updatedAt: Date.now(),
        }
      }),
    )
  }

  const filteredTasks = useMemo(() => {
    const lowered = searchQuery.toLowerCase().trim()

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'All' || (filter === 'Completed' ? task.completed : !task.completed)

      const matchesSearch =
        !lowered ||
        task.title.toLowerCase().includes(lowered) ||
        task.description.toLowerCase().includes(lowered)

      return matchesFilter && matchesSearch
    })
  }, [tasks, filter, searchQuery])

  const value = {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    theme,
    setTheme,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    moveTask,
    statusOptions: STATUS,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }

  return context
}