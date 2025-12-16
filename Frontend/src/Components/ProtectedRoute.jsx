import { Navigate, useSearchParams,Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
export default function ProtectedRoute({ children }) {
  const { user, setUser} = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  
useEffect(() => {
    if(sessionStorage.getItem("userId")=='null' || sessionStorage.getItem("userId")==null){
        sessionStorage.setItem("userId",searchParams.get("userId"))
      }
      if(!user){
        async function loadUser() {
        try {
            const res = await fetch("https://codec.luther.edu:5000/api/v1/user", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: sessionStorage.getItem("userId")
                })
            });
            const data = await res.json();
            // Normalize user object
            if (data.error) {
                setUser(null);
                window.location.href = "http://localhost:5173"
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
        } 
        }

        loadUser();
      }
      
    }, []);

  if(sessionStorage.getItem("userId")==null ||sessionStorage.getItem("userId")=='null'){
    <Navigate to="/"/>
  }

  return <Outlet />
}
