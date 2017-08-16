(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('CoordinateDialogController', CoordinateDialogController);

    CoordinateDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Coordinate', 'Location'];

    function CoordinateDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Coordinate, Location) {
        var vm = this;

        vm.coordinate = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.coordinate.id !== null) {
                Coordinate.update(vm.coordinate, onSaveSuccess, onSaveError);
            } else {
                Coordinate.save(vm.coordinate, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:coordinateUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
