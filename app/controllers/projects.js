
var ProjectsController = Ember.ArrayController.extend({
  content: [],
  sortProperties: ['updated'],
  sortAscending: false,
  
  filterText: '',
  filteredContent: function() {
    var self = this;
    var filter = this.get('filterText');
    if (Ember.isEmpty(filter)) {
      return this.get('content');
    } else {
      return this.get('content').filter(function(item, index, enumerable) {
        var regx = new RegExp(filter, "ig");
        var name = item.get('name');
        return regx.match(name);
      });
    }
  }.property('filterText')
});

export default ProjectsController;