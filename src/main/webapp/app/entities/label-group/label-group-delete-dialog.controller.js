(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LabelGroupDeleteController',LabelGroupDeleteController);

    LabelGroupDeleteController.$inject = ['$uibModalInstance', 'entity', 'LabelGroup'];

    function LabelGroupDeleteController($uibModalInstance, entity, LabelGroup) {
        var vm = this;

        vm.labelGroup = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LabelGroup.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
