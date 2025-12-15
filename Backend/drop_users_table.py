from codec import db, create_app
from codec.database.models import Users

app = create_app()

with app.app_context():
    Users.__table__.drop(db.engine)
    print("Users table dropped successfully.")