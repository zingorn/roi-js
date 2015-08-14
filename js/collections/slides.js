define([
    'jquery',
    'underscore',
    'backbone',
    'models/slide'
], function($, _, Backbone, Slide){
    /**
     *
     */
    var SlideCollection = Backbone.Collection.extend({
        model: Slide,
        names: [],

        /**
         *
         * @param models
         * @param options
         * @returns {*}
         */
        add: function(models, options) {
            var result = Backbone.Collection.prototype.add.call(this, models, options), names = {};

            _(this.models).each(function(model, i){
                names[model.get('name')] = i;
            });
            this.names = names;
            return result;
        },

        /**
         *
         * @param name
         */
        byName: function(name){
            return this.at(this.names[name]);
        }
    });
    return SlideCollection;
});