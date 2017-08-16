(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('OcassionDetailController', OcassionDetailController);

    OcassionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Ocassion', 'LocationOcassion'];

    function OcassionDetailController($scope, $rootScope, $stateParams, previousState, entity, Ocassion, LocationOcassion) {
        var vm = this;

        vm.ocassion = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('location2App:ocassionUpdate', function(event, result) {
            vm.ocassion = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
