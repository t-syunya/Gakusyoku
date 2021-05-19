import datetime

from sqlalchemy.orm import Session
from datetime import date
import models
import schemas

"""
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    
    
def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
"""


def get_menus(db: Session, date_: datetime.date, genre: str):
    return db.query(models.Menu).filter(models.Menu.date_ == date_).filter(models.Menu.genre == genre).order_by(
        models.Menu.is_sold_out).all()


def create_menu(db: Session, data: schemas.Menu):
    try:
        db_menu = models.Menu(data.name, data.date_, data.value, data.genre, data.is_sold_out)
        db.add(db_menu)
        db.commit()
    except:
        db.rollback()
