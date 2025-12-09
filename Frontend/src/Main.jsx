import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Public/Index.css'
import Landing from './Components/Landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Landing />
    </>
  </StrictMode>,
)