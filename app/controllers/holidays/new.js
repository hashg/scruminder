import Holidays from 'appkit/models/holidays';

var get = Ember.get;
var HolidaysNewController = Ember.ObjectController.extend({
  needs: ['holidays'],
  content: null,
  name: '',
  from_dt: '',
  to_dt: '',
  city: '',
  state: '',
  country: '',
  comments: '',
  actions: {
    newHoliday: function() {
      var self = this;
      var holiday = Holidays.create({
        name : self.get('name'),
        from_dt : self.get('from_dt'),
        to_dt : self.get('to_dt'),
        city : self.get('city'),
        state : self.get('state'),
        country : self.get('country'),
        comments : self.get('comments')
      });
      holiday.save().then(function(){
        self.resetProperties();
        self.transitionToRoute('holidays');
      }, function(){
        self.set('errorMessage', "HolidaysNewController:save failed");
      });
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: null,
      from_dt: null,
      to_dt: null,
      city: null,
      state: null,
      country: null,
      comments: null
    });
  }
});

export default HolidaysNewController;