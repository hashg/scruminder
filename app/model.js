var CustomAdapter = Ember.RESTAdapter.extend({
  generateIdForRecord: function(record) {
    var ch = "abcdefghiklmnopqrstuvwxyz"[Math.floor(25 * Math.random())];
    return ch+'xxxyxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  createRecord: function(record) {
    record.set('id', this.generateIdForRecord());
    return this._super(record);
  },
  buildURL: function() {
    return this._super.apply(this, arguments).replace(/\.json$/, '');
  }
});

// var attr = Ember.attr, belongsTo = Ember.belongsTo, hasMany = Ember.hasMany;

export default CustomAdapter;


/*******

App.User = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr()
});

App.User.url = "/users";
App.User.adapter = Ember.RESTAdapter.create();

// create example
var newUser = App.User.create({name: "Erik"});
newUser.save(); // POST to /users.json

// hasMany example
var comments = newUser.get('comments');
comments.create({text: "hello!"});
comments.save(); // POST to /comments.json


// Fetch an existing user
var existingUser = App.User.find(1); // GET /users/1.json

// Update an existing user
existingUser.set('name', 'Kris');
existingUser.save() // PUT /users/1.json

*******/