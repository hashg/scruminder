import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Sprints from 'appkit/models/sprints';
import Tasks from 'appkit/models/tasks';
import Float from 'appkit/utils/float';

var Stories = Eve.extend({
  name: Ember.attr(),
  sprint_id: Ember.attr(),
  tasks: Ember.hasMany(Tasks, {key: 'tasks'}),
  priority: Ember.attr(Number),
  customer: Ember.attr(),
  disposition: Ember.attr(),
  stat: Ember.attr(),
  tracker: Ember.attr(),
  estimate: Ember.attr(),
  description: Ember.attr()
  // sprint: Ember.belongsTo(Sprints, {key: 'sprint_id'}),
});

Stories.adapter = ScrumAdapter.create();
Stories.url = "/stories";

export default Stories;