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
  name: 'authentication',
  initialize: function(container, application) {
    //customize the session so that it handles the custom payload as well as the additional authenticated account
    
    Ember.SimpleAuth.Session.reopen({
      init: function() {
        this._super();
        //initializer the accountId from data potentially already present in the
        //sessionStorage (Ember.SimpleAuth.Session does this out of the box for authToken)
        // Ember.Logger.info("init");
        var authToken = (document.cookie.match(/authToken=([^;]+)/) || [])[1];
        this.set('authToken', authToken);
        var username = (document.cookie.match(/username=([^;]+)/) || [])[1];
        this.set('username', username);
        var etag = (document.cookie.match(/etag=([^;]+)/) || [])[1];
        this.set('etag', etag);
        var _id = (document.cookie.match(/_id=([^;]+)/) || [])[1];
        this.set('_id', _id);
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
        this.set('authToken', '');
        this.set('username', '');
        this.set('etag', '');
        this.set('_id', '');
      },
      /**
        @method load
        @private
        ***HAD TO OVER RIDE because "undefined" was treated as string Ember.isEmpty() returned false****
      */
      load: function(property) {
        var value = document.cookie.match(new RegExp(property + '=([^;]+)')) || [];
        if (Ember.isEmpty(value)) {
          return '';
        } else {
          return decodeURIComponent(value[1] || '');
        }
      },
      authTokenChanged: function() {
          //save authToken in a session cookie so it survives a page reload (Ember.SimpleAuth.Session
          //does this out of the box for authToken)
        Ember.Logger.info("authTokenChanged");
        document.cookie = 'authToken=' + this.get('authToken');
      }.observes('authToken'),
      usernameChanged: function() {
        document.cookie = 'username=' + this.get('username');
      }.observes('username'),
      etagChanged: function() {
        document.cookie = 'etag=' + this.get('etag');
      }.observes('etag'),
      _idChanged: function() {
        document.cookie = '_id=' + this.get('_id');
      }.observes('_id'),
    });
    //set a custom session endpoint
    Ember.SimpleAuth.setup(container, application, { serverTokenEndpoint: '/session' });
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

/*-- Calendar component --*/
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


/*-- HTML Select plugin - chosen component --*/
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
