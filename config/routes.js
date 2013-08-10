"use strict";

var IndexController = require('../controllers/IndexController');
var SearchController = require('../controllers/SearchController');

module.exports.initialize = function(app) {

  // Index
  app.get('/', IndexController.index);

  // Search
  app.get('/api/search', SearchController.search);
  app.get('/api/search/image', SearchController.searchImage);

};
