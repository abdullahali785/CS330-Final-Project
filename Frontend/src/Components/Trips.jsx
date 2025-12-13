// Takes user info (do you have a car or no etc)
// One view for a returing user, one for a new user
import { useState } from "react";
import Header from "./Header.jsx";
import car from "../Assets/Car.png";

export default function Trips() {
    let hasCar = true;
    const [trips, setTrips] = useState([
        {
            id: 1,
            origin: "Decorah, IA",
            destination: "Rochester, MN",
            date: "12/19/25",
            time: "17:00",
            requester: "Talha",
            status: "Waiting"
        },
        {
            id: 2,
            origin: "Decorah, IA",
            destination: "Minneapolis, MN",
            date: "12/13/25",
            time: "09:30",
            requester: "Abdullah",
            status: "Denied"
        }, 
        {
            id: 3,
            origin: "Decorah, IA",
            destination: "New York, NY",
            date: "11/03/25",
            time: "19:30",
            requester: "Hamza",
            status: "Approved"
        }
    ]);

    return (
    // <>
    // { hasCar ? 
    //     <p>User has a car. If he has added a trip, show reqs on that trip for him to approve or deny. If he has not added any trips, show no trips to show.</p>
    //     :
    //     <p>User does not have a car. Show him his sent reqs with their status. If he has no reqs, show no reqs.</p>
    // }
    // </>

    // Car Owners' View
    // <div>
    // <Header />
    // <div className="album py-5"> 
    //     <div className="container"> 
    //         {/* Row Start */}
    //         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
    //             {/* Card Start */}
    //             {trips.map(trip => (
    //             <div className="col"> 
    //                 <div className="card shadow-sm"> 
    //                     <img src={car} className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%"></img> 
    //                     <div className="card-body text-center"> 
    //                         <p className="card-text fw-bold">
    //                             {trip.origin}
    //                             &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>&nbsp;
    //                             {trip.destination}
    //                         </p>

    //                         <div className="d-flex justify-content-center align-items-center"> 
    //                             <p className="text-body-secondary fw-bold">{formatDate(trip.date)}&nbsp;</p> 
    //                             <p className="text-body-secondary fw-bold">at {trip.time}</p> 
    //                         </div>  

    //                         <div className="d-flex justify-content-center align-items-center"> 
    //                             <p className="text-body-secondary fw-bold">Requester: {trip.requester}</p> 
    //                         </div>  
                            
    //                         <div className="d-flex justify-content-center align-items-center"> 
    //                             <div className="btn-group gap-3"> 
    //                                 <button type="button" className="btn btn-success rounded-3 fw-bold">Approve</button>
    //                                 <button type="button" className="btn btn-danger rounded-3 fw-bold">Deny</button>
    //                             </div> 
    //                         </div> 
    //                     </div> 
    //                 </div> 
    //             </div>
    //             ))}
    //             {/* Card End */}
    //         </div> 
    //         {/* Row End */}
    //     </div> 
    // </div>
    // </div>

    // Requester View
    <div>
    <Header />
    <div className="album py-5"> 
        <div className="container"> 
            {/* Row Start */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
                {/* Card Start */}
                {trips.map(trip => (
                <div className="col"> 
                    <div className="card shadow-sm"> 
                        <img src={car} className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%"></img> 
                        <div className="card-body text-center"> 
                            <p className="card-text fw-bold">
                                {trip.origin}
                                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>&nbsp;
                                {trip.destination}
                            </p>

                            <div className="d-flex justify-content-center align-items-center"> 
                                <p className="text-body-secondary fw-bold">{formatDate(trip.date)}&nbsp;</p> 
                                <p className="text-body-secondary fw-bold">at {trip.time}</p> 
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                                <p className={`fw-bold ${getStatusClass(trip.status)}`}>Status: {trip.status}</p>
                            </div>
                            
                            {/* <div className="d-flex justify-content-center align-items-center"> 
                                <div className="btn-group gap-3"> 
                                    <button type="button" className="btn btn-success rounded-3 fw-bold">Approve</button>
                                    <button type="button" className="btn btn-danger rounded-3 fw-bold">Deny</button>
                                </div> 
                            </div>  */}
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

function formatDate(dateStr) {
    const [month, day, year] = dateStr.split("/").map(Number);

    const fullYear = year < 100 ? 2000 + year : year;
    const date = new Date(fullYear, month - 1, day);

    const dayNum = date.getDate();
    const suffix =
        dayNum % 10 === 1 && dayNum !== 11 ? "st" :
        dayNum % 10 === 2 && dayNum !== 12 ? "nd" :
        dayNum % 10 === 3 && dayNum !== 13 ? "rd" :
        "th";

    const monthName = date.toLocaleString("en-US", { month: "long" });
    return `${dayNum}${suffix} ${monthName}, ${date.getFullYear()}`;
}

function getStatusClass(status) {
  if (status === "Approved") return "text-success";
  if (status === "Denied") return "text-danger";
  return "text-dark";
}
