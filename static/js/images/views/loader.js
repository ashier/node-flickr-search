/* */
"use strict";

define([
  'backbone'
], function(Backbone) {

  var View = Backbone.View.extend({

    initialize: function() {

    },

    render: function() {
      var templateHTML = _.template($('#loading-template').html());
      this.$el.html(templateHTML);
      return this;
    },

    clear: function() {
      this.$el.empty();
    }

  });

  return View;
});
