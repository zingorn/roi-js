define([
    'jquery',
    'underscore',
    'backbone',
    'providers/provider'
], function($, _, Backbone, Provider){
    /**
     *  Модель фото
     */
    var Photo = Backbone.Model.extend({
        defaults: {
            title: '',
            src: '',
            link: '',
            size: [],
            width: 150,
            height: 150
        },

        /**
         * Фагрузка через провайдер размеров картинок
         * @param callback
         */
        loadSizes: function(callback){
            var self = this;
            if (this.get('size').length == 0) {
                var size = this.get('size');
                $.getJSON(Provider.getSizesUrl(this), function(resp){
                    self.set('size', resp.sizes.size);
                    callback.apply(self);
                });
            } else {
                callback.apply(self);
            }
        }
    });

    return Photo;
});
