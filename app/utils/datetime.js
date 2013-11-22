var datetime = {
  serialize: function(datetime) {
    // Ember.Logger.info('datetime:serialize');
    if(datetime)
      return new Date(datetime).toGMTString();
  },
  deserialize: function(string) {
    // Ember.Logger.info('datetime:deserialize');
    if(string)
    {
      var dt = moment(string);
      return dt.format('MM/DD/YYYY');
    }
    return '';
  }
};

export default datetime;