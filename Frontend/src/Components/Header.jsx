// Landing page. Has a log in option. Takes to OAuth

export default function Header() {
    return (
    <div className="container"> 
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"> 
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none fw-bold"><span className="fs-4">RidePal</span> </a> 
            <ul className="nav nav-pills"> 
                <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Add a Ride</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Trips</a></li> 
                <li className="nav-item"><a href="#" className="nav-link">Sign Out</a></li> 
            </ul> 
        </header> 
    </div>
    )
}