(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('AttractionDialogController', AttractionDialogController);

    AttractionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Attraction', 'LocationAttraction'];

    function AttractionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Attraction, LocationAttraction) {
        var vm = this;

        vm.attraction = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.locationattractions = LocationAttraction.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.attraction.id !== null) {
                Attraction.update(vm.attraction, onSaveSuccess, onSaveError);
            } else {
                Attraction.save(vm.attraction, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:attractionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setIcon = function ($file, attraction) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        attraction.icon = base64Data;
                        attraction.iconContentType = $file.type;
                    });
                });
            }
        };

    }
})();
