// Main page with all the cards 
import car from "../Assets/Car.png";
import Header from "./Header";

export default function Home() {
    const count = 3;

    return (
    <div>
    <Header />
    <div class="album py-5"> 
        <div class="container"> 
            {/* Row Start */}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
                {/* Card Start */}
                {Array.from({ length: count }).map((_, i) => (
                <div class="col"> 
                    <div class="card shadow-sm"> 
                        <img src={car} class="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%"></img> 
                        <div class="card-body text-center"> 
                            <p class="card-text fw-bold">
                                Decorah, IA
                                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>&nbsp;
                                Rochester, MN
                            </p>

                            <p class="card-text">Notes: No pets allowed!</p> 

                            <div class="d-flex justify-content-center align-items-center"> 
                                <p class="text-body-secondary fw-bold">12th December, 2025&nbsp;</p> 
                                <p class="text-body-secondary fw-bold">at 5:00 PM</p> 
                            </div>  
                            
                            <div class="d-flex justify-content-center align-items-center"> 
                                <div class="btn-group"> 
                                    <button type="button" class="btn btn-success fw-bold">Request</button> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div>
                ))}
                {/* Card End */}
            </div> 
            {/* Row End */}
        </div> 
    </div>
    </div>
    )
}