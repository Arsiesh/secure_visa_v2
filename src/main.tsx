import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// A lazy chunk that 404s (usually a redeploy renamed the hashed files) is fixed by a fresh load of the page.
// Reload once per tab session; if the reload does not clear the error, leave it to the error boundaries.
const RELOAD_FLAG = 'sv-preload-reload'
try {
  if (sessionStorage.getItem(RELOAD_FLAG)) {
    // Survived a reload without another failure for a while: re-arm the guard.
    window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_FLAG)
      } catch {
        // storage unavailable
      }
    }, 10_000)
  }
} catch {
  // storage unavailable
}
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return
    sessionStorage.setItem(RELOAD_FLAG, '1')
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
