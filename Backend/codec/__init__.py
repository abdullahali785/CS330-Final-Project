import pathlib
import dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import csv
import uuid
from .database.models import Forms,Base, Users, Requests
import secrets


db = SQLAlchemy()
mm = Marshmallow()

def create_app():
    app = Flask(__name__)

    # Load .flaskenv
    project_root = pathlib.Path(__file__).parent.parent
    dotenv.load_dotenv(project_root / ".flaskenv")
    app.config.from_prefixed_env()

    # Database file
    db_path = project_root / "shuttlr.sqlite3"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path.as_posix()}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = secrets.token_hex(32)
    # Initialize extensions
    db.init_app(app)
    mm.init_app(app)

    # Register blueprints
    from .routes import main
  

    # Create tables
    with app.app_context():
        Base.metadata.create_all(bind=db.engine)

    with app.app_context():
        mm.init_app(app)
      

    app.register_blueprint(main)
    return app
