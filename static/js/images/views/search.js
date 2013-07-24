/* */
"use strict";

define([
  'backbone'
], function(Backbone) {

  var View = Backbone.View.extend({

    events: {
      'click a': 'search'
    },

    initialize: function() {

    },

    render: function() {
      var templateHTML = _.template($('#search-template').html());
      this.$el.html(templateHTML);
      this.$el.removeClass('hidden');
      this.$el.addClass('showSearch');
      return this;
    },

    search: function(event) {
      var target = event.target;
      var data = $("#search").val();
      this.trigger("search", data);
    },

    clear: function() {
      this.$el.empty();
    }

  });

  return View;
});
