from sqlalchemy.orm import relation, scoped_session
from sqlalchemy.orm.session import sessionmaker
import sqlalchemy.ext.declarative

filename = "gakusyoku.db"
url = "sqlite:///" + filename

Base = sqlalchemy.ext.declarative.declarative_base()
engine = sqlalchemy.create_engine(url, echo=False, connect_args={"check_same_thread": False})
Base.metadata.create_all(engine)
SessionMaker = sessionmaker(autocommit=False, bind=engine)
session = scoped_session(SessionMaker)
