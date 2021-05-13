import os
from datetime import datetime, timedelta, date
from sqlalchemy import Integer, Column, DateTime, String, Boolean
from db import Base


class Admin(Base):  # 管理者
    __tablename__ = 'administrators'
    user_id = Column(String, primary_key=True, nullable=False, index=True)
    password = Column(String, nullable=False)


class Menu(Base):  # メニュー
    __tablename__ = 'menus'
    name = Column(String, primary_key=True, nullable=False)  # メニュー名
    date = Column(DateTime, nullable=False)  # 日付
    value = Column(Integer, nullable=False)  # 値段
    genre = Column(String, nullable=False)  # ジャンル
    flag = Column(Boolean, nullable=False)  # 売り切れフラグ, 0：売り切れ, 1：販売中

    def __init__(self, name, date, value, genre):
        self.name = name
        self.date = date
        self.value = value
        self.genre = genre
        self.flag = 0
