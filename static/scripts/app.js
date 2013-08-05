var log = Em.Logger;

var Scruminder = window.Scruminder = Ember.Application.create({
  rootElement: '#ember-app'
});

Ember.TextField.reopen({
    attributeBindings: ['accept', 'autocomplete', 'autofocus', 'name', 'required']
});

Scruminder.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    if (!this.controllerFor('login').get('token')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    alert('You must log in!');

    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  getJSONWithToken: function(url) {
    var token = this.controllerFor('login').get('token');
    return $.getJSON(url, { token: token });
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        alert('Something went wrong');
      }
    }
  }
});


Scruminder.IndexRoute = Em.Route.extend({
  redirect: function(){
    this.transitionTo('persons');
  }
});

Scruminder.LoginRoute = Em.Route.extend({
  setupController: function(controller, context){
    controller.reset();
  }
})

Scruminder.LoginController = Em.ObjectController.extend({
  content: [],
  token: localStorage.token,
  tokenChanged: function(){
    localStorage.token = this.get('token');
  }.observes('token'),
  reset: function(){
    this.setProperties({
      username:"",
      password:""
    });
  },
  login: function(){
    var self = this;
    log.info('Username: ' + self.get('username'));
    log.info('Passwd: ' + self.get('password'));

    var record = Scruminder.Login.create({
      username: self.get('username'),
      password: self.get('password')
    });
    record.save().then(
    function (json) {
      console.log(json);
      log.info('Success');
      self.set('token', '1234');
      var attemptedTransition = self.get('attemptedTransition');
      if(attemptedTransition){
      	attemptedTransition.retry();
      	self.set('attemptedTransition', null)
      } else {
      	self.transitionToRoute('projects');
      }
    },
    function (json){
      log.error('Error');
    });
    // record.save();
    // record.on("didCreateRecord", function(data) {
    //   var self = this;
    //   log.info(this._data.token);
    //   self.set('token', this._data.token);
    // });
  }
});

Scruminder.RegisterController = Em.ObjectController.extend({
  content: [],
  signup: function(){
    log.info(this.get('username'));
    log.info(this.get('password'));
    log.info(this.get('repassword'));
    log.info(this.get('email'));

    var newRegister = Scruminder.Register.create({
      username: this.get('username'),
      password: this.get('password'),
      repassword: this.get('repassword'),
      email: this.get('email')
    });
    newRegister.save();
  }
});

Scruminder.PersonsRoute = Scruminder.AuthenticatedRoute.extend();

/* Order and include as you please. */
// require('scripts/routes/*');
// require('scripts/controllers/*');
// require('scripts/models/*');
// require('scripts/views/*');
// require('scripts/router');
