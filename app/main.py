from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import uvicorn
import crud, models, schemas
from database import SessionLocal, engine

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


@app.get("/", response_class=HTMLResponse)
async def index():
    with open('templates/index.html', 'r', encoding='utf-8') as f:
        return HTMLResponse(f.read())


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/login/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
