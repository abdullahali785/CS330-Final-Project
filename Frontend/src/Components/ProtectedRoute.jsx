import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
export default function ProtectedRoute({ children }) {
  const { user, setUser, loading, setLoading } = useAuth();
  // Still checking auth
  // if (loading) return null;
  
  if(!user){
    useEffect(() => {

        async function loadUser() {
        try {
            const res = window.location.href = "https://cs330-final-project.onrender.com/api/v1/me";
            console.log(res)

            // if (!res.ok) {
            //     setUser(null);
            //     return;
            // }
            const data = await res.json();
            console.log("data",data)
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
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
