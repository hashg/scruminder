# Scruminder

## Installation
* pip install virtualenv
* virtual ENV
* git clone https://github.com/hashg/scruminder.git
* cd scrumidner
* pip install eve/requirements.txt 
* npm install -g grunt-cli
* npm install
* npm install -g bower

## Setup a mongo db
* Install MongoDB
* Configure it following - scruminder/eve/settings.py
* Currently localhost configured with following details:
 -  MONGO_HOST = 'localhost'
 -  MONGO_PORT = 27017
 -  MONGO_USERNAME = 'hashg'
 -  MONGO_PASSWORD = 'gowda'
 -  MONGO_DBNAME = 'scrum'

## To compile Ember App
* cd scruminder
* grunt server

## Run Python Server
* python tmp\public\app.py

## URL
* http://localhost/eapp
