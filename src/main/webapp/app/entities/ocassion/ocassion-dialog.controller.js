(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('OcassionDialogController', OcassionDialogController);

    OcassionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ocassion', 'LocationOcassion'];

    function OcassionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Ocassion, LocationOcassion) {
        var vm = this;

        vm.ocassion = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.locationocassions = LocationOcassion.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.ocassion.id !== null) {
                Ocassion.update(vm.ocassion, onSaveSuccess, onSaveError);
            } else {
                Ocassion.save(vm.ocassion, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:ocassionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.start = false;
        vm.datePickerOpenStatus.end = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
