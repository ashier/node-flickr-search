"use strict";

var request = require('request');
var async = require('async');
var url = "http://ycpi.api.flickr.com/services/rest/";

exports.search = function(req, res) {

  var form = {
    "method": "flickr.photos.search",
    "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
    "format": "json",
    "per_page": "12",
    "in_gallery": "true",
    "page": (req.query.page || 1),
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
      var tmpPhotos = [];
      async.map(photos.photo, function(photo, cb) {

        var formImage = {
          "method": "flickr.photos.getSizes",
          "api_key": "c4aa8bb5e96ee85dac99c2030bdd0fe8",
          "format": "json",
          "photo_id": photo.id
        };

        request.post(url, {
          form: formImage
        }, function(e, r, b) {
          if (!e && r.statusCode == 200) {

            var s = b.indexOf('({');
            var e = b.indexOf('})');
            var j = b.substring(s + 1, e + 1);
            var size = JSON.parse(j).sizes.size;

            photo.thumbnail = size[3];
            photo.large = size[size.length - 1];

            tmpPhotos.push(photo);
            cb();
          } else {
            cb();
          }

        });
      }, function(err, cb) {
        res.json(tmpPhotos);
      });

    } else {
      res.json({status: "error", message:"search failed..."});
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
