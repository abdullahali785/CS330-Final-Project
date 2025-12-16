#!/usr/bin/env python3
"""
PandAuth authentication

@author:
@version: 2025.12
"""

import json

import requests
from flask import Blueprint, current_app, redirect, request
from flask_login import login_required, login_user, logout_user
import dotenv
from . import client, db, login_manager
from .database.models import Users as User
from urllib.parse import urlencode

auth = Blueprint("auth", __name__, url_prefix="/auth")


@auth.get("/login")
def login():
    """Log in"""
    google_provider_cfg = current_app.config["GOOGLE_CONFIG"]
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)
    


@auth.route("/login/callback")
def callback():
    """Google callback"""
      # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = current_app.config["GOOGLE_CONFIG"]
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(current_app.config["GOOGLE_CLIENT_ID"], current_app.config["GOOGLE_CLIENT_SECRET"]),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400
    
    # Create a user in your db with the information provided
    # by Google
    user = User(
        id=unique_id, name=users_name, email=users_email, hasCar=False
    )
    params = urlencode({
        "userId": user.id
    })
    frontend_url = "https://cs330-final-project-m34n.onrender.com"
    # frontend_url = "http://localhost:5173"
    # Doesn't exist? Add it to the database.
    if not db.session.query(User).filter(User.id==unique_id).first():
        # User.create(unique_id, users_name, users_email, picture)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(f"{frontend_url}/info?{params}")

    # Begin user session by logging the user in
    login_user(user)
    # Send user back to homepage
    
    

    return redirect(f"{frontend_url}/home?{params}")


@auth.route("/logout")
@login_required
def logout():
    """Log out"""
    logout_user()
    # frontend_url = current_app.config.get("FRONTEND_URL")
    frontend_url = "https://cs330-final-project-m34n.onrender.com"


    return redirect(frontend_url)


@login_manager.user_loader
def load_user(user_id):
    """User loader"""
    return db.session.query(User).filter_by(id=user_id).first()
