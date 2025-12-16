// Main page with all the cards 
import Header from "./Header";
import { use, useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Home() {
    // const BASE_URL = "https://cs330-final-project.onrender.com/api/v1/";
    const BASE_URL = "https://codec.luther.edu:5000/api/v1/";
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [form, setForm] = useState({})
    const [reqTrips,setReqTrips] = useState({})
    const [requestedTrips, setRequestedTrips] = useState(new Set());

     useEffect(()=>{

        if (user && user.hasCar) {
            setForm({ creatorId:user.id })
        } else if(user && !user.hasCar){
            setForm({ requestorId:user.id })
        }
    }, [user])

    useEffect(() => {
        // if (!user) return;

        fetch(`${BASE_URL}forms`, {
            credentials: "include",
        })
        .then(res => res.json())
        .then(data => {
            setTrips(data);
        })
        .catch(err => {
            console.error("Failed to fetch trips", err);
        });

        
        fetch(`${BASE_URL}allRequests`, {
            credentials: "include",
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
            
        })
        .then(res => res.json())
        .then(data => {
            setReqTrips(data);
        })
        .catch(err => {
            console.error("Failed to fetch trips", err);
        });
    }, [user]);

    const sendData = async (trip) => {
        if (
            !user ||
            trip.creatorId === user.id ||
            trip.seatsAvailable === 0 ||
            requestedTrips.has(trip.id)
        ) return;

        const data = {
            requestorId: user.id,
            formId: trip.id
        };

        try {
            await fetch(`${BASE_URL}requestToJoin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });
            setRequestedTrips(prev => new Set(prev).add(trip.id));
        } catch (err) {
            console.error("Failed to send request", err);
        }
    };

    return user? (
    <div>
    <Header />
    <div className="album py-5"> 
        <div className="container"> 
            {/* Row Start */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
                {/* Card Start */}

                {/* design here for no trips */}
                {trips.length==0 && <div>No trips at this time</div>}
                {/* end */}

                {trips.map(trip => (
                <div className="col" key={trip.id}> 
                    <div className="card shadow-sm" >
                        <img src="/Car.png"></img>
                        <div className="card-body text-center"> 
                            <p className="card-text fw-bold">
                                {trip.origin ?? "Decorah, IA"}
                                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>&nbsp;
                                {trip.destination ?? "Unkown Destination"}
                            </p>

                            <div className="d-flex justify-content-center gap-4">
                                <p className="card-text md-0">Seats: {trip.seatsAvailable ?? 0}</p>
                                {trip.notes && trip.notes !== "None" ? (<p className="card-text mb-0">Notes: {trip.notes}</p>) : (<p className="card-text mb-0">No special requirements</p>)}
                            </div>

                            <div className="d-flex justify-content-center align-items-center"> 
                                <p className="text-body-secondary fw-bold">{trip.date}&nbsp;</p> 
                                <p className="text-body-secondary fw-bold">at {trip.time}</p> 
                            </div>  
                            
                            <div className="d-flex justify-content-center align-items-center"> 
                                <div className="btn-group">
                                    <button type="button" onClick={() => sendData(trip)} className="btn btn-success fw-bold" disabled={trip.creatorId === user.id || trip.seatsAvailable === 0 || requestedTrips.has(trip.id)}>
                                        {requestedTrips.has(trip.id) ? "Requested" : trip.seatsAvailable === 0 ? "Full" : "Request"}
                                    </button>
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
    ):""
}

// function formatDate(dateStr) {
//     const [month, day, year] = dateStr.split("/").map(Number);

//     const fullYear = year < 100 ? 2000 + year : year;
//     const date = new Date(fullYear, month - 1, day);

//     const dayNum = date.getDate();
//     const suffix =
//         dayNum % 10 === 1 && dayNum !== 11 ? "st" :
//         dayNum % 10 === 2 && dayNum !== 12 ? "nd" :
//         dayNum % 10 === 3 && dayNum !== 13 ? "rd" :
//         "th";

//     const monthName = date.toLocaleString("en-US", { month: "long" });
//     return `${dayNum}${suffix} ${monthName}, ${date.getFullYear()}`;
// }