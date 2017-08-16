(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationTypeDeleteController',LocationTypeDeleteController);

    LocationTypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationType'];

    function LocationTypeDeleteController($uibModalInstance, entity, LocationType) {
        var vm = this;

        vm.locationType = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationType.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
