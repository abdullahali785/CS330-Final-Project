// Takes user info (do you have a car or no etc)
// One view for a returing user, one for a new user 
import Home from "./Home.jsx"

function Info() {
    let isAuthenticated = true;

    return (
    <>
    { isAuthenticated ? <Home /> :
        <div className="container-fluid text-center px-4 py-5 my-5">
            <div className="container">
                <h1 className="pb-2 display-4 fw-bold lh-1 text-body-emphasis">Abdullah, Welcome to RidePal!</h1>
                <h1 className="pb-2 display-5 fw-bolder lh-1 text-body-emphasis">Do you have a car?</h1>

                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch justify-content-center g-4 py-5"> 
                    <div className="col"> 
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" >
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"> 
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Yes, I do!</h3> 
                                <ul className="d-flex list-unstyled mt-auto"> 
                                    <li className="me-auto"> <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" /> </li> 
                                    <li className="d-flex align-items-center me-3"> <svg className="bi me-2" width="1em" height="1em" role="img" aria-label="Location"></svg> <small>Earth</small> </li> 
                                    <li className="d-flex align-items-center"> <svg className="bi me-2" width="1em" height="1em" role="img" aria-label="Duration"></svg> <small>3d</small> </li> 
                                </ul> 
                            </div> 
                        </div> 
                    </div>
                    <div className="col"> 
                        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" >
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"> 
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">No, not yet</h3> 
                                <ul className="d-flex list-unstyled mt-auto"> 
                                    <li className="me-auto"> <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" /> </li> 
                                    <li className="d-flex align-items-center me-3"> <svg className="bi me-2" width="1em" height="1em" role="img" aria-label="Location"></svg> <small>California</small> </li> 
                                    <li className="d-flex align-items-center"> <svg className="bi me-2" width="1em" height="1em" role="img" aria-label="Duration"></svg> <small>5d</small> </li> 
                                </ul> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div>
        </div>
    }
    </>
    )
}

export default Info