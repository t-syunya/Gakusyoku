from sqlalchemy import create_engine
from sqlalchemy.orm import relation, scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

filename = "gakusyoku.db"
url = "sqlite:///" + filename

Base = declarative_base()
engine = create_engine(url, echo=False, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)