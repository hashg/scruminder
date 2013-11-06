import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import datetime from 'appkit/utils/datetime';

var Holidays = Eve.extend({
  name: Ember.attr(),
  from_date: Ember.attr(datetime),
  to_date: Ember.attr(datetime),
  comments: Ember.attr(),
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr()
});

Holidays.adapter = ScrumAdapter.create();
Holidays.url = "/holidays";

export default Holidays;