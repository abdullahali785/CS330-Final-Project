import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check login status when app loads
    useEffect(() => {
        fetch("https://codec.luther.edu:5000/auth/me", {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook (important)
export function useAuth() {
    return useContext(AuthContext);
}
