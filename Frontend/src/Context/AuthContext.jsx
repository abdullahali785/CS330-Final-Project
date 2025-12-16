import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
            // const BASE_URL = "https://cs330-final-project.onrender.com/api/v1/";
            window.location.href = "https://cs330-final-project-m34n.onrender.com/auth/logout";
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}