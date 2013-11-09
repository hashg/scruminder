# -*- coding: utf-8 -*-

"""
  eve-demo settings
  ~~~~~~~~~~~~~~~~~

  Settings file for our little demo.

  PLEASE NOTE: We don't need to create the two collections in MongoDB.
  Actually, we don't even need to create the database: GET requests on an
  empty/non-existant DB will be served correctly ('200' OK with an empty
  collection); DELETE/PATCH will receive appropriate responses ('404' Not
  Found), and POST requests will create database and collections when needed.
  Keep in mind however that such an auto-managed database will most likely
  perform poorly since it lacks any sort of optimized index.

  :copyright: (c) 2012 by Nicola Iarocci.
  :license: BSD, see LICENSE for more details.
"""

import os

# We want to seamlessy run our API both locally and on Heroku so:
if os.environ.get('PORT'):
  # We're hosted on Heroku! Use the MongoHQ sandbox as our backend.
  MONGO_HOST = 'alex.mongohq.com'
  MONGO_PORT = 10047
  MONGO_USERNAME = 'evedemo'
  MONGO_PASSWORD = 'evedemo'
  MONGO_DBNAME = 'app9346575'

  # also, correctly set the API entry point
  SERVER_NAME = 'eve-demo.herokuapp.com'
else:
  # Running on local machine. Let's just use the local mongod instance.
  MONGO_HOST = 'localhost'
  MONGO_PORT = 27017
  MONGO_USERNAME = 'hashg'
  MONGO_PASSWORD = 'gowda'
  MONGO_DBNAME = 'scrum'

  # let's not forget the API entry point
  SERVER_NAME = 'localhost:5000'


# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

# Disables HATEOAS
HATEOAS = False

# Enable EMBEDDING
EMBEDDING = True

# Enable SORTING
SORTING = True

#ID Field
# ID_FIELD = 'id'

# Our API will expose two resources (MongoDB collections): 'people' and
# 'works'. In order to allow for proper data validation, we define beaviour
# and structure.
profiles = {
  # 'title' tag used in item links.
  'item_title': 'profiles',

  
  # by default the standard item entry point is defined as
  # '/people/<ObjectId>/'. We leave it untouched, and we also enable an
  # additional read-only entry point. This way consumers can also perform GET
  # requests at '/people/<lastname>/'.
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'lastname'
  },

  'hateoas': False,
  'auth_field': 'created',

  'extra_response_fields': ['firstname', 'lastname'],

  # Schema definition, based on Cerberus grammar. Check the Cerberus project
  # (https://github.com/nicolaiarocci/cerberus) for details.
  'schema': {
    'firstname': {
      'type': 'string',
      'minlength': 1,
      'maxlength': 25,
    },
    'lastname': {
      'type': 'string',
      'minlength': 1,
      'maxlength': 25,
      'required': True,
      # talk about hard constraints! For the purpose of the demo
      # 'lastname' is an API entry-point, so we need it to be unique.
      # 'unique': True,
    },
    # 'role' is a list, and can only contain values from 'allowed'.
    'role': {
      'type': 'list',
      'allowed': ["author", "contributor", "copy"],
    },
    # An embedded 'strongly-typed' dictionary.
    'location': {
      'type': 'dict',
      'schema': {
        'address': {'type': 'string'},
        'city': {'type': 'string'}
      },
    },
    'born': {
      'type': 'datetime',
    }
  }
}


projects = {
  # 'title' tag used in item links.
  'item_title': 'projects',
  'extra_response_fields': ['name'],
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  'embeddable ' : True,

  'additional_lookup': {
    'url': '[\w]+',
    'field': 'name'
  },

  'schema': {
    'name': {
      'type': 'string',
      'minlength': 5,
      'maxlength': 25,
    },
    'sprints': {
     'type': 'list',
     'schema': {
        'type': 'objectid',
        'data_relation': {
          'resource': 'sprints',
          'field': '_id',
          'embeddable': True

        }
      }
    }
  }
}

sprints = {
  # 'title' tag used in item links.
  'item_title': 'sprints',
  'extra_response_fields': ['name', 'project_id'],
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  'embeddable ' : True,
  
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'name'
  },

  'schema': {
    'name': {
      'type': 'string',
      'minlength': 5,
      'maxlength': 25,
    },
    'project_id': {
      'type': 'objectid',
      'data_relation': {
        'resource': 'projects',
        'field': '_id',
        'embeddable': True
      }
    },
    'stories': {
     'type': 'list',
     'schema': {
        'type': 'objectid',
        'data_relation': {
          'resource': 'stories',
          'field': '_id',
          'embeddable': True
        }
      }
    }
  }
}


