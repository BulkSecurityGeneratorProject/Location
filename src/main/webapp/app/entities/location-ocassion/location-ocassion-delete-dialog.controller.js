(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationOcassionDeleteController',LocationOcassionDeleteController);

    LocationOcassionDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationOcassion'];

    function LocationOcassionDeleteController($uibModalInstance, entity, LocationOcassion) {
        var vm = this;

        vm.locationOcassion = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationOcassion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
