import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Stories from 'appkit/models/stories';

var Tasks = Eve.extend({
  name: Ember.attr(),
  story_id: Ember.attr(),
  // story: Ember.belongsTo(Stories, {key: 'story_id'}),
});

Tasks.adapter = ScrumAdapter.create();
Tasks.url = "/tasks";

export default Tasks;