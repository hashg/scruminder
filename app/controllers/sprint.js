import filter from 'appkit/utils/filter';

var SprintController = Ember.ObjectController.extend({
  content: null,
  search: '',

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-story-list", srch);
    });
  }.observes('search')
});

export default SprintController;