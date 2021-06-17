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
    data = db.query(models.Menu).filter(models.Menu.date_ >= date_,
                                        models.Menu.date_ < (date_ + datetime.timedelta(days=7)),
                                        models.Menu.genre != "permanent").order_by(models.Menu.date_).all()
    result = schemas.WeeklySetMenu(weekly_menu=[])
    for i in range(0, len(data), 2):
        #     name: str  # メニュー名
        #     date_: datetime.date  # 日付
        #     value: int  # 値段
        #     genre: str  # ジャンル
        #     is_sold_out: bool  # 0：販売中, 1：売り切れ
        result.weekly_menu.append(schemas.SetMenu(
            set_a=schemas.Menu(name=data[i].name, date_=data[i].date_, value=data[i].value, genre=data[i].genre,
                               is_sold_out=data[i].is_sold_out, img_name=data[i].img_name),
            set_b=schemas.Menu(name=data[i + 1].name, date_=data[i + 1].date_, value=data[i + 1].value,
                               genre=data[i + 1].genre, is_sold_out=data[i + 1].is_sold_out,
                               img_name=data[i + 1].img_name),
            date_=data[i].date_
        ))
    print(result)
    return result


def create_menu(db: Session, data: schemas.Menu):
    try:
        db_menu = models.Menu(data.name, data.date_, data.value, data.genre, data.is_sold_out)
        db.add(db_menu)
        db.commit()
    except:
        db.rollback()
