import React, { useState } from "react";
import Header from "./Header";
import { useAuth } from "../Context/AuthContext";

export default function Add() {
    // const BASE_URL = "https://cs330-final-project.onrender.com/api/v1/";
    const BASE_URL = "https://codec.luther.edu:5000/api/v1/";
    const { user , setUser } = useAuth();

    const [form, setForm] = useState({
        userId: user.id,
        origin: "",
        destination: "",
        date: "",
        time: "",
        seatsAvailable: 1,
        notes: "",
    });

    const [touched, setTouched] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]: name === "seats" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleBlur = (e) => {
        setTouched((t) => ({ ...t, [e.target.name]: true }));
    };

    const validate = () => {
        const errors = {};
        if (!form.origin.trim()) errors.origin = "Origin is required.";
        if (!form.destination.trim()) errors.destination = "Destination is required.";
        if (!form.date) errors.date = "Departure date is required.";
        if (!form.time) errors.time = "Departure time is required.";
        if (form.seatsAvailable === "" || form.seatsAvailable == null) errors.seatsAvailable = "Number of people is required.";
        else if (Number.isNaN(form.seatsAvailable) || form.seatsAvailable < 1 || form.seatsAvailable > 7) {
        errors.seatsAvailable = "Must be a number between 1 and 7.";
        }
        return errors;
    };

    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!isValid) return;

        const trip = {
            userId: user.id, // This will change later to actual car owner's ID
            origin: form.origin.trim(),
            destination: form.destination.trim(),
            date: form.date,
            time: form.time,
            seatsAvailable: form.seatsAvailable,
            notes: form.notes.trim() || null
        };

        try {
            const res = await fetch(`${BASE_URL}submitForm`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trip),
                credentials: "include"
            });
            console.log(res.json())

            // if (!res.ok) {
            //     throw new Error("Failed to create trip");
            // }
            console.log("Trip created:", trip);

            // Reset form
            // setForm({
            //     origin: "",
            //     destination: "",
            //     date: "",
            //     time: "",
            //     seatsAvailable: 1,
            //     notes: ""
            // });
            // setSubmitAttempted(false);
            // setTouched({});

        } catch (err) {
            console.error(err);
            // alert("Could not create trip. Please try again.");
        }
    };
    const showInvalid = (field) => Boolean((touched[field] || submitAttempted) && errors[field]);

    return (
    <div>
    <Header />
    <div className="container my-4">
        <form className="px-3" noValidate onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="origin" className="form-label fw-bold">Origin</label>
                    <input
                        id="origin"
                        name="origin"
                        type="text"
                        className={`form-control ${showInvalid("origin") ? "is-invalid" : ""}`}
                        value={form.origin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby="originHelp"
                    />
                    <div className="invalid-feedback">{errors.origin}</div>
                    <div id="originHelp" className="form-text">e.g. Decorah, IA</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="destination" className="form-label fw-bold">Destination</label>
                    <input
                        id="destination"
                        name="destination"
                        type="text"
                        className={`form-control ${showInvalid("destination") ? "is-invalid" : ""}`}
                        value={form.destination}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className="invalid-feedback">{errors.destination}</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="date" className="form-label fw-bold">Departure Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        className={`form-control ${showInvalid("date") ? "is-invalid" : ""}`}
                        value={form.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className="invalid-feedback">{errors.date}</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="time" className="form-label fw-bold">Departure Time</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        className={`form-control ${showInvalid("time") ? "is-invalid" : ""}`}
                        value={form.time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className="invalid-feedback">{errors.time}</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="seatsAvailable" className="form-label fw-bold">Number of people that can come</label>
                    <input
                        id="seatsAvailable"
                        name="seatsAvailable"
                        type="number"
                        className={`form-control ${showInvalid("seatsAvailable") ? "is-invalid" : ""}`}
                        value={form.seatsAvailable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min={1}
                        max={7}
                        required
                        aria-describedby="seatsHelp"
                    />
                    <div className="invalid-feedback">{errors.seatsAvailable}</div>
                    <div id="seatsHelp" className="form-text">Enter a number between 1 and 7.</div>
                </div>

                <div className="col-12">
                    <label htmlFor="notes" className="form-label fw-bold">Notes (optional)</label>
                    <textarea
                        id="notes"
                        name="notes"
                        className="form-control"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any extra information (optional)"
                    />
                </div>

                <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary fw-bold">Create Trip</button>
                </div>
            </div>
        </form>
    </div>
    </div>
  );
}