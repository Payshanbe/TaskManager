# Task Manager Pro

Production-ready Task Manager / To-Do app built with React + Vite.

## Live Features

- Add, edit, delete tasks
- Task fields: title, description, due date, priority (High / Medium / Low)
- Mark task as completed / active
- Filter: All / Completed / Active
- Search by title or description
- Drag and drop between columns: Todo / In Progress / Done
- Dark / light mode toggle
- Toast notifications (add / edit / delete)
- Persistence via localStorage (`useLocalStorage` custom hook)

## Stack

- React 19 (functional components + hooks)
- React Router
- Context API
- Tailwind CSS v4
- react-hot-toast
- Vite

## Project Structure

```text
src/
  components/
    Header.jsx
    Footer.jsx
    ThemeToggle.jsx
    Filters.jsx
    TaskForm.jsx
    TaskItem.jsx
    TaskList.jsx
  context/
    TaskContext.jsx
  hooks/
    useLocalStorage.js
  pages/
    TaskBoardPage.jsx
    AboutPage.jsx
  App.jsx
  main.jsx
  index.css
.github/
  workflows/
    ci.yml
```

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Cloudflare Deploy (Wrangler)

This project is configured for `npx wrangler deploy` via `wrangler.jsonc`.

1. Build the project:
```bash
npm run build
```

2. Deploy:
```bash
npx wrangler deploy
```

Note: static assets are deployed from `dist`, and SPA fallback is enabled for React Router routes.

## GitHub Setup

1. Initialize git (if needed):
```bash
git init
git branch -M main
```

2. Commit:
```bash
git add .
git commit -m "Initial commit: Task Manager Pro"
```

3. Create empty GitHub repo, then connect and push:
```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) builds the app on every push/PR to `main` or `master`.

## License

MIT (`LICENSE`)
