import Sprints from 'appkit/models/sprints';

var SprintEditRoute = Ember.Route.extend({
  model: function(){ 
    return this.modelFor('sprint');
  }
});

export default SprintEditRoute;