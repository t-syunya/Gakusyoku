import datetime

from sqlalchemy.orm import Session
import hashlib

import models
import schemas


def get_admin(db: Session, user_id: str, password: str):
    try:
        print(user_id + password)
        hashed_password = hashlib.sha256((user_id + password).encode()).hexdigest()

        print(hashed_password)
        db_admin = db.query(models.Admin).filter(models.Admin.user_id == user_id).first()
        print(db_admin)
        if db_admin.password == hashed_password:
            print("一致")
            return True  # アクセストークン返す
        else:
            print("失敗")
            return False
    except:
        raise


def create_user(db: Session, user_id: str, password: str):
    hashed_password = hashlib.sha256((user_id + password).encode()).hexdigest()
    db_item = models.Admin(user_id, hashed_password)
    db.add(db_item)
    db.commit()


def get_today_menus(db: Session, date: datetime.date, genre: str):
    return db.query(models.Menu).filter(models.Menu.date == date).filter(models.Menu.genre == genre).order_by(
        models.Menu.is_sold_out).all()


def get_weekly_menus(db: Session, date: datetime.date):
    data = db.query(models.Menu).filter(models.Menu.date >= date,
                                        models.Menu.date < (date + datetime.timedelta(days=7)),
                                        models.Menu.genre != "permanent").order_by(models.Menu.date).all()
    result = schemas.WeeklySetMenu(weekly_menu=[])
    for i in range(0, len(data), 2):
        #     name: str  # メニュー名
        #     date: datetime.date  # 日付
        #     value: int  # 値段
        #     genre: str  # ジャンル
        #     is_sold_out: bool  # 0：販売中, 1：売り切れ
        result.weekly_menu.append(schemas.SetMenu(
            set_a=schemas.Menu(name=data[i].name, date=data[i].date, value=data[i].value, genre=data[i].genre,
                               is_sold_out=data[i].is_sold_out, img_name=data[i].img_name),
            set_b=schemas.Menu(name=data[i + 1].name, date=data[i + 1].date, value=data[i + 1].value,
                               genre=data[i + 1].genre, is_sold_out=data[i + 1].is_sold_out,
                               img_name=data[i + 1].img_name),
            date=data[i].date
        ))
    print(result)
    return result


def get_monthly_menus(db: Session, date: datetime.date):
    data = db.query(models.Menu).filter(models.Menu.date >= date,
                                        models.Menu.date < (date + datetime.timedelta(days=30)),
                                        models.Menu.genre != "permanent").order_by(models.Menu.date).all()
    result = schemas.MonthlySetMenu(monthly_menu=[])
    for i in range(0, len(data), 2):
        result.monthly_menu.append(schemas.SetMenu(
            set_a=schemas.Menu(name=data[i].name, date=data[i].date, value=data[i].value, genre=data[i].genre,
                               is_sold_out=data[i].is_sold_out, img_name=data[i].img_name),
            set_b=schemas.Menu(name=data[i + 1].name, date=data[i + 1].date, value=data[i + 1].value,
                               genre=data[i + 1].genre, is_sold_out=data[i + 1].is_sold_out,
                               img_name=data[i + 1].img_name),
            date=data[i].date
        ))
    print(result)
    return result


def change_sold_out(db: Session, name: str, date: datetime.date):
    data = db.query(models.Menu).filter(models.Menu.date == date, models.Menu.name == name).first()
    data.is_sold_out = True
    db.commit()


def revert_sold_out(db: Session, name: str, date: datetime.date):
    data = db.query(models.Menu).filter(models.Menu.date == date, models.Menu.name == name).first()
    data.is_sold_out = False
    db.commit()


def create_menu(db: Session, data: schemas.Menu):
    try:
        db_menu = models.Menu(data.name, data.date, data.value, data.genre, data.is_sold_out, data.img_name)
        db.add(db_menu)
        db.commit()
    except:
        db.rollback()
