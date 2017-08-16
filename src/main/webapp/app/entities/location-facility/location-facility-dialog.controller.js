(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationFacilityDialogController', LocationFacilityDialogController);

    LocationFacilityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'LocationFacility', 'Location', 'Facility'];

    function LocationFacilityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, LocationFacility, Location, Facility) {
        var vm = this;

        vm.locationFacility = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.locations = Location.query();
        vm.facilities = Facility.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationFacility.id !== null) {
                LocationFacility.update(vm.locationFacility, onSaveSuccess, onSaveError);
            } else {
                LocationFacility.save(vm.locationFacility, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationFacilityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setIcon = function ($file, locationFacility) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        locationFacility.icon = base64Data;
                        locationFacility.iconContentType = $file.type;
                    });
                });
            }
        };

    }
})();
