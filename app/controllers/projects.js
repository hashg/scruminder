import filter from 'appkit/utils/filter';

var ProjectsController = Ember.ArrayController.extend({
  content: null,
  search: '',
  count:  function(){
    return this.get('model.length');
  }.property('@each'),

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-projects-list", srch);
    });
  }.observes('search'),
  sortProperties: ['name'],
  sortAscending: true
  // actions: {
  //   sortName: function(){
  //     this.set('sortProperties', ['name']);
  //     this.toggleProperty('sortAscending');
  //   }  
  // },
  // sortAscending: false
});

export default ProjectsController;