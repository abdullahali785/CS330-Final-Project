import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./Landing";
import Info from "./Info";
import Home from "./Home";
import Add from "./Add";
import Trips from "./Trips";

export default function App() {
    return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/redirect" element={<AuthRedirect />} />
        <Route path="/info" element={<ProtectedRoute> <Info /> </ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/add" element={<ProtectedRoute> <Add /> </ProtectedRoute>}/>
        <Route path="/trips" element={<ProtectedRoute> <Trips /> </ProtectedRoute>}/>
    </Routes>
    );
}