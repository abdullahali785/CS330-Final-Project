import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Public/Index.css'
import Landing from './Components/Landing.jsx'
import Info from './Components/Info.jsx'
import Home from './Components/Home.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <>
        <Home />
        <Landing />
        <Info />
        </>
    </StrictMode>,
)