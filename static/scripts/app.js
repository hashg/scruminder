var Scruminder = window.Scruminder = Ember.Application.create({
	rootElement: '#ember-app'
});

Scruminder.IndexRoute = Em.Route.extend({
  redirect: function(){
    this.transitionTo('persons');
  }
});
/* Order and include as you please. */
// require('scripts/routes/*');
// require('scripts/controllers/*');
// require('scripts/models/*');
// require('scripts/views/*');
// require('scripts/router');
