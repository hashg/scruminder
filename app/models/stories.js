import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Sprints from 'appkit/models/sprints';
import Tasks from 'appkit/models/tasks';

var Stories = Eve.extend({
  name: Ember.attr(),
  tasks: Ember.hasMany(Tasks, {key: 'tasks'}),
  sprint: Ember.belongsTo(Sprints, {key: 'sprint_id'}),
});

Stories.adapter = ScrumAdapter.create();
Stories.url = "/stories";

export default Stories;