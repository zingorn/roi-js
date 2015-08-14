define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'collections/photos',
    'text!templates/photo.html'
],function($, _, Backbone, Common, Photos, template){
    /**
     *
     */
    var PhotoView = Backbone.View.extend({
        /**
         *
         */
        el: '#photo',

        /**
         *
         */
        template: _.template(template),

        /**
         * listeners
         */
        events: {
            'click .photo' : 'closePhoto'
        },

        /**
         *
         */
        initialize: function(){
            var self = this;
            Common.router.on('route:photo', function(){
                self.onRoute.apply(self, arguments);
            });

        },

        /**
         * Обработчик перехода на слайд просмотра фото
         * @param id
         */
        onRoute: function(id){
            this.model = Photos.find(function(item){
                return item.id === id;
            });
            if (this.model != undefined) {
                this.render();
                Common.app.move('photo');
            }
        },

        /**
         *
         */
        show: function(){
            this.$el.show();
        },

        /**
         *
         */
        hide: function(){},

        /**
         *
         */
        closePhoto: function(){
            Common.router.navigate('', {trigger: true});
        },

        /**
         *
         */
        showOverlay: function(){
            $('.image-fix-d').show();
        },

        /**
         *
         */
        hideOverlay: function(){
            $('.image-fix-d').hide();
        },

        /**
         *
         * @param src
         */
        imageLoad: function(src){
            this.hideOverlay();

            $('.image-fix', this.$el).css({
                'background-image' : 'url(' + src + ')'
            }).height($(document.body).height() - 40);
        },

        /**
         *
         */
        render: function(){
            var self = this;
            this.showOverlay();

            this.model.loadSizes(function(){
                var data = $.extend(true, {css: 'photo-item'}, this.toJSON()),
                    html = self.template(data);
                // switch
                for (var i = 0; i < data.size.length; i++) {
                    var size = data.size[i];
                    if (size.label == 'Original') {
                        data.src = size.source;
                        break;
                    }
                }

                self.$el.html(html);
                var image = new Image();
                $(image).on('load', function(e){
                    self.imageLoad.apply(self, [data.src]);
                });
                image.src = data.src;
            });

            return this;
        }
    });

    return PhotoView;
});