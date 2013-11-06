import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';

var Attachments = Eve.extend({
  name: Ember.attr(),
});

Attachments.adapter = ScrumAdapter.create();
Attachments.url = "/attachments";

export default Attachments;