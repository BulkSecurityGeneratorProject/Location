(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationAttractionDetailController', LocationAttractionDetailController);

    LocationAttractionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LocationAttraction', 'Location', 'Attraction'];

    function LocationAttractionDetailController($scope, $rootScope, $stateParams, previousState, entity, LocationAttraction, Location, Attraction) {
        var vm = this;

        vm.locationAttraction = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:locationAttractionUpdate', function(event, result) {
            vm.locationAttraction = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
