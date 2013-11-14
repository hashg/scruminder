import filter from 'appkit/utils/filter';
import Holidays from 'appkit/models/holidays';

var HolidaysController = Ember.ArrayController.extend({
  content: null,

  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-holidays-list", srch);
    });
  }.observes('search'),

  actions: {
    deleteHoliday: function(record) {
      var self = this;
      if (window.confirm("Are you sure you want to delete this holiday?")) {
        record.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteHoliday:Deleted');
            self.transitionToRoute('holidays');
          }, 
          function() {
            Ember.Logger.info('deleteHoliday:Delete failed!');
          }
        );
      }/*if*/
    }
  }
});

export default HolidaysController;