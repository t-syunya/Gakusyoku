import datetime

import database
import models


def main():
    models.Base.metadata.create_all(database.engine)
    with open("permanent.csv", "r") as f:
        db = database.SessionLocal()
        for line in f.read().splitlines()[1:]:
            name, date_, value, genre = line.split(',')
            year, month, day = date_.split("-")
            date_ = datetime.date(int(year), int(month), int(day))
            db_menu = models.Menu(name, date_, value, genre, False)
            db.add(db_menu)
            db.commit()
        db_admin = models.Admin(user_id="admin", password="password")
        db.add(db_admin)
        db.commit()
        db.close()


if __name__ == '__main__':
    main()
