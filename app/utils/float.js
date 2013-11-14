var Float = {
  serialize: function(str) {
    Ember.Logger.info("float:serialize");
    // Ember.Logger.info(str);
    return parseFloat(str);
  },
  deserialize: function(str) {
    Ember.Logger.info("float:deserialize");
    // Ember.Logger.info(str);
    return str && str.toString();
  }
};

export default Float;