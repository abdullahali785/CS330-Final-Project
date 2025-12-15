// Landing page. Has a log in option. Takes to OAuth
import { useNavigate } from "react-router-dom";
import tourists from "../Assets/Tourists.jpg"

export default function Landing() {
    const navigate = useNavigate();
    const handleSignIn = () => {
        // Sign In -> OAuth -> DB Check -> If exists: Load Home, Else: Register User and Load Info
        window.location.href = "https://codec.luther.edu:5000/auth/login";
    };

    return (
    <div style={{backgroundImage: `url(${tourists})`, minHeight: "100vh", width: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: "flex", alignItems: "center", justifyContent: "center"}}>
    <div className="container">
        <div className="row p-5 pe-lg-0 pt-lg-5 align-items-center rounded-3 shadow-lg " style={{ transform: "translateY(-100px)" }}>
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to RidePal!</h1>
                <p className="py-2 lead">
                    Need a lift? Ride with a pal. Luther students helping Luther students get where they need to go.
                    <br />
                    Please sign in to explore functionality.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <button type="button" onClick={handleSignIn} className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Sign In</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}