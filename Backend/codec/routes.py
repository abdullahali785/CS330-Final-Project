from flask import Blueprint, flash, request
from .database.models import Forms, Users, Requests
import uuid
from codec import db
import json

main = Blueprint("main", __name__, url_prefix="/api/v1")


@main.route('/')
def home():
    return json.dumps({"message": "Welcome to the Shuttlr API"}), 200

@main.route('/info')
def info():
    #confirm if you have a car and edit the user db
    form = request.get_json()
    user_id = form["userId"]
    has_car = form["hasCar"]
    user = db.session.query(Users).filter(Users.id == user_id).first()
    if not user:
        return json.dumps({"error": "User not found"}), 404
    user.hasCar = has_car.lower() == 'true'
    db.session.commit()
    return json.dumps({"message": "User info updated successfully"}), 200

@main.route('/user', methods=['GET'])
def user():
    #Get user info from the database
    form = request.get_json()
    user_id = form["userId"]
    user = db.session.query(Users).filter(Users.id == user_id).first()
    if not user:
        return json.dumps({"error": "User not found"}), 404
    user_data = {column.name: getattr(user, column.name) for column in user.__table__.columns}
    return json.dumps(user_data), 200

@main.route('/users', methods=['GET'])
def users():
    #Get all users from the database
    users = db.session.query(Users).all()
    users_data = [
        {column.name: getattr(user, column.name) for column in user.__table__.columns}
        for user in users
    ]
    return json.dumps(users_data), 200

@main.route('/form', methods=['GET'])
def form():
    #Get form info from the database
    form = request.get_json()
    form_id = form["formId"]
    form = db.session.query(Forms).filter(Forms.id == form_id).first()
    if not form:
        return json.dumps({"error": "Form not found"}), 404
    form_data = {column.name: getattr(form, column.name) for column in form.__table__.columns}
    return json.dumps(form_data), 200

@main.route('/forms', methods=['GET'])
def forms():
    #Get all forms from the database
    forms = db.session.query(Forms).all()
    forms_data = [
        {column.name: getattr(form, column.name) for column in form.__table__.columns}
        for form in forms
    ]
    return json.dumps(forms_data), 200

@main.route('/submitForm', methods=['POST'])
def submit_form():
    # Handle form submission
    #Accept form data via POST request
    if not request.method == 'POST':
        return json.dumps({"error": "Invalid request method"}), 400
    
    #Extract form data
    form = request.get_json()
    userId = form["userId"]
    origin = form["origin"]
    destination = form["destination"]
    date = form["date"]
    time = form["time"]
    seatsAvailable = form["seatsAvailable"]
    notes = form["notes"]
    
    #Create new form entry
    new_form = Forms(
        id=str(uuid.uuid4()),
        creatorId=userId,
        origin=origin,
        destination=destination,
        date=date,
        time=time,
        seatsAvailable=int(seatsAvailable),
        notes=notes
    )
    # Save to database
    db.session.add(new_form)
    db.session.commit()
    flash("Form submitted successfully", "success")
    print("Form submitted successfully")
    return json.dumps({"message": "Form submitted successfully"}), 200


@main.route('/allRequests', methods=['GET'])
def all_requests():
    form = request.get_json()
    creatorId = form["creatorId"] if "creatorId" in form else None
    requestorId = form["requestorId"] if "requestorId" in form else None
    #Get all requests for forms created by the given creatorId or requestorId else return error
    if requestorId is None and creatorId is not None:
        requests = db.session.query(Requests).join(Forms, Requests.formId == Forms.id).filter(Forms.creatorId == creatorId).all()
    elif creatorId is None and requestorId is not None:
        requests = db.session.query(Requests).filter(Requests.requestorId == requestorId).all()
    elif creatorId == None and requestorId == None or creatorId != None and requestorId != None:
        return json.dumps({"error": "Provide either creatorId or requestorId"}), 400
   
    requests_data = [
        {column.name: getattr(req, column.name) for column in req.__table__.columns}
        for req in requests
    ]
    return json.dumps(requests_data), 200

@main.route('/requestToJoin', methods=['POST'])
def requests():
    # Handle request to join a form
    #Accept request data via POST request
    if not request.method == 'POST':
        return json.dumps({"error": "Invalid request method"}), 400
    
    #Extract request data
    form = request.get_json()
    requestorId = form["requestorId"]
    formId = form["formId"]
    
    #Create new request entry
    new_request = Requests(
        id=str(uuid.uuid4()),
        requestorId=requestorId,
        formId=formId,
        status="pending"
    )
    # Save to database
    db.session.add(new_request)
    db.session.commit()
    flash("Request to join submitted successfully", "success")
    print("Request to join submitted successfully")
    return json.dumps({"message": "Request to join submitted successfully"}), 200

@main.route('/acceptRequest', methods=['POST'])
def accept_request():
    # Handle acceptance of a join request
    #Accept request data via POST request
    if not request.method == 'POST':
        return json.dumps({"error": "Invalid request method"}), 400
    

    #Extract request data
    form = request.get_json()
    request_id = form['requestId']
    creatorId = form['creatorId']
    join_request = db.session.query(Requests).filter_by(id=request_id).first()
    
    form = db.session.query(Forms).filter_by(id=join_request.formId).first()
    # Check if the request exists
    if not join_request:
        return json.dumps({"error": "Request not found"}), 404

    # Verify that the form belongs to the creator
    
    if form.creatorId != creatorId:
        return json.dumps({"error": "Unauthorized action"}), 403
     
    
    join_request.status = "approved"
    form.seatsAvailable -= 1
    db.session.commit()
    return json.dumps({"message": "Request approved successfully"}), 200

@main.route('/denyRequest', methods=['POST'])
def deny_request():
    form = request.get_json()
    request_id = form['requestId']
    join_request = db.session.query(Requests).filter_by(id=request_id).first()
    form = db.session.query(Forms).filter_by(id=join_request.formId).first()
    # Verify that the form belongs to the creator
    if form.creatorId != request.form['creatorId']:
        return json.dumps({"error": "Unauthorized action"}), 403
    # Check if the request exists
    if not join_request:
        return json.dumps({"error": "Request not found"}), 404
    
    # Deny the request
    join_request.status = "denied"
    db.session.commit()
    return json.dumps({"message": "Request denied successfully"}), 200