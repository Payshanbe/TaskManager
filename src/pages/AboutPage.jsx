function AboutPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-bold">About This App</h2>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        This task manager is built with React functional components, hooks, Context API, React Router,
        Tailwind CSS, and localStorage persistence. You can add, edit, delete, search, filter, and drag
        tasks across Todo, In Progress, and Done columns.
      </p>
    </section>
  )
}

export default AboutPage