(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipTypeDeleteController',LocationRelationshipTypeDeleteController);

    LocationRelationshipTypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationRelationshipType'];

    function LocationRelationshipTypeDeleteController($uibModalInstance, entity, LocationRelationshipType) {
        var vm = this;

        vm.locationRelationshipType = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationRelationshipType.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
