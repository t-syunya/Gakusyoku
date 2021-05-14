from sqlalchemy import Integer, Column, Date, String, Boolean
from db import Base


class Admin(Base):  # 管理者
    __tablename__ = 'administrators'
    user_id = Column(String, primary_key=True, nullable=False, index=True)
    password = Column(String, nullable=False)


class Menu(Base):  # メニュー
    __tablename__ = 'menus'
    name = Column(String, primary_key=True, nullable=False)  # メニュー名
    date = Column(Date, nullable=False)  # 日付
    value = Column(Integer, nullable=False)  # 値段
    genre = Column(String, nullable=False)  # ジャンル
    is_sold_out = Column(Boolean, nullable=False)  # 売り切れフラグ, 0：販売中, 1：売り切れ

    def __init__(self, name, date_, value, genre):
        self.name = name
        self.date = date_
        self.value = value
        self.genre = genre
        self.flag = 0

    def __repr__(self):
        return f"<Menu(name='{self.name}', date='{self.date}', value='{self.value}', genre='{self.genre}', is_sold_out='{self.is_sold_out}')>"
