(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LocationType', LocationType);

    LocationType.$inject = ['$resource'];

    function LocationType ($resource) {
        var resourceUrl =  'api/location-types/:id';

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
