import datetime
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
    img_name: str  # 画像の名前
