import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Sprints from 'appkit/models/sprints';

var Projects = Eve.extend({
  name: Ember.attr(),
  sprints: Ember.hasMany(Sprints, {key: 'sprints'}),
  current_sprint_id: Ember.attr()
});

Projects.adapter = ScrumAdapter.create();
Projects.url = "/projects";

export default Projects;