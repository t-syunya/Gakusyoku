import datetime

from pydantic import BaseModel


class Admin(BaseModel):  # 管理者
    user_id: str
    password: str


class Menu(BaseModel):  # メニュー
    name: str
    date: datetime.date  # 日付
    value: int  # 値段
    genre: str  # ジャンル
    flag: bool  # 売り切れフラグ, 0：売り切れ, 1：販売中
