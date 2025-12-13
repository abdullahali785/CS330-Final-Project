// Takes user info (do you have a car or no etc)
// One view for a returing user, one for a new user 
import Home from "./Home.jsx"

export default function Trips() {
    let hasCar = true;

    return (
    <>
    { hasCar ? 
        <p>User has a car. If he has added a trip, show reqs on that trip for him to approve or deny. If he has not added any trips, show no trips to show.</p>
        :
        <p>User does not have a car. Show him his sent reqs with their status. If he has no reqs, show no reqs.</p>
    }
    </>
    )
}