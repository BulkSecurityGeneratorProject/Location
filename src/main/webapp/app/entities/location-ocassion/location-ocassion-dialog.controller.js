(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationOcassionDialogController', LocationOcassionDialogController);

    LocationOcassionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'LocationOcassion', 'Location', 'Ocassion'];

    function LocationOcassionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, LocationOcassion, Location, Ocassion) {
        var vm = this;

        vm.locationOcassion = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.locations = Location.query();
        vm.ocassions = Ocassion.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationOcassion.id !== null) {
                LocationOcassion.update(vm.locationOcassion, onSaveSuccess, onSaveError);
            } else {
                LocationOcassion.save(vm.locationOcassion, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationOcassionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setIcon = function ($file, locationOcassion) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        locationOcassion.icon = base64Data;
                        locationOcassion.iconContentType = $file.type;
                    });
                });
            }
        };

    }
})();
