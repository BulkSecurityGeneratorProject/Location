(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('AttractionDeleteController',AttractionDeleteController);

    AttractionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Attraction'];

    function AttractionDeleteController($uibModalInstance, entity, Attraction) {
        var vm = this;

        vm.attraction = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Attraction.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
