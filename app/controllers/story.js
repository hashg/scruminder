import filter from 'appkit/utils/filter';

var StoryController = Ember.ObjectController.extend({
  content: null,
  search: '',

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-task-list", srch);
    });
  }.observes('search')
});

export default StoryController;