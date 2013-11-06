import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';

var Accounts = Eve.extend({
  username: Ember.attr(),
  password: Ember.attr(),
  email: Ember.attr(),  
});

Accounts.adapter = ScrumAdapter.create();
Accounts.url = "/accounts";

export default Accounts;