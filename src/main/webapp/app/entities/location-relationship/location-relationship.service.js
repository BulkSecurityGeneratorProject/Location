(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LocationRelationship', LocationRelationship);

    LocationRelationship.$inject = ['$resource'];

    function LocationRelationship ($resource) {
        var resourceUrl =  'api/location-relationships/:id';

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
