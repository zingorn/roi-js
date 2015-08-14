define([
    'jquery',
    'underscore',
    'backbone',
    'providers/adapters/flickr'
], function($, _, Backbone, FlickrAdapter){
    /**
     * Прокси класс
     * @returns {{adapter: FlickrAdapter, getLoadUrl: Function, getSourceUrl: Function, getLinkUrl: Function, getSizesUrl: Function}}
     * @constructor
     */
    var Provider = function(){
        var adapter = new FlickrAdapter();
        return {
            adapter: adapter,

            /**
             *
             * @param model
             * @returns {*}
             */
            getLoadUrl: function(model) {
                return this.adapter.getLoadUrl(model);
            },

            /**
             *
             * @param model
             * @returns {*}
             */
            getSourceUrl: function(model) {
                return this.adapter.getSourceUrl(model);
            },

            /**
             *
             * @param model
             * @returns {*}
             */
            getLinkUrl: function(model) {
                return this.adapter.getLinkUrl(model);
            },

            /**
             *
             * @param model
             * @returns {*}
             */
            getSizesUrl: function(model){
                return this.adapter.getSizesUrl(model);
            }
        }
    };

    return new Provider;
});