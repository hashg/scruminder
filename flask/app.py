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
dbpath = os.path.join(os.getcwd(), 'scruminder.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbpath
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
    username = db.Column(db.Unicode)
    password = db.Column(db.Unicode)
    email = db.Column(db.Unicode)

    def __init__(self, id=None, name=None, username=None, password=None, email=None):
        self.id = id
        self.name = name
        self.username = username
        self.password = password
        self.email = email


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
            u = Person(pw_hash[:3]+pw_hash[-6:], username, username, pw_hash, email)
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
