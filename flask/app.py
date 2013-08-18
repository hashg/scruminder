import os
# import psycopg2
import urlparse
import json
import random
import hashlib
import hmac
from string import letters
from flask import Flask, render_template, json, jsonify, request
import flask.ext.sqlalchemy
import flask.ext.restless


# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__, static_folder='', static_url_path='', template_folder='')
app.config['DEBUG'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['HEROKU_POSTGRESQL_ORANGE_URL']
#to reset db on heroku - HEROKU_POSTGRESQL_ORANGE_URL
'''
To setup db on heroku
heroku run python
>>> from app import db
>>> db.create_all()
'''
debug_env = 1

if( debug_env ):
  dbpath = os.path.join(os.getcwd(), 'scruminder.db')
  print dbpath
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbpath
else:
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['HEROKU_POSTGRESQL_ORANGE_URL']

db = flask.ext.sqlalchemy.SQLAlchemy(app)

'''###############
Security
###############'''
secret = 'n00b'

def make_salt(length = 6):
  return ''.join(random.choice(letters) for x in xrange(length))

def make_pw_hash(name, pw, salt = None):
  if not salt:
    salt = make_salt()
  h = hashlib.sha256(secret + name + pw + salt).hexdigest()
  return '%s,%s' % (salt, h)

def valid_pw(name, password, h):
  salt = h.split(',')[0]
  return h == make_pw_hash(name, password, salt)

prefix = '/api'
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)
# Create your Flask-SQLALchemy models as usual but with the following two
# (reasonable) restrictions:
# 1. They must have an id column of type Integer.
# 2. They must have an __init__ method which accepts keyword arguments for
# all columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model
# supplies such a method, so you don't need to declare a new one).
# {"name":"name03","id":4}

class Person(db.Model):
  id = db.Column(db.Unicode(50), primary_key=True)
  name = db.Column(db.Unicode)
  username = db.Column(db.Unicode)
  bugdb_id = db.Column(db.Unicode)
  password = db.Column(db.Unicode)
  email = db.Column(db.Unicode)
  country = db.Column(db.Unicode(85))
  state = db.Column(db.Unicode(85))
  city = db.Column(db.Unicode(85))
  is_active = db.Column(db.Boolean)
  created = db.Column(db.DateTime(timezone=True))
  updated = db.Column(db.DateTime(timezone=True))
  manager_id = db.Column(db.Unicode(50), db.ForeignKey('person.id'))
  # projects = db.relationship('Project', backref=db.backref('person', lazy='select'), lazy='dynamic')
  vacations = db.relationship('Vacation', backref=db.backref('person', lazy='select'), lazy='dynamic')
  project_id = db.Column(db.Unicode(50), db.ForeignKey('project.id'))

personExcludes = []
manager.create_api(Person, url_prefix=prefix, collection_name='persons',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=personExcludes,results_per_page=-1)

class Vacation(db.Model):
  id = db.Column(db.Unicode(50), primary_key=True)
  from_date = db.Column(db.DateTime(timezone=True))
  to_date = db.Column(db.DateTime(timezone=True))
  country = db.Column(db.Unicode(85))
  state = db.Column(db.Unicode(85))
  city = db.Column(db.Unicode(85))
  comments = db.Column(db.Unicode)
  created = db.Column(db.DateTime(timezone=True))
  updated = db.Column(db.DateTime(timezone=True))
  person_id = db.Column(db.String(50), db.ForeignKey('person.id'))

vacationExcludes = []
manager.create_api(Vacation, url_prefix=prefix, collection_name='vacations',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=personExcludes,results_per_page=-1)

class Holiday(db.Model):
  id = db.Column(db.Unicode(50), primary_key=True)
  from_date = db.Column(db.DateTime(timezone=True))
  to_date = db.Column(db.DateTime(timezone=True))
  country = db.Column(db.Unicode(85))
  state = db.Column(db.Unicode(85))
  city = db.Column(db.Unicode(85))
  comments = db.Column(db.Unicode)
  desc = db.Column(db.Unicode)
  created = db.Column(db.DateTime(timezone=True))
  updated = db.Column(db.DateTime(timezone=True))

holidayExcludes = []
manager.create_api(Holiday, url_prefix=prefix, collection_name='holidays',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=holidayExcludes,results_per_page=-1)

class Project(db.Model):
  id = db.Column(db.Unicode(50), primary_key=True)
  name = db.Column(db.Unicode, unique=True)
  desc = db.Column(db.Text)
  is_active = db.Column(db.Boolean)
  created = db.Column(db.DateTime(timezone=True))
  updated = db.Column(db.DateTime(timezone=True))
  persons = db.relationship('Person', backref=db.backref('project', lazy='select'), lazy='dynamic')
  # sprints = db.relationship('Sprint', backref=db.backref('project', lazy='select'), lazy='dynamic')

projectExcludes = []
manager.create_api(Project, url_prefix=prefix, collection_name='projects',  methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=projectExcludes,results_per_page=-1)

# Create the database tables.
# db.create_all()

#DB session for db tasks in register method
session = getattr(db, 'session', None)
@app.route('/')
def index():
  return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
  if request and request.method == 'POST':
    if not request.headers['Content-Type'].find('application/json'):
      if all(k in request.json for k in ("username", "password")):
        #TODO: check for duplicate login 
        #TODO: IMPORTANT Match password
        username = request.json['username']
        password = request.json['password']
        per = Person.query.filter_by(username = username ).first()
        if per and per.password:
          if valid_pw(username, password, per.password):
            return jsonify(token=per.password)
          else:
            return "401 Unauthorized", 401
        # per = Person.query.filter_by(username = request.json["username"] )
        # per = Person.select(Person.username == request.json["username"]).execute().first()
        # print per.password
        else:
          return jsonify(message="Username does not exists."), 401
      else:
        return jsonify(message="206 Partial Content."), 206
    else:
      return "415 Unsupported Media Type", 415

@app.route('/api/logout', methods=['POST'])
def logout():
  return jsonify(logout=True)

@app.route('/api/register', methods=['POST'])
def register():
  if request and request.method == 'POST':
    if not request.headers['Content-Type'].find('application/json'):
      if all(k in request.json for k in ("username", "password", "repassword", "email")):
        #TODO: check for duplicates and reject
        username = request.json['username']
        password = request.json['password']
        repassword = request.json['repassword']
        email = request.json["email"]
        if password == repassword:
          per = Person.query.filter_by(username = username ).first()
          if not per:
            pw_hash = make_pw_hash(username, password)
            u = Person(id=pw_hash[:3]+pw_hash[-6:], name=username, username=username, password=pw_hash, email=email)
            session.add(u)
            session.commit()
            return jsonify(passwd=pw_hash)
          else:
            return jsonify(message="Person already exists."), 401
        else:
          return jsonify(message="Password does not match."), 401
      else:
        return jsonify(message="206 Partial Content."), 206
  # if request and request.json['username'] and request
  return jsonify(register=True)

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
