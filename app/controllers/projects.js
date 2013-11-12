import filter from 'appkit/utils/filter';

var ProjectsController = Ember.ArrayController.extend({
  content: null,
  search: '',

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-projects-list", srch);
    });
  }.observes('search')
});

export default ProjectsController;