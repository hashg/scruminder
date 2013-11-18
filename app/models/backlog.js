import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';

var Backlog = Eve.extend({
  name: Ember.attr(),
  priority: Ember.attr(),
  type: Ember.attr(),
  description: Ember.attr(),
  project: Ember.attr(), //belongsTo Parent
});

Backlog.adapter = ScrumAdapter.create();
Backlog.url = "/backlog";

export default Backlog;