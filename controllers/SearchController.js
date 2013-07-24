"use strict";

var request = require('request');
var url = "http://ycpi.api.flickr.com/services/rest/";

exports.search = function(req, res) {

  var form = {
    "method": "flickr.photos.search",
    "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
    "format": "json",
    "per_page": "10",
    "text": req.query.keyword
  };

  request.post(url, {
    form: form
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var startPos = body.indexOf('({');
      var endPos = body.indexOf('})');
      var jsonString = body.substring(startPos + 1, endPos + 1);
      var photos = JSON.parse(jsonString).photos;
      res.json(photos);
    } else {
      console.log("Search failed...");
      // res.render(path.join(__dirname, '..', '/views/index'));
    }
  });

};

exports.searchImage = function(req, res) {

  var form = {
    "method": "flickr.photos.getSizes",
    "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
    "format": "json",
    "photo_id": req.query.id
  };

  request.post(url, {
    form: form
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var startPos = body.indexOf('({');
      var endPos = body.indexOf('})');
      var jsonString = body.substring(startPos + 1, endPos + 1);
      res.json(JSON.parse(jsonString).sizes);
    }
  });
};
