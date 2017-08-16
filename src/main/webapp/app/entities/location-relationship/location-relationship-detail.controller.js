(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipDetailController', LocationRelationshipDetailController);

    LocationRelationshipDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LocationRelationship', 'Location', 'LocationRelationshipType'];

    function LocationRelationshipDetailController($scope, $rootScope, $stateParams, previousState, entity, LocationRelationship, Location, LocationRelationshipType) {
        var vm = this;

        vm.locationRelationship = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:locationRelationshipUpdate', function(event, result) {
            vm.locationRelationship = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
