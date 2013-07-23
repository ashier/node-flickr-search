(function() {

  var IndexController = require('../controllers/IndexController');

  module.exports = function() {

    var app;

    return {
      initialize: function(app) {
        this.app = app;

        app.get('/', IndexController.index);

      }
    };
  }();
}());
