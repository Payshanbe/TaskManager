import { useMemo } from 'react'
import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, statuses, onEdit, onDelete, onToggleComplete, onMoveTask }) {
  const groupedTasks = useMemo(
    () => ({
      [statuses.TODO]: tasks.filter((task) => task.status === statuses.TODO),
      [statuses.IN_PROGRESS]: tasks.filter((task) => task.status === statuses.IN_PROGRESS),
      [statuses.DONE]: tasks.filter((task) => task.status === statuses.DONE),
    }),
    [tasks, statuses],
  )

  const handleDrop = (event, status) => {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('text/plain')
    if (taskId) {
      onMoveTask(taskId, status)
    }
  }

  const columns = [
    { key: statuses.TODO, label: 'Todo' },
    { key: statuses.IN_PROGRESS, label: 'In Progress' },
    { key: statuses.DONE, label: 'Done' },
  ]

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <div
          key={column.key}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, column.key)}
          className="min-h-64 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              {column.label}
            </h2>
            <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-semibold dark:bg-slate-700">
              {groupedTasks[column.key].length}
            </span>
          </header>

          <div className="space-y-3">
            {groupedTasks[column.key].map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                onDragStart={(event, taskId) => {
                  // Store task ID so the drop zone can update status.
                  event.dataTransfer.setData('text/plain', taskId)
                }}
              />
            ))}
            {!groupedTasks[column.key].length && (
              <p className="rounded-lg border border-dashed border-slate-300 p-3 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Drop a task here
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

export default TaskList