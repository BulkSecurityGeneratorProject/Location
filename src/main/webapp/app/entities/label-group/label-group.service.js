(function() {
    'use strict';
    angular
        .module('location2App')
        .factory('LabelGroup', LabelGroup);

    LabelGroup.$inject = ['$resource'];

    function LabelGroup ($resource) {
        var resourceUrl =  'api/label-groups/:id';

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
