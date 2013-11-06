from flask import Blueprint, render_template, current_app, jsonify


eapp = Blueprint('eapp', __name__, static_folder='', static_url_path='', template_folder='templates')


@eapp.route('/')
def index():
  return render_template('index.html')
