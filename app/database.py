from sqlalchemy import create_engine
from sqlalchemy.orm import relation, scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# filename = "gakusyoku.db"
# url = "sqlite:///" + filename

url = "postgresql+psycopg2://team7:nanahann@localhost/team7db"

Base = declarative_base()
engine = create_engine(url, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
