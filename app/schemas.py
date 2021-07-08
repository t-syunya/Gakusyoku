import datetime
from typing import List, Optional
from pydantic import BaseModel


class Admin(BaseModel):
    """ 管理者 """
    user_id: str
    password: str
    token: Optional[str]


class Menu(BaseModel):
    """    メニュー    """
    name: str  # メニュー名
    date: datetime.date  # 日付
    value: int  # 値段
    genre: str  # ジャンル
    is_sold_out: bool  # 0：販売中, 1：売り切れ
    img_name: Optional[str]  # 画像の名前


class SetMenu(BaseModel):
    """ 1日のメニュー """
    set_a: Menu
    set_b: Menu
    date: datetime.date


class WeeklySetMenu(BaseModel):
    """ 1週間のメニュー """
    weekly_menu: List[SetMenu]


class MonthlySetMenu(BaseModel):
    """ 1ヶ月のメニュー """
    monthly_menu: List[SetMenu]


class PostMenus(BaseModel):
    """ メニュー変更用 """
    menus: List[SetMenu]
