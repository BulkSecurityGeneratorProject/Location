(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationFacilityDeleteController',LocationFacilityDeleteController);

    LocationFacilityDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationFacility'];

    function LocationFacilityDeleteController($uibModalInstance, entity, LocationFacility) {
        var vm = this;

        vm.locationFacility = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationFacility.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
