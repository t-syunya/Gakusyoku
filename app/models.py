import os
from datetime import datetime, timedelta
from sqlalchemy import Integer, Column, DateTime, String, ForeignKey, Table
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


class Admin(Base):  # 管理者
    __tablename__ = 'administrators'
    user_id = Column(String)
    password = Column(String)


class Menu(Base):  # メニュー
    __tablename__ = 'menus'
    name = Column(String)  # メニュー名
    date = Column(DateTime)  # 日付
    value = Column(Integer)  # 値段
    genre = Column(String)  # ジャンル
    flag = Column(Integer)  # 売り切れフラグ, 1：売り切れ

    def __init__(self, name, date, value, genre):
        self.name = name
        self.date = date
        self.value = value
        self.genre = genre
        self.flag = 0
