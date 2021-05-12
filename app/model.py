import os
from datetime import datetime, timedelta
from sqlalchemy import Integer, Column, String, ForeignKey, Table
from sqlalchemy.orm import relation, scoped_session
from sqlalchemy.orm.session import sessionmaker
import sqlalchemy.ext.declarative

Base = sqlalchemy.ext.declarative.declarative_base()
filename = "gakusyoku.db"
url = "sqlite:///" + filename

engine = sqlalchemy.create_engine(url, echo=False, connect_args={"check_same_thread": False})
Base.metadata.create_all(engine)
SessionMaker = sessionmaker(bind=engine)
session = scoped_session(SessionMaker)


class Admin(Base):
    __tablename__ = 'administrators'
    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    password = Column(String)



class Menu(Base):
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre = Column(String)
    value = Column(Integer)
    

