import Vacation from 'appkit/models/vacation';
import Person from 'appkit/models/person';

var PersonNewController = Ember.ObjectController.extend({
  needs: ['person'],
  content: null,
  toDate: "",
  fromDate: "",
  comments: "",
  parent_id: Ember.computed.alias('controllers.person.id'),
  operson : Ember.computed.alias('controllers.person'),
  actions: {
    addVacation: function() {
      var vacation;
      var self = this;
      vacation = this.get('content');
      if (vacation) {
        vacation.set('toDate', this.get('toDate'));
        vacation.set('fromDate', this.get('fromDate'));
        vacation.set('comments', this.get('comments'));
        vacation.set('person', this.get('operson'));
      } else {        
        vacation = Vacation.create({
          'toDate': this.get('toDate'),
          'fromDate': this.get('fromDate'),
          'comments': this.get('comments'),
          'person': this.get('operson')
        });
      }

      vacation.submit().then(
      function()
      {
        Ember.Logger.info('success');
        self.resetProperties();
        self.transitionToRoute('vacations.new');
      },
      function()
      {
        Ember.Logger.info('failure');
      });
    },
    cancelVacation: function() {
      this.resetProperties();
      this.transitionToRoute('vacations');
    },
    resetProperties: function() {
      Ember.Logger.info('resetProperties');
      var vacation = this.get('content');
      if (vacation)
        this.set('content', null);
      return this.setProperties({'toDate': null, 'fromDate': null, 'comments': null, 'person': null});
    }
  }
});

export default PersonNewController;