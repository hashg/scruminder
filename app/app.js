import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';

var App = Ember.Application.createWithMixins(EmberFormComponents.Register,{
  // rootElement: '#ember-app',
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

App.initializer({
  // name: 'Register Components',
  // initialize: function(container, application) {
  //   registerComponents(container);
  // }
  name: 'authentication',
  initialize: function(container, application) {
    //customize the session so that it handles the custom payload as well as the additional authenticated account
    Ember.SimpleAuth.Session.reopen({
      init: function() {
        this._super();
        //initializer the accountId from data potentially already present in the
        //sessionStorage (Ember.SimpleAuth.Session does this out of the box for authToken)
        this.set('authToken', sessionStorage.authToken);
        this.set('username', sessionStorage.username);
        this.set('etag', sessionStorage.etag);
        this.set('_id', sessionStorage._id);
      },
      setup: function(serverSession) {
        var data = serverSession;
        if (data) {
          if (data.status === 'OK')
          {
            this.set('authToken', data.token);
            this.set('username', data.username);
            this.set('etag', data.etag);
            this.set('_id', data._id);
          }
        }
      },
      destroy: function() {
        this._super();
        this.set('authToken', undefined);
        this.set('username', undefined);
        this.set('etag', undefined);
        this.set('_id', undefined);

      },
      authTokenObserver: Ember.observer(function() {
        var authToken = this.get('authToken');
        var username = this.get('username');
        var etag = this.get('etag');
        if (Ember.isEmpty(authToken) && Ember.isEmpty(username) && Ember.isEmpty(etag)) {
          delete sessionStorage.authToken;
          delete sessionStorage.username;
          delete sessionStorage.etag;
          delete sessionStorage._id;
        } else {
          sessionStorage.authToken = this.get('authToken');
          sessionStorage.username = this.get('username');
          sessionStorage._id = this.get('_id');
          sessionStorage.etag = this.get('etag');
        }
      }, '_id')
    });
    //set a custom session endpoint
    Ember.SimpleAuth.setup(application, { serverSessionRoute: '/session' });
  }
});

import Profiles from 'appkit/models/profiles';
Ember.SimpleAuth.LogoutRouteMixin.reopen({
  beforeModel: function() {
    var self = this;
    Ember.$.ajax(Ember.SimpleAuth.serverSessionRoute + "/" + sessionStorage._id, {type: 'DELETE', headers:{ "If-Match": sessionStorage.etag} }).always(function(response) {
      self.get('session').destroy();
      /*TODO: 
        Unload the profiles.
      */
      self.transitionTo(Ember.SimpleAuth.routeAfterLogout);
    });
  }
});

/*-- TEXTFIELD exra option --*/
Ember.TextField.reopen({
  attributeBindings: ['accept', 'autocomplete', 'autofocus', 'name', 'required', 'disabled']
});

/*-- SELECT exra option --*/
Ember.Select.reopen({
  attributeBindings: ['accept', 'autocomplete', 'autofocus', 'name', 'required', 'disabled']
});

App.CalendarDatePicker = Ember.TextField.extend({
  _picker: null,
  
  modelChangedValue: function(){
    var picker = this.get("_picker");
    if (picker){
      picker.setDate(this.get("value"));
    }
  }.observes("value"),

  didInsertElement: function(){
    var currentYear = (new Date()).getFullYear();
    var formElement = this.$()[0];
    var picker = new Pikaday({
      field: formElement,
      format: 'MM/DD/YYYY',
      yearRange: [currentYear-3,currentYear+3]
    });
    this.set("_picker", picker);
  },

  willDestroyElement: function(){
    var picker = this.get("_picker");
    if (picker) {
      picker.destroy();
    }
    this.set("_picker", null);
  }
});


App.Chosen = Ember.Select.extend({

  multiple: false,
  width: '100%',
  disableSearchThreshold: 1,
  searchContains: true,
  attributeBindings:['multiple', 'width', 'disableSearchThreshold', 'searchContains', 'autofocus'],

  didInsertElement: function(){
    this._super();

    var options = {
      multiple: this.get('multiple'),
      width: this.get('width'),
      disable_search_threshold: this.get('disableSearchThreshold'),
      search_contains: this.get('searchContains')
    };

    options.clean_search_text = this.cleanSearchText;
    options.calling_context = this;

    if(this.get('multiple')){
      options.placeholder_text_multiple = this.get('prompt');
    } else {
      options.placeholder_text_single = this.get('prompt');
    }

    this.$().chosen(options);

    // observes for new changes on options to trigger an update on Chosen
    return this.addObserver(this.get("optionLabelPath").replace(/^content/, "content.@each"), function() {
      return this.rerenderChosen();
    });

  },

  _closeChosen: function(){
    // trigger escape to close chosen
    this.$().next('.chosen-container-active').find('input').trigger({type:'keyup', which:27});
  },

  cleanSearchText: function(option, context){
    return option.text;
  },

  rerenderChosen: function(){
    // Don't trigger Chosen update until after DOM elements have finished rendering.
    Ember.run.schedule('afterRender', this, function(){
      this.$().trigger('chosen:updated');
    });
  }

});


export default App;
