(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationAttractionDialogController', LocationAttractionDialogController);

    LocationAttractionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LocationAttraction', 'Location', 'Attraction'];

    function LocationAttractionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LocationAttraction, Location, Attraction) {
        var vm = this;

        vm.locationAttraction = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query();
        vm.attractions = Attraction.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationAttraction.id !== null) {
                LocationAttraction.update(vm.locationAttraction, onSaveSuccess, onSaveError);
            } else {
                LocationAttraction.save(vm.locationAttraction, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationAttractionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
