import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Components/Landing.jsx'
import Info from './Components/Info.jsx'
import Add from './Components/Add.jsx'
import Trips from './Components/Trips.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <>
        <Landing />
        <Info />
        <Add />
        <Trips />
        </>
    </StrictMode>,
)