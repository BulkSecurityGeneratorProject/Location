(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('FacilityDetailController', FacilityDetailController);

    FacilityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Facility', 'LocationFacility'];

    function FacilityDetailController($scope, $rootScope, $stateParams, previousState, entity, Facility, LocationFacility) {
        var vm = this;

        vm.facility = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:facilityUpdate', function(event, result) {
            vm.facility = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
