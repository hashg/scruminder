import Sprints from 'appkit/models/sprints';

var SprintController = Ember.ObjectController.extend({
  content: null,
  
  filterText: '',
  filteredContent: function() {
    var self = this;
    var filter = this.get('filterText');
    if (Ember.isEmpty(filter)) {
      return this.get('content').get('stories');
    } else {
      return this.get('content').get('stories').filter(function(item, index, enumerable){
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
    deleteSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this sprint?")) {
        var id = self.get('id');
        var sprint = Sprints.find(id);
        sprint.deleteRecord().then(
          function()
          {
            Ember.Logger.info('deleteSprint: Deleted');
            self.transitionToRoute('project');
          }, 
          function()
          {
            Ember.Logger.info('deleteSprint: Delete failed!');
          }
        );
      }
    }
  }
});

export default SprintController;