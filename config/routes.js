(function() {

  var IndexController = require('../controllers/IndexController');
  var SearchController = require('../controllers/SearchController');

  module.exports = function() {

    var app;

    return {
      initialize: function(app) {
        this.app = app;

        // Index
        app.get('/', IndexController.index);

        // Search
        app.get('/api/search/:keyword', SearchController.search);
         app.get('/api/search/image/:id', SearchController.searchImage);

      }
    };
  }();
}());
