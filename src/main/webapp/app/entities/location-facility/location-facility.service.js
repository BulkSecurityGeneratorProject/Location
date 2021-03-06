(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LocationFacility', LocationFacility);

    LocationFacility.$inject = ['$resource'];

    function LocationFacility ($resource) {
        var resourceUrl =  'api/location-facilities/:id';

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
