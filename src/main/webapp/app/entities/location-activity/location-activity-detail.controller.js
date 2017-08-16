(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationActivityDetailController', LocationActivityDetailController);

    LocationActivityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LocationActivity', 'Location', 'Activity'];

    function LocationActivityDetailController($scope, $rootScope, $stateParams, previousState, entity, LocationActivity, Location, Activity) {
        var vm = this;

        vm.locationActivity = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:locationActivityUpdate', function(event, result) {
            vm.locationActivity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
