(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('Facility', Facility);

    Facility.$inject = ['$resource'];

    function Facility ($resource) {
        var resourceUrl =  'api/facilities/:id';

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
