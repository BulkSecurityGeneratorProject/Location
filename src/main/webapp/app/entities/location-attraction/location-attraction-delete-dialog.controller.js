(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationAttractionDeleteController',LocationAttractionDeleteController);

    LocationAttractionDeleteController.$inject = ['$uibModalInstance', 'entity', 'LocationAttraction'];

    function LocationAttractionDeleteController($uibModalInstance, entity, LocationAttraction) {
        var vm = this;

        vm.locationAttraction = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LocationAttraction.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
