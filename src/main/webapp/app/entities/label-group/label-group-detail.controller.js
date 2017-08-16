(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LabelGroupDetailController', LabelGroupDetailController);

    LabelGroupDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'LabelGroup', 'LocationType', 'Label'];

    function LabelGroupDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, LabelGroup, LocationType, Label) {
        var vm = this;

        vm.labelGroup = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:labelGroupUpdate', function(event, result) {
            vm.labelGroup = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
