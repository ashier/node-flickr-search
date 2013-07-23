"use strict";

var request = require('request');

exports.search = function(req, res) {

  var url = "http://ycpi.api.flickr.com/services/rest/";
  var form = {
    "method": "flickr.photos.search",
    "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
    "format": "json",
    "per_page": "10",
    "text": req.params.keyword
  };

  request.post(url, {
    form: form
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });

};

exports.searchImage = function(req, res) {
  var url = "http://ycpi.api.flickr.com/services/rest/";
  var form = {
    "method": "flickr.photos.getSizes",
    "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
    "format": "json",
    "photo_id": req.params.id
  };

  request.post(url, {
    form: form
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
};
