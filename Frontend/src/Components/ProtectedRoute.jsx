import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Still checking auth
  if (loading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
