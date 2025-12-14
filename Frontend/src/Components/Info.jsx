// Takes user info (do you have a car or no etc)
// One view for a returing user, one for a new user 
import { useNavigate } from "react-router-dom";

export default function Info() {
    const navigate = useNavigate();
    const handleSignIn = () => {
        // Get userId -> Get hasCar information -> Update DB -> Load Home
        navigate("/home")
    };
    let isAuthenticated = false;

    return (
    <>
    { isAuthenticated ? navigate("/home") :
    <div className="container-fluid text-center px-4 py-5 my-5">
        <div className="container">
            <h1 className="pb-2 display-4 fw-bold lh-1 text-body-emphasis">Abdullah, Welcome to RidePal!</h1>
            <h1 className="pb-2 display-5 fw-bolder lh-1 text-body-emphasis">Do you have a car?</h1>

            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch justify-content-center g-4 py-5"> 
                <div className="col">
                    <div className="card h-100 rounded-4 shadow-lg border-0 p-5">
                        <button onClick={handleSignIn} className="btn card-btn yes-btn h-100 d-flex flex-column justify-content-center align-items-center rounded-4 p-5">
                            <span className="display-6 fw-bold">Yes, I do!</span>
                        </button>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 rounded-4 shadow-lg border-0 p-5">
                        <button onClick={handleSignIn} className="btn card-btn no-btn h-100 d-flex flex-column justify-content-center align-items-center rounded-4 p-5">
                            <span className="display-6 fw-bold">No, not yet</span>
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    }
    </>
    )
}