function TaskItem({ task, onEdit, onDelete, onToggleComplete, onDragStart }) {
  const priorityStyles = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  }

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task.id)}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold sm:text-base">{task.title}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{task.description}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Due: {task.dueDate}</span>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task.id)} />
          Completed
        </label>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskItem