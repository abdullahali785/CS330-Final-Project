// Takes user info (do you have a car or no etc)
import { useState } from "react";
import Header from "./Header.jsx";
import car from "../Assets/Car.png";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

export default function Trips() {
    // const BASE_URL = "https://cs330-final-project.onrender.com/api/v1/";
    const BASE_URL = "https://codec.luther.edu:5000/api/v1/";
    const { user , setUser } = useAuth()
    const [form, setForm] = useState({})

    if (!user) return null;
    const hasCar = user.hasCar === true;

    useEffect(()=>{
        if (!user) return null;

        if (user.hasCar) {
            setForm({ creatorId:user.id })
        } else{
            setForm({ creatorId:user.id })
        }
    }, [user])
    
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        if (!form.creatorId && !form.requestorId) return;

        fetch(`${BASE_URL}allRequests`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(form),
        })
        // console.log(form)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log("trips:", data);
            setTrips(data);
        })
        .catch(err => console.error(err));
    }, [form]);


    // Data we get from allRequests
    // {
    //     id
    //     requestorId
    //     formId
    //     status
    // }

    // Get trip data 
    // {
    //     id
    //     origin
    //     destination
    //     date
    //     time 
    // }

    // Get user data
    // {
    //     id
    //     name 
    //     email
    // }

    // Build final data array
    // {
    //     request.id
    //     trip.origin
    //     trip.destination
    //     trip.date
    //     trip.time
    //     user.requester
    //     user.contact
    //     request.status
    // }

    const approveReq = async (trip) => {
        if (!user) return;
        const data = {tripId: trip.id, creatorId: user.id};

        try {
            await fetch(`${BASE_URL}acceptRequest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });
            setTrips(prev =>
                prev.map(t =>
                    t.id === trip.id
                    ? { ...t, status: "Approved", contact: trip.contact || user.email }
                    : t
                )
            );
        } catch (err) {
            console.error("Failed to approve request", err);
        }
    };

    const denyReq = async (trip) => {
        if (!user) return;
        const data = {tripId: trip.id, creatorId: user.id};

        try {
            await fetch(`${BASE_URL}denyRequest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });

            setTrips(prev =>
                prev.map(t =>
                    t.id === trip.id
                    ? { ...t, status: "Denied" }
                    : t
                )
            );
        } catch (err) {
            console.error("Failed to deny request", err);
        }
    };

    return (
    // Car Owners' View
    <div>
    <Header />
    <div className="album py-5"> 
        <div className="container"> 
            {/* Row Start */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
                {/* Card Start */}
                {trips.map(trip => (
                <div className="col" key={trip.id}>
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

                            {hasCar ? ( <>
                                <div className="d-flex justify-content-center align-items-center"> 
                                    <p className="text-body-secondary fw-bold">Requester: {trip.requester}</p> 
                                </div>  
                                
                                <div className="d-flex justify-content-center align-items-center"> 
                                    <div className="btn-group gap-3"> 
                                        <button type="button" onClick={() => approveReq(trip)} className="btn btn-success rounded-3 fw-bold" disabled={trip.status !== "Waiting"}>Approve</button>
                                        <button type="button" onClick={() => denyReq(trip)} className="btn btn-danger rounded-3 fw-bold" disabled={trip.status !== "Waiting"}>Deny</button>
                                    </div> 
                                </div>
                            </>) : (<>
                                <div className="d-flex flex-column align-items-center">
                                    <p className={`fw-bold mb-1 ${getStatusClass(trip.status)}`}>Status: {trip.status}</p>
                                    {trip.status === "Approved"
                                        ? (<p className="fw-bold mb-0">Contact: {trip.contact}</p>) 
                                        : (<p className="fw-bold mb-0 invisible">Contact</p>)
                                    }
                                </div>
                            </>)}
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
    status = status.toLowerCase()
    if (status === "approved") return "text-success";
    if (status === "denied") return "text-danger";
    
    return "text-dark";
}
