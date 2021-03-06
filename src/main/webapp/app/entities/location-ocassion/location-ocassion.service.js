(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LocationOcassion', LocationOcassion);

    LocationOcassion.$inject = ['$resource'];

    function LocationOcassion ($resource) {
        var resourceUrl =  'api/location-ocassions/:id';

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
