import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './Public/Index.css'
import Landing from './Components/Landing.jsx'
import Info from './Components/Info.jsx'
import Trip from './Components/Trip.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <>
        <Landing />
        <Info />
        {/* <Trip /> */}
        </>
    </StrictMode>,
)