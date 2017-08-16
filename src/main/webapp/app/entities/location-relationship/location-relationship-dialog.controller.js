(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationRelationshipDialogController', LocationRelationshipDialogController);

    LocationRelationshipDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LocationRelationship', 'Location', 'LocationRelationshipType'];

    function LocationRelationshipDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LocationRelationship, Location, LocationRelationshipType) {
        var vm = this;

        vm.locationRelationship = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query();
        vm.locationrelationshiptypes = LocationRelationshipType.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationRelationship.id !== null) {
                LocationRelationship.update(vm.locationRelationship, onSaveSuccess, onSaveError);
            } else {
                LocationRelationship.save(vm.locationRelationship, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationRelationshipUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
