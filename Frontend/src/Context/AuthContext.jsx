import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({"id": "108414919928955308855", "email": "abdullahali.3.3.2006@gmail.com", "name": "Abdullah", "hasCar": false});
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
            // const BASE_URL = "https://cs330-final-project.onrender.com/api/v1/";
            window.location.href = "https://codec.luther.edu:5000/auth/logout";
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