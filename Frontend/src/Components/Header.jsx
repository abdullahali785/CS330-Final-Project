import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        window.location.href = "https://codec.luther.edu:5000/auth/logout";
    };

    return (
    <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none fw-bold fs-4" style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>RidePal</span>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button className="nav-link active fw-bold" onClick={() => navigate("/add")}>Add a Ride</button>
                </li>

                <li className="nav-item">
                    <button className="nav-link fw-bold" onClick={() => navigate("/trips")}>Trips</button>
                </li>

                <li className="nav-item">
                    <button className="nav-link text-danger fw-bold" onClick={handleSignOut}>Sign Out</button>
                </li>
            </ul>
        </header>
    </div>
  );
}
