import datetime
from typing import List, Optional
from pydantic import BaseModel

"""    管理者    """
class Admin(BaseModel):
    user_id: str
    password: str
    token: Optional[str]

        
"""    メニュー    """
class Menu(BaseModel):
    name: str  # メニュー名
    date: datetime.date  # 日付
    value: int  # 値段
    genre: str  # ジャンル
    is_sold_out: bool  # 0：販売中, 1：売り切れ
    img_name: Optional[str]  # 画像の名前


"""    1日のメニュー    """
class SetMenu(BaseModel):
    set_a: Menu
    set_b: Menu
    date: datetime.date


"""    1週間のメニュー    """
class WeeklySetMenu(BaseModel):
    weekly_menu: List[SetMenu]


"""    1月のメニュー    """
class MonthlySetMenu(BaseModel):
    monthly_menu: List[SetMenu]


"""    メニュー変更用    """
class PostMenus(BaseModel):
    menus: List[SetMenu]
