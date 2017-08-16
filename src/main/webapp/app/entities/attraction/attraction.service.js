(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('Attraction', Attraction);

    Attraction.$inject = ['$resource'];

    function Attraction ($resource) {
        var resourceUrl =  'api/attractions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
