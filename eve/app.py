# -*- coding: utf-8 -*-

"""
    Eve Demo
    ~~~~~~~~

    A demostration of a simple API powered by Eve REST API.

    The live demo is available at eve-demo.herokuapp.com. Please keep in mind
    that the it is running on Heroku's free tier using a free MongoHQ
    sandbox, which means that the first request to the service will probably
    be slow. The database gets a reset every now and then.

    :copyright: (c) 2012 by Nicola Iarocci.
    :license: BSD, see LICENSE for more details.
"""

import os
from eve import Eve
from eve.auth import TokenAuth
from eve.io.mongo import Validator
from werkzeug.security import check_password_hash, generate_password_hash
import json
from bson import ObjectId
import base64
import random
import string
from eapp import eapp


class AuthValidator(Validator):
    def _validate_isExistAcct(self, isExistAcct, field, value):
        ## This method stores all the session information by validating username/password against accounts collection. Throw appropriate errors
        if isExistAcct and value:
            credentials = base64.b64decode(value).split(":")
            if len(credentials) == 2:
                username = credentials[0]
                password = credentials[1]

                lookup = {'username': username}

                sessions = app.data.driver.db['session']
                session = sessions.find_one(lookup)
                if session:
                    sessions.remove(lookup)

                accounts = app.data.driver.db['accounts']
                account = accounts.find_one(lookup)

                if account:
                    pw_hash = account.get("password")
                    if not check_password_hash(pw_hash, password):
                        self._error("Username & Password provided is incorrect in '%s'" % field)
                else:
                    self._error("User '%s' does not exist" % username)
            else:
                self._error("Value for field '%s' must have username:password pair" % field)



def sprints_callback(request, payload):
    print 'sprints_callback - BEGIN'
    # This method make sure parent child relation ship is in sync by adding references of itself in parent
    #type(request) - <class 'werkzeug.local.LocalProxy'>
    #type(payload) - <class 'flask.wrappers.Response'>
    parent_id = request.json.get("project_id")
    sprint_id = request.json.get("_id")
    print parent_id
    print sprint_id

    # print type(payload.response) - <type 'str'>
    print (payload.response)
    myresponse = json.loads(payload.response[0])
    #try this myresponse1 = payload.get_data()
    status = myresponse.get("status")

    projects = app.data.driver.db['projects']
    # project = projects.find_one({'_id': ObjectId(p_id)})
    # print projects.update({"_id" : ObjectId(p_id)}, {"$push": {"sprints": {"$each":["a","b","c"]}}})
    if projects and status.encode('utf8') == 'OK':
        projects.update({"_id" : ObjectId(parent_id)}, {"$push": {"sprints": sprint_id}})

    print 'sprints_callback - END'

def sprints_delete_callback(request, payload):
    print 'sprints_delete_callback - BEGIN'
    parent_id = request.json.get('project_id')
    sprint_id = request.json.get('id')
    print parent_id
    print sprint_id

    projects = app.data.driver.db['projects']
    if projects:
        projects.update({"_id" : ObjectId(parent_id)}, {"$pull": {"sprints": ObjectId(sprint_id)}})
    print 'sprints_delete_callback - END'

def stories_callback(request, payload): 
    parent_id = request.json.get("sprint_id")
    story_id = request.json.get("_id")

    myresponse = json.loads(payload.response[0])
    status = myresponse.get("status")

    sprints = app.data.driver.db['sprints']
    
    if sprints and status.encode('utf8') == 'OK':
        sprints.update({"_id" : ObjectId(parent_id)}, {"$push": {"stories": story_id}})

def stories_delete_callback(request, payload):
    print 'stories_delete_callback - BEGIN'
    parent_id = request.json.get('sprint_id')
    story_id = request.json.get('id')
    print parent_id
    print story_id

    sprints = app.data.driver.db['sprints']
    if sprints:
        sprints.update({"_id" : ObjectId(parent_id)}, {"$pull": {"stories": ObjectId(story_id)}})
    print 'stories_delete_callback - END'


