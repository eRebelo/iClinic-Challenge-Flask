#!/usr/bin/python -tt
# -*- coding: utf-8 -*-

from logics import *
from flask import Flask, render_template, request, jsonify
import json
import urllib2
import sys

app = Flask(__name__)

# Treatment Special Characters
reload(sys)
sys.setdefaultencoding("UTF-8")


# Main Page and Functions

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cep', methods=['GET'])
def cep():
    cep_value = request.args.get('cep_value', 0, type=str)
    req = urllib2.Request('http://api.postmon.com.br/v1/cep/' + cep_value)
    try:
        response = urllib2.urlopen(req)
    except urllib2.HTTPError as e:
        print "Error: " + str(e.code)
        return jsonify(result=False)
    except urllib2.URLError as e:
        print "Error: Connection refused"
        return jsonify(result=False)
    else:
        # print "200 OK"
        data = json.load(response)
        return jsonify(result=data)


@app.route('/savecep', methods=['POST'])
def savecep():
    request_data = request.get_json(force=True)
    public_place = str(request_data["public_place"])
    neighborhood = str(request_data["neighborhood"])
    city = str(request_data["city"])
    istate = str(request_data["istate"])
    zip_code = str(request_data["zip_code"])

    iClinic = IClinic()
    resp = iClinic.save_cep(public_place, neighborhood, city, istate, zip_code)
    return jsonify(result=resp)


# Records Page and Functions

@app.route('/records')
def records():
    return render_template('records.html')


@app.route('/getrecords')
def getrecords():
    iClinic = IClinic()
    ceps = iClinic.list_cep()
    itemsList = []  # initial empty list

    for cep in ceps:
        d1 = db.to_dict(cep)
        print d1
        d2 = {'id': cep.key().id()}
        d1.update(d2)
        itemsList.append(d1)
    return jsonify(result=itemsList)


@app.route('/deletecep', methods=['POST'])
def deletecep():
    request_data = request.get_json(force=True)
    iClinic = IClinic()
    iClinic.delete_cep(request_data)
    return jsonify(result="OK")


# Definitions Page

def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500


# Note: We don't need to call run() since our application is embedded within the App Engine WSGI application server.

if __name__ == '__main__':
    app.run()