stories = {
  # 'title' tag used in item links.
  'item_title': 'stories',
  'extra_response_fields': ['name', 'sprint_id'],
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'name'
  },

  'schema': {
    'name': {
      'type': 'string',
      'minlength': 5,
      'maxlength': 25,
    },
    'sprint_id': {
      'type': 'objectid',
      'data_relation': {
        'resource': 'sprints',
        'field': '_id'
      }
    },
    'tasks': {
     'type': 'list',
     'schema': {
        'type': 'objectid',
        'data_relation': {
          'resource': 'tasks',
          'field': '_id',
        }
      }
    }
  }
}

tasks = {
  # 'title' tag used in item links.
  'item_title': 'tasks',
  'extra_response_fields': ['name', 'story_id'],
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'name'
  },

  'schema': {
    'name': {
      'type': 'string',
      'minlength': 5,
      'maxlength': 25,
    },
    'story_id': {
      'type': 'objectid',
      'data_relation': {
        'resource': 'stories',
        'field': '_id'
      }
    },
  }
}




accounts = {
  # the standard account entry point is defined as
  # '/accounts/<ObjectId>/'. We define an additional read-only entry
  # point accessible at '/accounts/<username>/'.
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'username',
  },
  'public_methods' : ['GET', 'POST', 'DELETE'],
  'public_item_methods' : ['GET', 'POST', 'DELETE'],
  # We also disable endpoint caching as we don't want client apps to
  # cache account data.
  'cache_control': '',
  'cache_expires': 0,

  # Only allow superusers and admins.
  # 'allowed_roles': ['superuser', 'admin'],

  # Allow 'token' to be returned with POST responses
   'extra_response_fields': ['token'],

  # Finally, let's add the schema definition for this endpoint.
  'schema': {
    'username': {
      'type': 'string',
      'required': True,
      'unique': True,
      },
    'password': {
      'type': 'string',
      'required': True,
    },
    'email': {
      'type': 'string',
      'required': True,
    },
    # 'roles': {
    #   'type': 'list',
    #   'allowed': ['user', 'superuser', 'admin'],
    #   'required': True,
    # },
    #  'token': {
    #   'type': 'string',
    #   'required': True,
    # }
  }
}

session = {
  'additional_lookup': {
    'url': '[\w]+',
    'field': 'username'
  },
  'item_lookup': True,
  'resource_methods': ['POST', 'DELETE', 'GET'],
  'item_methods': ['DELETE'],
  'public_methods' : ['POST', 'GET'],
  'public_item_methods' : ['DELETE'],
  'extra_response_fields': ['token'],

  # Allow 'token' to be returned with POST responses
   'extra_response_fields': ['username','token'],

  # Finally, let's add the schema definition for this endpoint.
  'schema': {
    'auth' : {
      'type': 'string',
      'required': True,
      'unique': True,
      'isExistAcct': True
    },
    'username': {
      'type': 'string',
      'required': False,
      'unique': True,
    },
    'token': {
      'type': 'string',
      'required': False,
    }
  }
}

vacations = {
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  'extra_response_fields': ['from_date', 'to_date', 'comments', 'country', 'state', 'city', 'account_id'],

  # Finally, let's add the schema definition for this endpoint.
  'schema': {
    'from_date' : {
      'type': 'datetime',
      'required': True,
    },
    'to_date' : {
      'type': 'datetime',
      'required': False,
    },
    'comments': {
      'type': 'string',
      'required': False,
    },
    'country' : {
      'type': 'string',
      'required': True,
    },
    'state' : {
      'type': 'string',
      'required': False,
    },
    'city': {
      'type': 'string',
      'required': False,
    },
    'account_id': {
      'type': 'objectid',
      'data_relation': {
        'resource': 'accounts',
        'field': '_id'
      }
    },
  }  
}

holidays = {
  'public_methods' : ['GET'],
  'public_item_methods' : ['GET'],
  'extra_response_fields': ['name', 'from_date', 'to_date', 'comments', 'country', 'state', 'city'],


  # Finally, let's add the schema definition for this endpoint.
  'schema': {
    'name' : {
      'type': 'string',
      'required': True,
    },
    'from_date' : {
      'type': 'datetime',
      'required': True,
    },
    'to_date' : {
      'type': 'datetime',
      'required': False,
    },
    'comments': {
      'type': 'string',
      'required': False,
    },
    'country' : {
      'type': 'string',
      'required': True,
    },
    'state' : {
      'type': 'string',
      'required': False,
    },
    'city': {
      'type': 'string',
      'required': False,
    }
  }  
}

# The DOMAIN dict explains which resources will be available and how they will
# be accessible to the API consumer.
DOMAIN = {
  'projects': projects,
  'sprints': sprints,
  'stories': stories,
  'tasks': tasks,
  'accounts': accounts,
  'session': session,
  'profiles': profiles,
  'vacations': vacations,
  'holidays': holidays
}
