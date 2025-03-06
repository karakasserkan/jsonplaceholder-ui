import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Projenin kendi CSS dosyası
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
