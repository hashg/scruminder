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
        'name': this.get('name'),
        'from_date': this.get('from_date'),
        'to_date': this.get('to_date'),
        'city': this.get('city'),
        'state': this.get('state'),
        'country': this.get('country'),
        'comments': this.get('comments')
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