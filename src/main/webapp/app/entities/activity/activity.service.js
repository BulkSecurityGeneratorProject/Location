(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('Activity', Activity);

    Activity.$inject = ['$resource'];

    function Activity ($resource) {
        var resourceUrl =  'api/activities/:id';

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
