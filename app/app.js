import Resolver from 'resolver';

var Scruminder = Ember.Application.create({
  rootElement: '#ember-app',
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  resolver: Resolver
});

import routes from 'appkit/routes';
Scruminder.Router.map(routes); // TODO: just resolve the router

export default Scruminder;