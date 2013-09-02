import Vacation from 'appkit/models/vacation';

var VacationsRoute = Ember.Route.extend({
  model: function (params) {
    Ember.Logger.info("VacationsRoute:model");
    return Vacation.find(params.person_id);
  }
});

export default VacationsRoute;