(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('FacilityDialogController', FacilityDialogController);

    FacilityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Facility', 'LocationFacility'];

    function FacilityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Facility, LocationFacility) {
        var vm = this;

        vm.facility = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locationfacilities = LocationFacility.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.facility.id !== null) {
                Facility.update(vm.facility, onSaveSuccess, onSaveError);
            } else {
                Facility.save(vm.facility, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:facilityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
