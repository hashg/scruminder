import Holidays from 'appkit/models/holidays';

var get = Ember.get;
var HolidaysNewController = Ember.ObjectController.extend({
  needs: ['holidays'],
  content: null,
  name: '',
  from_date: '',
  to_date: '',
  city: '',
  state: '',
  country: '',
  comments: '',
  actions: {
    newHoliday: function() {
      var self = this;
      var holiday = Holidays.create({
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

export default HolidaysNewController;