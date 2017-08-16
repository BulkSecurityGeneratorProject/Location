(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('OcassionDeleteController',OcassionDeleteController);

    OcassionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Ocassion'];

    function OcassionDeleteController($uibModalInstance, entity, Ocassion) {
        var vm = this;

        vm.ocassion = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Ocassion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
