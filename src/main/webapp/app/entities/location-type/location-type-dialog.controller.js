(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationTypeDialogController', LocationTypeDialogController);

    LocationTypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'LocationType', 'Location', 'LabelGroup'];

    function LocationTypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, LocationType, Location, LabelGroup) {
        var vm = this;

        vm.locationType = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.locations = Location.query();
        vm.labelgroups = LabelGroup.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationType.id !== null) {
                LocationType.update(vm.locationType, onSaveSuccess, onSaveError);
            } else {
                LocationType.save(vm.locationType, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationTypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setIcon = function ($file, locationType) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        locationType.icon = base64Data;
                        locationType.iconContentType = $file.type;
                    });
                });
            }
        };

    }
})();
