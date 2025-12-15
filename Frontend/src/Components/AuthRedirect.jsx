import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function AuthRedirect() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/", { replace: true });
        } else if (user.hasCar === null) {
            navigate("/info", { replace: true });
        } else {
            navigate("/home", { replace: true });
        }
    }, [user, loading, navigate]);

    return null;
}
