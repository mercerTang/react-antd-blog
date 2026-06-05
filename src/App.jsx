import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './components/HomePage'
import logger from './utils/logger'
import './App.css'

function App() {
  useEffect(() => {
    const handleError = (error) => {
      logger.error('全局错误捕获', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('未处理的Promise拒绝', {
        reason: event.reason,
        timestamp: new Date().toISOString()
      })
    })

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}

export default App
