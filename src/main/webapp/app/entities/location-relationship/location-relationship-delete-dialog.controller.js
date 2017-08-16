(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipDeleteController',LocationRelationshipDeleteController);

    LocationRelationshipDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationRelationship'];

    function LocationRelationshipDeleteController($uibModalInstance, entity, LocationRelationship) {
        var vm = this;

        vm.locationRelationship = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationRelationship.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
