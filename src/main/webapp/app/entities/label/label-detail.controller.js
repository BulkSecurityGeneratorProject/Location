(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LabelDetailController', LabelDetailController);

    LabelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Label', 'LabelGroup', 'Location'];

    function LabelDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Label, LabelGroup, Location) {
        var vm = this;

        vm.label = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:labelUpdate', function(event, result) {
            vm.label = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
