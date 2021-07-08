import datetime

from sqlalchemy import Integer, Column, Date, String, Boolean
from database import Base


class Admin(Base):  # 管理者
    __tablename__ = 'administrators'
    user_id = Column(String, primary_key=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    token = Column(String, nullable=True)

    def __init__(self, user_id, password):
        self.user_id = user_id
        self.password = password


class Menu(Base):  # メニュー
    __tablename__ = 'menus'
    name = Column(String, primary_key=True, nullable=False)  # メニュー名
    date = Column(Date, primary_key=True, nullable=False)  # 日付
    value = Column(Integer, nullable=False)  # 値段
    genre = Column(String, nullable=False)  # ジャンル
    is_sold_out = Column(Boolean, nullable=False)  # 売り切れフラグ, 0：販売中, 1：売り切れ
    img_name = Column(String)

    def __init__(self, name, date, value, genre, is_sold_out, img_name):
        self.name = name
        self.date = date
        self.value = value
        self.genre = genre
        self.is_sold_out = is_sold_out
        self.img_name = img_name

    def __repr__(self):
        return f"<Menu(name='{self.name}',date='{self.date}',value='{self.value}',genre='{self.genre}',is_sold_out='{self.is_sold_out}',img_name='{self.img_name}')>"
