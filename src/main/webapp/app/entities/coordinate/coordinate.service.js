(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('Coordinate', Coordinate);

    Coordinate.$inject = ['$resource'];

    function Coordinate ($resource) {
        var resourceUrl =  'api/coordinates/:id';

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
