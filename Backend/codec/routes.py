from flask import Blueprint, abort, current_app, flash, redirect, render_template, request, url_for
from werkzeug.wrappers import Response
from .database.models import Forms, Users, Requests

from werkzeug.utils import secure_filename
import pathlib
import uuid
from codec import db
import json
# from ..database.models import db, Production, Role, Student, CastAssignment, Song, CreativeTeamMember, CrewAssignment, Acknowledgement

# from .retrieval import get_data_from_db

main = Blueprint("main", __name__, url_prefix="/api/v1")


@main.route('/')
def home():
    return json.dumps({"message": "Welcome to the Shuttlr API"}), 200

@main.route('/forms', methods=['GET'])
def forms():
    forms = db.session.query(Forms).all()
    forms_data = [
        {column.name: getattr(form, column.name) for column in form.__table__.columns}
        for form in forms
    ]
    return json.dumps(forms_data), 200

@main.route('/submitForm', methods=['POST'])
def submit_form():
    if not request.method == 'POST':
        return json.dumps({"error": "Invalid request method"}), 400
    
    userId = request.form["userId"]
    origin = request.form["origin"]
    destination = request.form["destination"]
    date = request.form["date"]
    time = request.form["time"]
    seatsAvailable = request.form["seatsAvailable"]
    notes = request.form["notes"]
    print(f"Received form submission: {userId}, {origin}, {destination}, {date}, {time}, {seatsAvailable}, {notes}")
    new_form = Forms(
        id=str(uuid.uuid4()),
        origin=origin,
        destination=destination,
        date=date,
        time=time,
        seatsAvailable=int(seatsAvailable),
        notes=notes
    )
    db.session.add(new_form)
    db.session.commit()
    flash("Form submitted successfully", "success")
    print("Form submitted successfully")
    return json.dumps({"message": "Form submitted successfully"}), 200


@main.route('/allrequests', methods=['GET'])
def all_requests():
    requests = db.session.query(Requests).all()
    requests_data = [
        {column.name: getattr(req, column.name) for column in req.__table__.columns}
        for req in requests
    ]
    return json.dumps(requests_data), 200

@main.route('/requestToJoin', methods=['POST'])
def requests():
    if not request.method == 'POST':
        return json.dumps({"error": "Invalid request method"}), 400
    
    requestorId = request.form["requestorId"]
    formId = request.form["formId"]
    print(f"Received join request: {requestorId}, {formId}")
    new_request = Requests(
        id=str(uuid.uuid4()),
        requestorId=requestorId,
        formId=formId,
        status="pending"
    )
    db.session.add(new_request)
    db.session.commit()
    flash("Request to join submitted successfully", "success")
    print("Request to join submitted successfully")
    return json.dumps({"message": "Request to join submitted successfully"}), 200

@main.route('/acceptRequest', methods=['POST'])
def accept_request():
    request_id = request.form['requestId']
    join_request = db.session.query(Requests).filter_by(id=request_id).first()
    form = db.session.query(Forms).filter_by(id=join_request.formId).first()
    if not join_request:
        return json.dumps({"error": "Request not found"}), 404
    
    join_request.status = "approved"
    form.seatsAvailable -= 1
    db.session.commit()
    return json.dumps({"message": "Request approved successfully"}), 200