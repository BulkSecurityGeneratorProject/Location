(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationOcassionDetailController', LocationOcassionDetailController);

    LocationOcassionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'LocationOcassion', 'Location', 'Ocassion'];

    function LocationOcassionDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, LocationOcassion, Location, Ocassion) {
        var vm = this;

        vm.locationOcassion = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:locationOcassionUpdate', function(event, result) {
            vm.locationOcassion = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