def tasks_callback(request, payload): 
    parent_id = request.json.get("story_id")
    task_id = request.json.get("_id")
    print parent_id
    print task_id

    myresponse = json.loads(payload.response[0])
    status = myresponse.get("status")

    stories = app.data.driver.db['stories']
    
    if stories and status.encode('utf8') == 'OK':
        print 'tasks'
        stories.update({"_id" : ObjectId(parent_id)}, {"$push": {"tasks": task_id}})

def tasks_delete_callback(request, payload):
    print 'tasks_delete_callback - BEGIN'
    # print request.json
    # print payload.response
    parent_id = request.json.get('story_id')
    task_id = request.json.get('id')
    print parent_id
    print task_id

    stories = app.data.driver.db['stories']
    if stories:
        stories.update({"_id" : ObjectId(parent_id)}, {"$pull": {"tasks":  ObjectId(task_id)}})

    print 'tasks_delete_callback - END'

    

# def session_callback(request, payload):
    # ['{"data": {"status": "OK", "updated": "Fri, 11 Oct 2013 18:32:37 GMT", "_id": "52584445d1bc382fdc4a6e17", "etag": "f19ad507ecf0ad94640c48322d2f5cfc4715acf8"}}']
    # session = app.data.driver.db['session']
    # response = json.loads(payload.response[0])
    # if request:
    #     username = request.json.get("username")
    #     password = request.json.get("password")

    
def before_insert_session(documents):
    ##.This method clears "auth" data and generate a token for the session
    #print type(documents) #<type 'list'>
    accounts = app.data.driver.db['accounts']
    for document in documents:
        auth = document.get("auth")
        document["auth"] = "yowza" # clear the credentials. we don't want to store it.
        credentials = base64.b64decode(auth).split(":")

        if len(credentials) == 2:
            username = credentials[0]
            pw_4m_req = credentials[1]

        lookup = {'username': username}
        account = accounts.find_one(lookup)        
        
        if account:
            pw_hash = account.get("password")
            document["username"] = username
            if check_password_hash(pw_hash, pw_4m_req):
                document["token"] = generate_password_hash(username+pw_hash.split('$')[-1], method='pbkdf2:sha224', salt_length=8).split('$')[-1]
            else:
                document["token"] = 'INVALID'
        else:
            document["token"] = 'INVALID'

def before_insert_accounts(documents):
    ##This method make sure the password is not store in plain text
    #print type(documents) #<type 'list'>
    for document in documents:
        pw_4m_req = document.get("password")
        document["password"] = generate_password_hash(pw_4m_req, method='pbkdf2:sha224', salt_length=8)


class ScrumAuth(TokenAuth):
    def check_auth(self, token,  allowed_roles, resource, method):
        sessions = app.data.driver.db['session']
        accounts = app.data.driver.db['accounts']
        lookup = {'token': token}
        session = sessions.find_one(lookup)

        if session and resource == 'profiles':
            # print type(session) #<type 'dict'>
            uname =  session.get("username").encode('utf8')
            lookup_acct = {'username': uname}
            account = accounts.find_one(lookup_acct)
            self.request_auth_value = account["_id"]
        return session


if __name__ == '__main__':
    # Heroku support: bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))

    app = Eve(auth=ScrumAuth, validator=AuthValidator)
    
    app.on_insert_accounts += before_insert_accounts
    app.on_insert_session += before_insert_session
    app.on_POST_sprints += sprints_callback
    app.on_POST_stories += stories_callback
    app.on_POST_tasks += tasks_callback
    app.on_DELETE_sprints += sprints_delete_callback
    app.on_DELETE_stories += stories_delete_callback
    app.on_DELETE_tasks += tasks_delete_callback

    app.register_blueprint(eapp, url_prefix='/eapp')
    app.run(host='0.0.0.0', port=port, debug=True)
