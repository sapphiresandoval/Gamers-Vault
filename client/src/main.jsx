import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      {/* <UserProvider> */}
        <App />
      {/* </UserProvider> */}
    </StrictMode>
  </BrowserRouter>
)
