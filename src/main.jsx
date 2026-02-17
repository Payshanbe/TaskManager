import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>,
)