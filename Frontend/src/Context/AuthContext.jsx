import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
        try {
            const res = await fetch("https://codec.luther.edu:5000/auth/me", {
                credentials: "include"
            });

            if (!res.ok) {
                setUser(null);
                return;
            }
            const data = await res.json();

            // Normalize user object
            if (!data || !data.id) {
                setUser(null);
                return;
            }

            setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                hasCar:
                    data.hasCar === true
                    ? true
                    : data.hasCar === false
                    ? false
                    : null
            });
        } catch (err) {
            console.error("Auth load failed", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
        }

        loadUser();
    }, []);

    const logout = () => {
        setUser(null);
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