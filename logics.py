#!/usr/bin/python -tt
# -*- coding: utf-8 -*-

from google.appengine.ext import db

from models import IClinicModel

import logging


class IClinic(object):
    def save_cep(self, public_place, neighborhood, city, istate, zip_code):
        iclinic = IClinicModel()
        iclinic.public_place = public_place
        iclinic.neighborhood = neighborhood
        iclinic.city = city
        iclinic.istate = istate
        iclinic.zip_code = zip_code

        if (IClinicModel.all().filter("zip_code", zip_code).count() == 0):
            iclinic.put()
            return True;
        else:
            logging.info("__Already exists register")
            return False;

    def delete_cep(self, cep_ids):
        if len(cep_ids) > 0:
            for cep_id in cep_ids:
                iClinic_k = db.Key.from_path('IClinicModel', long(cep_id))
                # iClinic = db.get(iClinic_k)
                db.delete(iClinic_k)

    def list_cep(self):
        iclinic_query = IClinicModel.all().order("zip_code")
        return iclinic_query
