(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationFacilityDetailController', LocationFacilityDetailController);

    LocationFacilityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'LocationFacility', 'Location', 'Facility'];

    function LocationFacilityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, LocationFacility, Location, Facility) {
        var vm = this;

        vm.locationFacility = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:locationFacilityUpdate', function(event, result) {
            vm.locationFacility = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
