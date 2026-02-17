import { useMemo, useState } from 'react'
import Filters from '../components/Filters.jsx'
import TaskForm from '../components/TaskForm.jsx'
import TaskList from '../components/TaskList.jsx'
import { useTasks } from '../context/TaskContext.jsx'

function TaskBoardPage() {
  const {
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    moveTask,
    statusOptions,
  } = useTasks()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const summary = useMemo(() => {
    const total = filteredTasks.length
    const completed = filteredTasks.filter((task) => task.completed).length
    const active = total - completed

    return { total, completed, active }
  }, [filteredTasks])

  const openCreateModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSubmit = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData)
    } else {
      addTask(formData)
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Your Task Workspace</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track tasks by status and drag cards between columns.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            + New Task
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryCard label="Total" value={summary.total} />
          <SummaryCard label="Completed" value={summary.completed} />
          <SummaryCard label="Active" value={summary.active} />
        </div>
      </section>

      <Filters />

      <TaskList
        tasks={filteredTasks}
        statuses={statusOptions}
        onEdit={openEditModal}
        onDelete={deleteTask}
        onToggleComplete={toggleTaskCompletion}
        onMoveTask={moveTask}
      />

      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialTask={editingTask}
      />
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </article>
  )
}

export default TaskBoardPage