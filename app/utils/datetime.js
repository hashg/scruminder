var datetime = {
  serialize: function(datetime) {
    return new Date(datetime).toGMTString();
  },
  deserialize: function(string) {
    var dt = moment(string);
    return dt.format('MM/DD/YYYY');
  }
};

export default datetime;