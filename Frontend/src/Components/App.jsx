import Add from "./Add";
import Info from "./Info";
import Home from "./Home";
import Trips from "./Trips";
import Landing from "./Landing";
import AuthRedirect from "./AuthRedirect";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
    return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/redirect" element={<AuthRedirect />} />
        <Route path="/info" element={<ProtectedRoute> <Info /> </ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute> }/>
        <Route path="/add" element={<ProtectedRoute> <Add /> </ProtectedRoute> }/>
        <Route path="/trips" element={<ProtectedRoute> <Trips /> </ProtectedRoute>}/>
    </Routes>
    );
}