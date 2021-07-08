from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

url = "postgresql+psycopg2://team7:nanahann@localhost/team7db"

Base = declarative_base()
engine = create_engine(url, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
