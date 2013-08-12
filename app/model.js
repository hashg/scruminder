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