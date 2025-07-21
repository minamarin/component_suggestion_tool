import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the styles:
import '@visa/nova-styles/styles.css';
// Import your desired theme:
import '@visa/nova-styles/themes/visa-light/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode> 
  ) 