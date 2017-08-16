(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('Ocassion', Ocassion);

    Ocassion.$inject = ['$resource', 'DateUtils'];

    function Ocassion ($resource, DateUtils) {
        var resourceUrl =  'api/ocassions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.start = DateUtils.convertDateTimeFromServer(data.start);
                        data.end = DateUtils.convertDateTimeFromServer(data.end);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
