(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('AttractionDetailController', AttractionDetailController);

    AttractionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Attraction', 'LocationAttraction'];

    function AttractionDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Attraction, LocationAttraction) {
        var vm = this;

        vm.attraction = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('location2App:attractionUpdate', function(event, result) {
            vm.attraction = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
