/* */
"use strict";

define([
  'backbone'
], function(Backbone) {

  var View = Backbone.View.extend({

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
      var templateHTML = _.template($('#photos-template').html(), {
        photos: this.model.toJSON()
      });
      this.$el.html(templateHTML);
      return this;
    },

    clear: function() {
      this.$el.empty();
    }

  });

  return View;
});
