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

myajax = function (options) {
  "use strict";
  console.log('Scruminder.ajax');
  var deferred = $.Deferred(),
      successHandler,
      xhr;

  // force no-cache
  options.cache = false;
  options.contentType= 'application/json';
  options.dataType= 'json';
  options.type= 'post'; 
  successHandler = options.success;

  options.success = function (data) {
    var contentType = xhr.getResponseHeader("Content-Type"),
        args = [].slice.call(arguments, 0);

    // no redirect; forward everything to the success handler(s)
    if( typeof successHandler === 'function' ) {
      successHandler.apply(null, args);
      deferred.resolve.apply(null, args);
    }
  };


  // Make the request
  xhr = $.ajax(options);

  // Forward the deferred promise method(s)
  // xhr.success(deferred.done);
  xhr.fail(deferred.reject);
  xhr.progress(deferred.notify);

  // Replace the ones already on the xhr obj
  deferred.promise(xhr);

  return xhr;
};

Scruminder.LoginController = Em.ObjectController.extend({
  content: [],
  token: localStorage.token,
  tokenChanged: function(){
    localStorage.token = this.get('token');
    log.info('token changed');
  }.observes('token'),
  reset: function(){
    this.setProperties({
      username:"",
      password:""
    });
  },
  login: function(){
    var self = this;
    var data = this.getProperties('username', 'password');
    myajax({
      url: '/api/login',
      data: JSON.stringify(data),
      success: function(response){
                log.info('response');
                self.set('token', response.token);
                var attemptedTransition = self.get('attemptedTransition');
                if(attemptedTransition){
                  attemptedTransition.retry();
                  self.set('attemptedTransition', null)
                } else {
                  self.transitionToRoute('projects');
                }
              }
    }).fail(function(response){
      log.error("failed!");
    });
    
    // $.ajax({
    //   contentType: "application/json",
    //   dataType: 'json',
    //   type: 'post', 
    //   url: '/api/login', 
    //   cache: false,
    //   data: JSON.stringify({"username": "harish", "password": "gowda"}) 
    // })
    // .done(function(response){
    //   self.set('token', response.token);
    //   var attemptedTransition = self.get('attemptedTransition');
    //   if(attemptedTransition){
    //     attemptedTransition.retry();
    //     self.set('attemptedTransition', null)
    //   } else {
    //     self.transitionToRoute('projects');
    //   }
    // })
    // .fail(function(response){
    //   log.error("failed!");
    // });
    


    // $.post('/api/login', data, json).then(
    // function (response) {
    //   console.log(response);
    //   if (response.success){
        // self.set('token', response.token);
        // var attemptedTransition = self.get('attemptedTransition');
        // if(attemptedTransition){
        // 	attemptedTransition.retry();
        // 	self.set('attemptedTransition', null)
        // } else {
        // 	self.transitionToRoute('projects');
        // }
    //   }
    // },
    // function (json){
    //   log.error('Error');
    // });
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

Scruminder.PersonsRoute = Scruminder.AuthenticatedRoute.extend({
  model: function(){
    return ['1'];
  }
});

/* Order and include as you please. */
// require('scripts/routes/*');
// require('scripts/controllers/*');
// require('scripts/models/*');
// require('scripts/views/*');
// require('scripts/router');
