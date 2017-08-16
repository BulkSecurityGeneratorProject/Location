(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationDetailController', LocationDetailController);

    LocationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Location', 'LocationFacility', 'LocationActivity', 'LocationOcassion', 'LocationAttraction', 'LocationRelationship', 'Label', 'LocationType', 'Coordinate'];

    function LocationDetailController($scope, $rootScope, $stateParams, previousState, entity, Location, LocationFacility, LocationActivity, LocationOcassion, LocationAttraction, LocationRelationship, Label, LocationType, Coordinate) {
        var vm = this;

        vm.location = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:locationUpdate', function(event, result) {
            vm.location = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
