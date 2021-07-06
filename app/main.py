import datetime

import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import Optional

import crud
import models
import schemas
from database import SessionLocal, engine

import uuid
from http import cookies

C = cookies.SimpleCookie()

models.Base.metadata.create_all(engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/', response_class=HTMLResponse)
async def index():
    with open('templates/index.html', 'r', encoding='utf-8') as f:
        return HTMLResponse(f.read())


@app.get('/menu/search/today', response_model=schemas.Menu)
async def menu_search(genre: str, db: Session = Depends(get_db)):
    item = crud.get_today_menus(db, datetime.date.today(), genre)
    json_compatible_item_data = jsonable_encoder(item)
    return JSONResponse(content=json_compatible_item_data)


@app.get('/menu/search/weekly', response_model=schemas.Menu)
async def weekly_search(db: Session = Depends(get_db)):
    item = crud.get_weekly_menus(db, datetime.date.today())
    json_compatible_item_data = jsonable_encoder(item)
    return JSONResponse(content=json_compatible_item_data)


@app.get('/menu/search/monthly', response_model=schemas.Menu)
async def monthly_search(db: Session = Depends(get_db)):
    item = crud.get_monthly_menus(db, datetime.date.today())
    json_compatible_item_data = jsonable_encoder(item)
    return JSONResponse(content=json_compatible_item_data)


@app.get('/sold_out/change')
async def sold_out_change(name: str, db: Session = Depends(get_db)):
    try:
        print('SoldOut:' + name)
        crud.change_sold_out(db, name, datetime.date.today())
        return 1
    except:
        raise


@app.get('/sold_out/revert')
async def sold_out_revert(name: str, db: Session = Depends(get_db)):
    try:
        print(name)
        crud.revert_sold_out(db, name, datetime.date.today())
        return 1
    except:
        raise


@app.get('/menu/change/return_date')
async def return_date(latest_date: Optional[datetime.date]):
    new_date = datetime.date.today()
    if latest_date is not None:
        new_date = latest_date + datetime.timedelta(days=1)
    while new_date.weekday() >= 5:
        new_date = new_date + datetime.timedelta(days=1)
    return new_date


@app.post('/menu/change')
async def change_menu(req: schemas.PostMenus, db: Session = Depends(get_db)):
    try:
        for menu in req.menus:
            data = db.query(models.Menu).filter(models.Menu.date == menu.date, models.Menu.genre == menu.set_a.genre).first()

            return
    except:
        db.rollback()


# なんもわからん
@app.post('/login')
async def login(req: schemas.Admin, db: Session = Depends(get_db)):
    print("user:" + req.user_id)
    print("password:" + req.password)
    # アクセストークン
    try:
        if crud.get_admin(db, req.user_id, req.password):
            UUID = uuid.uuid4()
            # クッキーに token を保存する
            # C[{req.user_id, req.password}] = UUID
            # database <= UUID
            # pass
            return UUID
        else:
            print("パスワードが違います")
            raise HTTPException(status_code=401)
    except:
        print("ユーザが存在しません")
        raise HTTPException(status_code=401)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8087)
