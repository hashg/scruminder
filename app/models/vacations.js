import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import datetime from 'appkit/utils/datetime';

var Vacations = Eve.extend({
  account_id: Ember.attr(),
  from_dt: Ember.attr(datetime),
  to_dt: Ember.attr(datetime),
  comments: Ember.attr(),
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr()
});

Vacations.adapter = ScrumAdapter.create();
Vacations.url = "/vacations";

export default Vacations;