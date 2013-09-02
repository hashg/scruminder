import Resolver from 'resolver';

var Scruminder = Ember.Application.create({
  rootElement: '#ember-app',
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_BINDINGS: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_ACTIVE_GENERATION: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  ready: function() {
    console.log('Ready()');
  },
  lookupStore: function() {
    return this.__container__.lookup('store:main');
  },
  lookupRouter: function() {
    return this.__container__.lookup('router:main');
  },
  lookupController: function(controllerName, options) {
    return this.__container__.lookup('controller:' + controllerName, options);
  },
  lookupContainer: function() {
    return this.__container__;
  }
});

import routes from 'appkit/routes';
Scruminder.Router.map(routes); // TODO: just resolve the router

export default Scruminder;