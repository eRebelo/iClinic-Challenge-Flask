from google.appengine.ext import db


class IClinicModel(db.Model):
    public_place = db.StringProperty()
    neighborhood = db.StringProperty()
    city = db.StringProperty()
    istate = db.StringProperty()
    zip_code = db.StringProperty()
