(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationTypeDetailController', LocationTypeDetailController);

    LocationTypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'LocationType', 'Location', 'LabelGroup'];

    function LocationTypeDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, LocationType, Location, LabelGroup) {
        var vm = this;

        vm.locationType = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:locationTypeUpdate', function(event, result) {
            vm.locationType = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
