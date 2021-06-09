import datetime

from sqlalchemy.orm import Session
import hashlib

import models
import schemas

"""
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

    
def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

"""


def get_admin(db: Session, user_id: str, password: str):
    hashed_password = hashlib.sha256((user_id + password).encode()).hexdigest()
    db_admin = db.query(models.Admin).filter(models.Admin.user_id).first()
    if db_admin.password == hashed_password:
        return  # アクセストークン返す
    else:
        return  # エラーを出す


def create_user(db: Session, user_id: str, password: str):
    hashed_password = hashlib.sha256((user_id + password).encode()).hexdigest()
    db_item = models.Admin(user_id, hashed_password)
    db.add(db_item)
    db.commit()


def get_menus(db: Session, date_: datetime.date, genre: str):
    return db.query(models.Menu).filter(models.Menu.date_ == date_).filter(models.Menu.genre == genre).order_by(
        models.Menu.is_sold_out).all()


def get_weekly_menus(db: Session, date_: datetime.date):
    return db.query(models.Menu).filter(models.Menu.date_ == date_).filter(models.Menu.genre != "parmanent").all()


def create_menu(db: Session, data: schemas.Menu):
    try:
        db_menu = models.Menu(data.name, data.date_, data.value, data.genre, data.is_sold_out)
        db.add(db_menu)
        db.commit()
    except:
        db.rollback()
