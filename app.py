import os
import psycopg2
import urlparse
from flask import Flask, render_template
import flask.ext.sqlalchemy
import flask.ext.restless

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__, template_folder='')
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['HEROKU_POSTGRESQL_ORANGE_URL']
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////scruminder/scruminder.db'
db = flask.ext.sqlalchemy.SQLAlchemy(app)
prefix = '/api'
# Create your Flask-SQLALchemy models as usual but with the following two
# (reasonable) restrictions:
# 1. They must have an id column of type Integer.
# 2. They must have an __init__ method which accepts keyword arguments for
# all columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model
# supplies such a method, so you don't need to declare a new one).
# {"name":"name03","id":4}
class Person(db.Model):
    id = db.Column(db.Unicode, primary_key=True)
    name = db.Column(db.Unicode)
    password = db.Column(db.Unicode)
    login = db.Column(db.Unicode)

# # {"name":"comp05","id":5, "vendor":"Microsoft", "person_id": 5}
# class Computer(db.Model):
#     id = db.Column(db.Unicode, primary_key=True)
#     name = db.Column(db.Unicode, unique=True)
#     vendor = db.Column(db.Unicode)
#     purchase_time = db.Column(db.DateTime)
#     person_id = db.Column(db.Unicode, db.ForeignKey('person.id'))
#     person = db.relationship('Person', backref=db.backref('computers',
#                                                          lazy='dynamic'))


# Create the database tables.
# db.create_all()

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, each at a different URL and with different allowed HTTP
# methods, but which all affect the Person model.
# def post_collection_formatter(result):
#     return {'persons': result['objects']} if 'page' in result else result

# def post_singlular_formatter(result):
#     return {'person': result}

# def pre_ember_formatter(data):
#     pass
#     # return result['person']

# def pre_patch_ember_formatter(instid, data):
#     return result['person']

personExcludes = ['birth_date', 'computers.purchase_time']
manager.create_api(Person, url_prefix=prefix, collection_name='persons',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=personExcludes,results_per_page=-1)

# computerExcludes = ['purchase_time', 'person.birth_date']
# manager.create_api(Computer, url_prefix=prefix, collection_name='computers',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=computerExcludes)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
