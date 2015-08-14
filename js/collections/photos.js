define([
    'jquery',
    'underscore',
    'backbone',
    'models/photo',
    'providers/provider'
], function($, _, Backbone, Photo, Provider){
    var PhotoCollection = Backbone.Collection.extend({
        model: Photo,

        /**
         *
         * @returns {string}
         */
        url: function(){
            return Provider.getLoadUrl(this);
        },

        /**
         *
         * @param resp
         * @returns {*}
         */
        parse: function(resp){
            this.page = resp.photos.page;
            this.perPage = resp.photos.perpage;
            this.pages = resp.photos.pages;
            this.total = resp.photos.total;

            $(resp.photos.photo).each(function(i,e){
                e.src = Provider.getSourceUrl(e);
                e.link = Provider.getLinkUrl(e);
            });

            return resp.photos.photo;
        },

        /**
         *
         */
        initialize: function(){
            _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage');

            this.page = 1;
            typeof(this.perPage) != 'undefined' || (this.perPage = 10);
        },

        /**
         *
         * @returns {{total: *, page: *, perPage: *, pages: *, prev: boolean, next: boolean}}
         */
        pageInfo: function(){
            var info = {
                total: this.total,
                page: this.page,
                perPage: this.perPage,
                pages: this.pages,
                prev: false,
                next: false
            };

            var max = Math.min(this.total, this.page * this.perPage);

            if (this.total == this.pages * this.perPage) {
                max = this.total;
            }

            info.range = [(this.page - 1) * this.perPage + 1, max];

            if (this.page > 1) {
                info.prev = this.page - 1;
            }

            if (this.page < info.pages) {
                info.next = this.page + 1;
            }

            return info;
        },

        /**
         *
         * @returns {*}
         */
        nextPage: function(){
            if (!this.pageInfo().next) {
                return false;
            }
            this.page = this.page + 1;
            return this.fetch();
        },

        //
        previuosPage: function(){
            if (!this.pageInfo().prev) {
                return false;
            }
            this.page = this.page - 1;
            return this.fetch();
        },
        comparator: 'order'
    });

    return new PhotoCollection();
});