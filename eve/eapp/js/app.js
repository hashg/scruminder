// setup Ember.SimpleAuth in an initializer
  Ember.Application.initializer({
    name: 'authentication',
    initialize: function(container, application) {
      //customize the session so that it handles the custom payload as well as the additional authenticated account
      Ember.SimpleAuth.Session.reopen({
        init: function() {
          this._super();
          //initializer the accountId from data potentially already present in the
          //sessionStorage (Ember.SimpleAuth.Session does this out of the box for authToken)
          this.set('authToken', sessionStorage.authToken);
          this.set('username', sessionStorage.username);
          this.set('etag', sessionStorage.etag);
          this.set('_id', sessionStorage._id);
        },
        setup: function(serverSession) {
          var data = serverSession.data;
          if (data) {
            if (data.status === 'OK')
            {
              this.set('authToken', data.token);
              this.set('username', data.username);
              this.set('etag', data.etag);
              this.set('_id', data._id);
            }
          }
        },
        destroy: function() {
          this._super();
          this.set('authToken', undefined);
          this.set('username', undefined);
          this.set('etag', undefined);
          this.set('_id', undefined);

        },
        authTokenObserver: Ember.observer(function() {
          var authToken = this.get('authToken');
          var username = this.get('username');
          var etag = this.get('etag');
          if (Ember.isEmpty(authToken) && Ember.isEmpty(username) && Ember.isEmpty(etag)) {
            delete sessionStorage.authToken;
            delete sessionStorage.username;
            delete sessionStorage.etag;
            delete sessionStorage._id;
          } else {
            sessionStorage.authToken = this.get('authToken');
            sessionStorage.username = this.get('username');
            sessionStorage.etag = this.get('etag');
            sessionStorage._id = this.get('_id');
          }
        }, '_id')
      });
      //set a custom session endpoint
      Ember.SimpleAuth.setup(application, { serverSessionRoute: '/session' });
    }
  });

  App = Ember.Application.createWithMixins(EmberFormComponents.Register,{
    rootElement: '#ember-app'
  });

  /*-----------------------------Data Model-----------------------------------*/
  Ember.RESTAdapter.reopen({
  buildURL: function(klass, id) {
    var urlRoot = Ember.get(klass, 'url');
    // urlRoot = "http://localhost:5000/people";
    if (!urlRoot) { throw new Error('Ember.RESTAdapter requires a "url" property to be specified'); }

    if (!Ember.isEmpty(id)) {
      return urlRoot + "/" + id + "/";
    } else {
      return urlRoot + "/";
    }
  },
  saveRecord: function(record) {
    var primaryKey = Ember.get(record.constructor, 'primaryKey'),
        url = this.buildURL(record.constructor, Ember.get(record, primaryKey)),
        self = this;

    return this.ajax(url, record.toJSON(), "PATCH").then(function(data) {  // TODO: Some APIs may or may not return data
      self.didSaveRecord(record, data);
      /*We need to always pass and update 'etag' for PUT/PATCH/Delete request. This is the only way I could get the etag updated.*/
      Ember.run(function(){
        record.reload();
      });
      /**/
      return record;
    });
  },
  _ajax: function(url, params, method) {
    var settings = this.ajaxSettings(url, method) ;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (params) {
        settings.headers = {"Authorization": "Basic " + localStorage.authToken};
        settings.headers["If-Match"] = params.etag;
        settings.contentType = "application/json; charset=utf-8";
        if (method === "GET") {
          settings.data = params;
        }

        if(method === "POST" || method === "PUT" || method === "PATCH") {
          if (method === "PUT" || method === "PATCH") {
            delete params['_id'];
            delete params['etag'];
          }
          var mydata = {};
          mydata['data'] = params;  
          settings.data = JSON.stringify(mydata); 
        }
      }

      settings.success = function(json) {
        // if ( json.data )
        //   Ember.run(null, resolve, json.data);
        // else
          Ember.run(null, resolve, json);
      };

      settings.error = function(jqXHR, textStatus, errorThrown) {
        // https://github.com/ebryn/ember-model/issues/202
        if (jqXHR) {
          jqXHR.then = null;
        }
        
        Ember.run(null, reject, jqXHR);
      };


      Ember.$.ajax(settings);
   });
  }
});
/*-----------------------------Data Model-----------------------------------*/
  Ember.SimpleAuth.LogoutRouteMixin.reopen({
    beforeModel: function() {
      var self = this;
      Ember.$.ajax(Ember.SimpleAuth.serverSessionRoute + "/" + sessionStorage._id, {type: 'DELETE', headers:{ "If-Match": sessionStorage.etag} }).always(function(response) {
        self.get('session').destroy();
        self.transitionTo(Ember.SimpleAuth.routeAfterLogout);
      });
    }
  });

  App.Router.map(function() {
    this.route('register');
    this.route('forgot');
    // routes for login/logout
    this.route('login');
    this.route('logout');
    //protected routes that are inaccessible without authentication
    this.route('protected');
    this.resource('projects', {path: 'projects'}, function(){
      this.resource('project', {path: ':project_id'});
    });
    this.resource('sprint', {path: 'projects/:project_id/sprints/:sprint_id'});
    this.resource('story', {path: 'projects/:project_id/sprints/:sprint_id/stories/:story_id'});
  });

  App.ProjectsRoute = Ember.Route.extend({
    model:function() {
      return App.Projects.find();
    },
  });

  App.ProjectRoute = Ember.Route.extend({
    model:function(params) {
      console.log(params);
      return App.Projects.find(params.project_id);
    },
    setupController: function(controller, model){
      this._super(controller, model);
      controller.set('content', model);
    }
  });

  App.SprintRoute = Ember.Route.extend({
    serialize: function(model, params){
      return {project_id: model.get('project.id'),sprint_id: model.get('id')};
    },
    setupController: function(controller, model){
      this._super(controller, model);
      controller.set('content', model);
    },
    model:function(params) {
      console.log(params);
      return App.Sprints.find(params.sprint_id);
    },
  });

  App.StoryRoute = Ember.Route.extend({
    serialize: function(model, params){
      return {        
        project_id: model.get('sprint.project.id'),
        sprint_id: model.get('sprint.id'),
        story_id: model.get('id')
      };
    },
    setupController: function(controller, model){
      this._super(controller, model);
      controller.set('content', model);
    },
    model:function(params) {
      // console.log(params);
      // var project = this.modelFor('project');
      // var sprint = this.modelFor('sprint');
      // debugger;
      return App.Stories.find(params.story_id);
    },
  });




  App.Projects = Ember.Model.extend({
    _id: Ember.attr(),
    name: Ember.attr(),
    etag: Ember.attr(),
    sprints: Ember.hasMany("App.Sprints", {key: 'sprints'}),
    id : function() {
      return this.get('_id');
    }.property('_id')
  });
  // App.Projects.urlRoot = "http://localhost:8000";
  App.Projects.url = "/projects";
  App.Projects.primaryKey = '_id';
  App.Projects.adapter = Ember.RESTAdapter.create({
    createRecord: function(record) {
      var url = this.buildURL(record.constructor),
          self = this,
          json = record.toJSON();
      return this.ajax(url, json, "POST").then(function(data) {
        self.didCreateRecord(record, data.data);
        return record;
      });
    }
  });

  App.Sprints = Ember.Model.extend({
    _id: Ember.attr(),
    name: Ember.attr(),
    etag: Ember.attr(),
    project: Ember.belongsTo("App.Projects", {key: 'project_id'}),
    stories: Ember.hasMany("App.Stories", {key: 'stories'}),
    id : function() {
      return this.get('_id');
    }.property('_id')
  });

  // App.Projects.urlRoot = "http://localhost:8000";
  App.Sprints.url = "/sprints";
  App.Sprints.primaryKey = '_id';
  App.Sprints.adapter = Ember.RESTAdapter.create({
    createRecord: function(record) {
      var url = this.buildURL(record.constructor),
          self = this,
          json = record.toJSON();
      return this.ajax(url, json, "POST").then(function(data) {
        self.didCreateRecord(record, data.data);
        return record;
      });
    }
  });

  App.Stories = Ember.Model.extend({
    _id: Ember.attr(),
    name: Ember.attr(),
    etag: Ember.attr(),
    sprint: Ember.belongsTo("App.Sprints", {key: 'sprint_id'}),
    id : function() {
      return this.get('_id');
    }.property('_id')
  });
  App.Stories.url = "/stories";
  App.Stories.primaryKey = '_id';
  App.Stories.adapter = Ember.RESTAdapter.create({
    createRecord: function(record) {
      var url = this.buildURL(record.constructor),
          self = this,
          json = record.toJSON();
      return this.ajax(url, json, "POST").then(function(data) {
        self.didCreateRecord(record, data.data);
        return record;
      });
    }
  });






  // login controller that display an error if the login fails
  App.LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, EmberFormComponents.Form,{
    // serialize the credentials from the view to what the server expects
    username:'',
    password:'',
    // valueObserver: function() {
    //   console.log(this.get('isFormValid'));
    // }.observes('username', 'password'),
    actions: {
      login: function() {
        if(!this.get('isFormValid')){
          this.set('showFieldValidation', true);
        }
        this._super();
        this.resetProperties();
      }
    },
    serializeCredentials: function(identification, password) {
      return {"data": { "auth": btoa(identification+":"+password) } };
      // return {"data": { "username": identification, "password": password } };
    },
    serverFailed: function(msg) {
      this.set('errorMessage', "Server Failure");
    },
    loginFailed: function(msg) {
      this.set('errorMessage', msg);
    },
    resetProperties: function() {
      this.set('username', null);
      this.set('password', null);
      console.log('cleaned');
    }
  });

  // make sure the controller doesn't keep stale data
  App.LoginRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      controller.setProperties({
        identification: undefined, password: undefined, errorMessage: undefined
      });
    }
  });
  App.LogoutRoute = Ember.Route.extend(Ember.SimpleAuth.LogoutRouteMixin);

  // make these routes protected
  App.ProtectedRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin);

  App.FormComp = Ember.Controller.extend(EmberFormComponents.Form,{});
  App.RegisterController = App.FormComp.extend({
    username:'',
    password:'',
    email:'',
    validateEmail: function (email, callback) {
      // Insert AJAX call here:
      setTimeout(function () {
        callback(true, 'Email address available');
      }, 1000);
    },
    actions: {
      register: function() {
        if(this.get('isFormValid')){
          console.log(JSON.stringify(this.getProperties('username', 'email', 'password')));
          this.resetProperties();
          this.transitionToRoute('index');
        }
        else{
          this.set('showFieldValidation', true);
        }
      }
    },
    serverFailed: function(msg) {
      this.set('errorMessage', "Server Failure");
    },
    loginFailed: function(msg) {
      this.set('errorMessage', msg);
    },
    resetProperties: function() {
      this.set('username', null);
      this.set('password', null);
      this.set('email', null);
    }
  });

  App.ForgotController = App.FormComp.extend({
    email:'',
    validateEmail: function (email, callback) {
      // Insert AJAX call here:
      setTimeout(function () {
        callback(true, 'Email address available');
      }, 1000);
    },
    actions: {
      forgot: function() {
        if(this.get('isFormValid')){
          console.log(JSON.stringify(this.getProperties('email')));
          this.resetProperties();
          this.transitionToRoute('index');
        }
        else{
          this.set('showFieldValidation', true);
        }
      }
    },
    serverFailed: function(msg) {
      this.set('errorMessage', "Server Failure");
    },
    loginFailed: function(msg) {
      this.set('errorMessage', msg);
    },
    resetProperties: function() {
      this.set('email', null);
    }
  });


