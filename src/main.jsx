import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { CoursesProvider } from './context/CoursesContext'
import { TasksProvider } from './context/TasksContext'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CoursesProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </CoursesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)