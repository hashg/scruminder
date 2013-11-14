import Holidays from 'appkit/models/holidays';

var get = Ember.get;
var HolidaysEditController = Ember.ObjectController.extend({  
  content: null,
  needs: ['holidays'],
  // id: Ember.computed.alias('controllers.holidays.id'),
  // etag: Ember.computed.alias('controllers.holidays.etag'),
  // name: Ember.computed.alias('controllers.holidays.name'),
  // from_date: Ember.computed.alias('controllers.holidays.from_date'),
  // to_date: Ember.computed.alias('controllers.holidays.to_date'),
  // city: Ember.computed.alias('controllers.holidays.city'),
  // state: Ember.computed.alias('controllers.holidays.state'),
  // country: Ember.computed.alias('controllers.holidays.country'),
  // comments: Ember.computed.alias('controllers.holidays.comments'),
  actions: {
    editHoliday: function() {
      var self = this;
      var id = self.get('id');
      var holiday = Holidays.find(id);
      holiday.setProperties({
        name : self.get('name'),
        from_date : self.get('from_date'),
        to_date : self.get('to_date'),
        city : self.get('city'),
        state : self.get('state'),
        country : self.get('country'),
        comments : self.get('comments')
      });
      holiday.save().then(function(){
        self.resetProperties();
        self.transitionToRoute('holidays');
      }, function(){
        self.set('errorMessage', "save failed");
      });
    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default HolidaysEditController;