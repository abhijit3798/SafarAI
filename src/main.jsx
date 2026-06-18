import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clear any stored API keys on startup to ensure completely API-key-free offline execution
try {
  localStorage.removeItem('safar_ai_gemini_key');
  sessionStorage.removeItem('safar_ai_gemini_key');
} catch (e) {
  console.warn('[Storage] Failed to clear API key on startup:', e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register PWA Service Worker for offline support in production only
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('[PWA] Service Worker registered successfully:', reg.scope))
      .catch((err) => console.error('[PWA] Service Worker registration failed:', err));
  });
}

