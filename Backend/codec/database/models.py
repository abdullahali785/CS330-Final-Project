import csv
import datetime
import logging
import pathlib

import click
import sqlalchemy as sqla
from sqlalchemy import Column, Float, ForeignKey, Integer, String, DateTime
from marshmallow import fields
# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.orm import (
    DeclarativeBase,
    backref,
    relationship,
    scoped_session,
    sessionmaker,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase): ...

class Users(Base):
    __tablename__ = "student"
    id : Mapped[str] =  mapped_column(unique=True, primary_key=True)
    name : Mapped[str] =  mapped_column()
    email : Mapped[str] = mapped_column()
    hasCar : Mapped[bool] = mapped_column()

    
    def __repr__(self):
        return f"Name: {self.name}\nEmail: {self.email}\nHas a car: {self.hasCar}"

class Forms(Base):
    __tablename__ = "forms"
    id : Mapped[str] =  mapped_column(unique=True, primary_key=True)  # from CSV or auto
    creatorId : Mapped[str] = mapped_column()
    origin : Mapped[str] = mapped_column()
    destination : Mapped[str] = mapped_column()
    date : Mapped[str] = mapped_column()
    time : Mapped[str] = mapped_column()
    seatsAvailable : Mapped[int] = mapped_column()
    notes : Mapped[str] = mapped_column()

class Requests(Base):
    __tablename__ = "requests"
    id : Mapped[str] =  mapped_column(unique=True, primary_key=True)  # from CSV or auto
    requestorId : Mapped[str] = mapped_column()
    formId : Mapped[str] = mapped_column()
    status : Mapped[str] = mapped_column() # e.g., "pending", "approved", "denied" 

