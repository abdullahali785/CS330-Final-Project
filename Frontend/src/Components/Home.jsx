// Main page with all the cards 
import { useState } from "react";
import car from "../Assets/Car.png";
import Header from "./Header";

export default function Home() {
    // const [trips, setTrips] = useState([]);
    // 
    // useEffect(() => {
    //     fetch("http://localhost:8080/api/forms") // API URL to get all trips
    //     .then(res => res.json())
    //     .then(data => setTrips(data))
    //     .catch(err => console.error(err));
    // }, []);

    const [trips, setTrips] = useState([
    {
        id: 1,
        origin: "Decorah, IA",
        destination: "Rochester, MN",
        date: "12/19/25",
        time: "17:00",
        notes: "No pets allowed!",
        seats: 2
    },
    {
        id: 2,
        origin: "Decorah, IA",
        destination: "Minneapolis, MN",
        date: "12/13/25",
        time: "09:30",
        notes: "None",
        seats: 3
    }, 
    {
        id: 3,
        origin: "Decorah, IA",
        destination: "New York, NY",
        date: "11/03/25",
        time: "19:30",
        notes: "",
        seats: 5
    }
    ]);

    const sendData = (trip) => {
        const requesterId = 1; // This will change later to actual requester ID
        const data = {
            requesterId,
            tripId: trip.id
        };
        console.log("Sending request:", data);

        // fetch("http://localhost:8080/api/requests", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data)
        // });
    };

    return (
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

                            <div className="d-flex justify-content-center gap-4">
                                <p className="card-text md-0">Seats: {trip.seats}</p>
                                {trip.notes && trip.notes !== "None" ? (<p className="card-text mb-0">Notes: {trip.notes}</p>) : (<p className="card-text mb-0">No special requirements</p>)}
                            </div>

                            <div className="d-flex justify-content-center align-items-center"> 
                                <p className="text-body-secondary fw-bold">{formatDate(trip.date)}&nbsp;</p> 
                                <p className="text-body-secondary fw-bold">at {trip.time}</p> 
                            </div>  
                            
                            <div className="d-flex justify-content-center align-items-center"> 
                                <div className="btn-group">
                                    <button type="button" onClick={() => sendData(trip)} className="btn btn-success fw-bold">Request</button>
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