var datetime = {
  serialize: function(datetime) {
    return new Date(datetime).toGMTString();
  },
  deserialize: function(string) {
    Ember.Logger.info('datetime:deserialize');
    Ember.Logger.info(string);
    var dt = moment(string);
    return dt.format('MM/DD/YYYY');
  }
};

export default datetime;