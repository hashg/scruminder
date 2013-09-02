import Person from 'appkit/models/person';
import Vacation from 'appkit/models/vacation';

var PersonRoute = Ember.Route.extend({
  model: function (params) {
    return Person.find(params.person_id);
  }
});

export default PersonRoute;

