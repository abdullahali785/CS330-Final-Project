// Landing page. Has a log in option. Takes to OAuth
import tourists from "../Assets/Tourists.jpg"

function Landing() {
    return (
    <div > 
    <div className="container m-5" style={{backgroundImage: `url(${tourists})`}}> 
        <div className="row p-4 pb-5 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg"> 
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3"> 
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to RidePal!</h1> 
                <p className="py-2 lead">
                    Need a lift? Ride with a pal. Luther students helping Luther students get where they need to go. 
                    <br></br>Please sign in to explore functionality.
                </p> 
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"> 
                    <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Sign In</button> 
                </div>
            </div> 
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg"> 
                <img className="rounded-lg-3" src={tourists} alt="Car share image" width="720" /> 
            </div> 
        </div> 
    </div>
    </div>
    )
}

export default Landing