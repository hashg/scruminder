import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Projects from 'appkit/models/projects';
import Stories from 'appkit/models/stories';
import datetime from 'appkit/utils/datetime';

var Sprints = Eve.extend({
  name: Ember.attr(),
  // project_id: Ember.attr(),
  project: Ember.belongsTo(Projects, {key: 'project_id'}),
  stories: Ember.hasMany(Stories, {key: 'stories'}),
  start_dt: Ember.attr(datetime),
  end_dt: Ember.attr(datetime),
  description: Ember.attr()
});

Sprints.adapter = ScrumAdapter.create();
Sprints.url = "/sprints";

export default Sprints;