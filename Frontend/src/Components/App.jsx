import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Info from "./Info";
import Home from "./Home";
import Add from "./Add";
import Trips from "./Trips";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/info" element={<Info />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
  );
}