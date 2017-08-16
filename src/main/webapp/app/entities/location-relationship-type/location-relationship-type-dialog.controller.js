(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipTypeDialogController', LocationRelationshipTypeDialogController);

    LocationRelationshipTypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LocationRelationshipType', 'LocationRelationship'];

    function LocationRelationshipTypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LocationRelationshipType, LocationRelationship) {
        var vm = this;

        vm.locationRelationshipType = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locationrelationships = LocationRelationship.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationRelationshipType.id !== null) {
                LocationRelationshipType.update(vm.locationRelationshipType, onSaveSuccess, onSaveError);
            } else {
                LocationRelationshipType.save(vm.locationRelationshipType, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationRelationshipTypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
