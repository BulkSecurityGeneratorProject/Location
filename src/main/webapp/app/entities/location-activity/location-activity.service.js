(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LocationActivity', LocationActivity);

    LocationActivity.$inject = ['$resource'];

    function LocationActivity ($resource) {
        var resourceUrl =  'api/location-activities/:id';

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
