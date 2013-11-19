var ScrumAdapter =  Ember.RESTAdapter.extend({
  buildURL: function() {
    return this._super.apply(this, arguments).replace(/\.json$/, '');
    // return this._super.apply(this, arguments).replace(/\.json$/, '?sort=[("updated", 1)]');
    
  },
  saveRecord: function(record) {
    var primaryKey = Ember.get(record.constructor, 'primaryKey'),
        url = this.buildURL(record.constructor, Ember.get(record, primaryKey)),
        self = this;

    return this.ajax(url, record.toJSON(), "PATCH").then(function(data) {  // TODO: Some APIs may or may not return data
      self.didSaveRecord(record, data);
      /*We need to always pass and update 'etag' for PUT/PATCH/Delete request. This is the only way I could get the etag updated.*/
      Ember.run(function(){
        record.reload();
      });
      /**/
      return record;
    });
  },
  _ajax: function(url, params, method) {
    var settings = this.ajaxSettings(url, method);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (params) {
        var authToken = (document.cookie.match(/authToken=([^;]+)/) || [])[1];
        settings.headers = {"Authorization": "Basic " +  btoa(authToken+":")};
        settings.headers["If-Match"] = params.etag;
        settings.contentType = "application/json; charset=utf-8";
        if (method === "GET") {
          settings.data = params;
        } 
        else if (method === "PUT" || method === "PATCH") {
          if ( settings.url.split('/')[1] === "profiles" )
          {
            delete params['email'];
            delete params['username'];
          }
          delete params['id'];
          delete params['etag'];
          delete params['created'];
          delete params['updated'];
          settings.data = JSON.stringify(params);
        }
        else {
          settings.contentType = "application/json; charset=utf-8";
          settings.data = JSON.stringify(params);
        }
      }

      settings.success = function(json) {
        if(json && json.length > 0)//for array change _id to id
        {
          for( var i = 0 ; i < json.length; i++) {
            json[i]['id'] = json[i]['_id'];
            delete json[i]['_id'];
          }
        } else {
          json['id'] = json['_id'];
        }
        Ember.run(null, resolve, json);
      };

      settings.error = function(jqXHR, textStatus, errorThrown) {
        // https://github.com/ebryn/ember-model/issues/202
        if (jqXHR) {
          jqXHR.then = null;
        }
        Ember.run(null, reject, jqXHR);
      };
      Ember.$.ajax(settings);
   });
  }
});

export default ScrumAdapter;