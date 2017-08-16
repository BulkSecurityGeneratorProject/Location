(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('FacilityDeleteController',FacilityDeleteController);

    FacilityDeleteController.$inject = ['$uibModalInstance', 'entity', 'Facility'];

    function FacilityDeleteController($uibModalInstance, entity, Facility) {
        var vm = this;

        vm.facility = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Facility.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
