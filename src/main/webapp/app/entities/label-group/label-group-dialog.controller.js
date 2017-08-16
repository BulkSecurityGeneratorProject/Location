(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LabelGroupDialogController', LabelGroupDialogController);

    LabelGroupDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'LabelGroup', 'LocationType', 'Label'];

    function LabelGroupDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, LabelGroup, LocationType, Label) {
        var vm = this;

        vm.labelGroup = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.locationtypes = LocationType.query();
        vm.labels = Label.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.labelGroup.id !== null) {
                LabelGroup.update(vm.labelGroup, onSaveSuccess, onSaveError);
            } else {
                LabelGroup.save(vm.labelGroup, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:labelGroupUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setIcon = function ($file, labelGroup) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        labelGroup.icon = base64Data;
                        labelGroup.iconContentType = $file.type;
                    });
                });
            }
        };

    }
})();
