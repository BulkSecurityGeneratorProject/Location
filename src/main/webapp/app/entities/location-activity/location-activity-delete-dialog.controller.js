(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationActivityDeleteController',LocationActivityDeleteController);

    LocationActivityDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationActivity'];

    function LocationActivityDeleteController($uibModalInstance, entity, LocationActivity) {
        var vm = this;

        vm.locationActivity = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationActivity.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
