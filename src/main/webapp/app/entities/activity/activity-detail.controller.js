(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('ActivityDetailController', ActivityDetailController);

    ActivityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Activity', 'LocationActivity'];

    function ActivityDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Activity, LocationActivity) {
        var vm = this;

        vm.activity = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:activityUpdate', function(event, result) {
            vm.activity = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
