(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('CoordinateDetailController', CoordinateDetailController);

    CoordinateDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Coordinate', 'Location'];

    function CoordinateDetailController($scope, $rootScope, $stateParams, previousState, entity, Coordinate, Location) {
        var vm = this;

        vm.coordinate = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:coordinateUpdate', function(event, result) {
            vm.coordinate = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
