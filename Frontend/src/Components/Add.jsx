import React, { useState } from "react";
import Header from "./Header";

export default function Add({ onSubmit }) {
    const [form, setForm] = useState({
        origin: "",
        destination: "",
        departure_date: "",
        departure_time: "",
        seats: 1,
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
        if (!form.departure_date) errors.departure_date = "Departure date is required.";
        if (!form.departure_time) errors.departure_time = "Departure time is required.";
        if (form.seats === "" || form.seats == null) errors.seats = "Number of people is required.";
        else if (Number.isNaN(form.seats) || form.seats < 1 || form.seats > 7) {
        errors.seats = "Must be a number between 1 and 7.";
        }
        return errors;
    };

    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!isValid) {
        // focus first invalid field optionally
        const firstInvalid = Object.keys(errors)[0];
        const el = document.querySelector(`[name="${firstInvalid}"]`);
        if (el) el.focus();
        return;
        }

        // Build the trip object
        const trip = {
        origin: form.origin.trim(),
        destination: form.destination.trim(),
        departureDate: form.departure_date,
        departureTime: form.departure_time,
        seats: form.seats,
        notes: form.notes.trim() || null,
        };

        // replace this with an API call or prop callback
        if (onSubmit) onSubmit(trip);
        else console.log("Trip submitted:", trip);

        // Optionally reset form
        // setForm({ origin: "", destination: "", departure_date: "", departure_time: "", seats: 1, notes: "" });
        setSubmitAttempted(false);
        setTouched({});
    };

    const showInvalid = (field) =>
        Boolean((touched[field] || submitAttempted) && errors[field]);

    return (
    <div className="container my-4">
        <Header />
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
                    <label htmlFor="departure_date" className="form-label fw-bold">Departure date</label>
                    <input
                        id="departure_date"
                        name="departure_date"
                        type="date"
                        className={`form-control ${showInvalid("departure_date") ? "is-invalid" : ""}`}
                        value={form.departure_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className="invalid-feedback">{errors.departure_date}</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="departure_time" className="form-label fw-bold">Departure time</label>
                    <input
                        id="departure_time"
                        name="departure_time"
                        type="time"
                        className={`form-control ${showInvalid("departure_time") ? "is-invalid" : ""}`}
                        value={form.departure_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className="invalid-feedback">{errors.departure_time}</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="seats" className="form-label fw-bold">Number of people that can come</label>
                    <input
                        id="seats"
                        name="seats"
                        type="number"
                        className={`form-control ${showInvalid("seats") ? "is-invalid" : ""}`}
                        value={form.seats}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min={1}
                        max={7}
                        required
                        aria-describedby="seatsHelp"
                    />
                    <div className="invalid-feedback">{errors.seats}</div>
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
                    <button type="submit" className="btn btn-primary">Create Trip</button>
                </div>
            </div>
        </form>
    </div>
  );
}