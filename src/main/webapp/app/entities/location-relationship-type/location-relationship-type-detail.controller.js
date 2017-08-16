(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipTypeDetailController', LocationRelationshipTypeDetailController);

    LocationRelationshipTypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LocationRelationshipType', 'LocationRelationship'];

    function LocationRelationshipTypeDetailController($scope, $rootScope, $stateParams, previousState, entity, LocationRelationshipType, LocationRelationship) {
        var vm = this;

        vm.locationRelationshipType = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:locationRelationshipTypeUpdate', function(event, result) {
            vm.locationRelationshipType = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
