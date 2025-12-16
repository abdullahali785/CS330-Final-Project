import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthContext";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
