// Main page with all the cards 
function Home() {
    return (
        <div>
            <div class="container"> 
                <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"> 
                    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"><span class="fs-4">RideShare</span> </a> 
                    <ul class="nav nav-pills"> 
                        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li> 
                        <li class="nav-item"><a href="#" class="nav-link">Add a ride</a></li> 
                        <li class="nav-item"><a href="#" class="nav-link">Trips</a></li> 
                        <li class="nav-item"><a href="#" class="nav-link">Sign Out</a></li> 
                    </ul> 
                </header> 
            </div>
        </div>
    )
}

export default Home