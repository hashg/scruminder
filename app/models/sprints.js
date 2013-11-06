import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Projects from 'appkit/models/projects';
import Stories from 'appkit/models/stories';

var Sprints = Eve.extend({
  name: Ember.attr(),
  // project_id: Ember.attr(),
  project: Ember.belongsTo(Projects, {key: 'project_id'}),
  stories: Ember.hasMany(Stories, {key: 'stories'}),
});

Sprints.adapter = ScrumAdapter.create();
Sprints.url = "/sprints";

export default Sprints;