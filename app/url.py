from datetime import datetime
import responder

from models import User, Menu

api = responder.API()


@api.route('/')
def on_get(req, resp):
    resp.content = api.template("index.html")


