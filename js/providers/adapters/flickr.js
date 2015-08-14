define([
    'jquery',
    'underscore'
], function($, _){
    /**
     * Адаптер Flickr
     * @constructor
     */
    var FlickrAdapter = function(){
        var sourceTpl = _.template("https://farm<%=farm%>.staticflickr.com/<%=server%>/<%=id%>_<%=secret%>_q.jpg"),
            loadTpl   = _.template('https://api.flickr.com/services/rest/?format=json&nojsoncallback=1' +
            '&method=flickr.photos.getRecent' +
            '&api_key=<%=api%>' +
            '&per_page=<%=perPage%>' +
            '&page=<%=page%>'),

            linkTpl = _.template('http://www.flickr.com/photos/<%=user%>/<%=id%>'),
            sizesTpl = _.template('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes' +
            '&api_key=<%=api%>' +
            '&photo_id=<%=id%>&format=json&nojsoncallback=1');

        return {
            /**
             * Адрес загрузки данных
             */
            getLoadUrl: function (model) {
                return loadTpl({
                    api: $('#flickr-api').val(),
                    perPage: model.perPage,
                    page: model.page
                });
            },

            /**
             * Адрес загрузки данных
             * @param model
             */
            getSourceUrl: function(model){
                return sourceTpl({
                    farm: model.farm,
                    server: model.server,
                    id: model.id,
                    secret: model.secret
                });
            },

            /**
             * Сборка адреса старницы пользователя
             */
            getLinkUrl: function(model){
                return linkTpl({
                    id: model.id,
                    user: model.owner
                });
            },

            /**
             * Адрес загрузки размеров фото
             * @param model
             */
            getSizesUrl: function(model){
                return sizesTpl({
                    id: model.id,
                    api: $('#flickr-api').val()
                });
            }
        };
    };

    return FlickrAdapter;
});