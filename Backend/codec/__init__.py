import pathlib
import dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import requests
from .database.models import Forms,Base, Users, Requests
import secrets
from oauthlib.oauth2 import WebApplicationClient
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.login_view = "auth.login"
db = SQLAlchemy()
mm = Marshmallow()
client = WebApplicationClient("")

def create_app():
    from .routes import main
    from .auth import auth
    app = Flask(__name__)   

    # Load .flaskenv
    project_root = pathlib.Path(__file__).parent.parent
    dotenv.load_dotenv(project_root / ".flaskenv")
    dotenv.load_dotenv(project_root / pathlib.Path(".env"))
    app.config.from_prefixed_env()
    app.config.from_mapping(dotenv.dotenv_values(project_root / pathlib.Path(".env")))
    app.config.from_mapping(dotenv.dotenv_values(project_root / pathlib.Path(".flaskenv")))
    
     # Initialize secret key if necessary
    if not app.config.get("SECRET_KEY"):
        app.config["SECRET_KEY"] = secrets.token_hex()



    # Database file
    db_path = project_root / "shuttlr.sqlite3"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path.as_posix()}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = secrets.token_hex(32)
    # Initialize extensions
    db.init_app(app)
    mm.init_app(app)

     # Initialize login subsystem
    login_manager.init_app(app)
    with app.app_context():
        client.client_id = app.config["GOOGLE_CLIENT_ID"]
    GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
    app.config["GOOGLE_CONFIG"] = requests.get(GOOGLE_DISCOVERY_URL).json()

    # Create tables
    with app.app_context():
        Base.metadata.create_all(bind=db.engine)
        

    with app.app_context():
        mm.init_app(app)

    # Register blueprints
    app.register_blueprint(auth)
    app.register_blueprint(main)
    return app
