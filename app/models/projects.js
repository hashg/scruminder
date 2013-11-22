import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Sprints from 'appkit/models/sprints';
import People from 'appkit/models/people';
import Backlog from 'appkit/models/backlog';

var Projects = Eve.extend({
  name: Ember.attr(),
  description: Ember.attr(),
  sprints: Ember.hasMany(Sprints, {key: 'sprints'}),
  people: Ember.hasMany(People, {key: 'people'}), /*TODO: Add role to people*/
  backlogs: Ember.hasMany(Backlog, {key: 'backlog'}), 
  current_sprint_id: Ember.attr()
});

Projects.adapter = ScrumAdapter.create();
Projects.url = "/projects";

export default Projects;