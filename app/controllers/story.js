import Stories from 'appkit/models/stories';

var StoryController = Ember.ObjectController.extend({
  content: null,

  filterText: '',
  filteredContent: function() {
    var self = this;
    var filter = this.get('filterText');
    if (Ember.isEmpty(filter)) {
      return this.get('content').get('tasks');
    } else {
      return this.get('content').get('tasks').filter(function(item, index, enumerable){
        var regx = new RegExp(filter, "ig");
        var name = item.get('name');
        var tmp = name + "/" + filter + "/" + regx.test(name);
        if (regx.test(name)===true)
          var t = 'truthy';

        return regx.test(name);
      });
    }
  }.property('filterText'),

  actions: {
    deleteStory: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this story?")) {
        var id = self.get('id');
        var story = Stories.find(id);
        story.deleteRecord().then(
          function()
          {
            Ember.Logger.info('deleteStory: Deleted');
            self.transitionToRoute('sprint');
          }, 
          function()
          {
            Ember.Logger.info('deleteStory: Delete failed!');
          }
        );
      }
    }
  }
});

export default StoryController;