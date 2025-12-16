import Add from "./Add";
import Info from "./Info";
import Home from "./Home";
import Trips from "./Trips";
import Landing from "./Landing";
import AuthRedirect from "./AuthRedirect";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/redirect" element={<AuthRedirect />} />
        <Route path="/info" element={<Info /> }/>
        <Route path="/home" element={<Home /> }/>
        <Route path="/add" element={ <Add /> }/>
        <Route path="/trips" element={<Trips /> }/>
    </Routes>
    );
}