import Person from 'appkit/models/person';

// var PersonsRoute = AuthenticatedRoute.extend({});
var PersonsRoute = Ember.Route.extend({
  model: function()
  {
    return Person.find();
  }
});

export default PersonsRoute;