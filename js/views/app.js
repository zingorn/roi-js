define([
    'jquery',
    'underscore',
    'backbone',
    'collections/slides',
    'views/photo',
    'views/photos'
], function($, _, Backbone, Slides, PhotoView, PhotosView){
    /**
     *
     */
    var AppView = Backbone.View.extend({
        /**
         *
         */
        el: '#app',

        /**
         *
         */
        slides: new Slides(),

        /**
         *
         */
        slidesName: {},

        /**
         *
         */
        currentSlide: null,

        /**
         *
         */
        events: {

        },

        /**
         * Приложение содержит 2 слайда: список картинок и просмотр одной катинки
         */
        initialize: function(){
            var self = this;

            this.slides.add(new this.slides.model({
                view: new PhotosView(),
                name: 'photos'
            }));
            this.slides.add(new this.slides.model({
                view: new PhotoView(),
                name: 'photo'
            }));

            this.move('photos');
        },

        /**
         *
         * @returns {AppView}
         */
        render: function(slide){
            var self = this;

            this.$el.fadeOut(250,function(){
                $('section', self.$el).hide();
                if (self.currentSlide !== null) self.currentSlide.get('view').hide();
                slide.get('view').show();
                self.currentSlide = slide;
            });
            this.$el.fadeIn(500);

            return this;
        },

        /**
         * Переключает слайды.
         * @param name
         */
        move: function(name){
            this.render(this.slides.byName(name));
        }
    });

    return AppView;
});