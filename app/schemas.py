import datetime
from typing import List, Optional
from pydantic import BaseModel


class Admin(BaseModel):  # 管理者
    user_id: str
    password: str


class Menu(BaseModel):  # メニュー
    name: str  # メニュー名
    date_: datetime.date  # 日付
    value: int  # 値段
    genre: str  # ジャンル
    is_sold_out: bool  # 0：販売中, 1：売り切れ
    img_name: Optional[str]  # 画像の名前


class SetMenu(BaseModel):
    set_a: Menu
    set_b: Menu
    date_: datetime.date


class WeeklySetMenu(BaseModel):
    weekly_menu: List[SetMenu]
