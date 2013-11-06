import Holidays from 'appkit/models/holidays';

var HolidaysRoute = Ember.Route.extend({
  model:function() {
    return Holidays.find();
  },
  deactivate: function() {
   //clear the search filed on the list when transitioning to new page.
    this.controllerFor('holidays').set('search', '');
  }
});

export default HolidaysRoute;