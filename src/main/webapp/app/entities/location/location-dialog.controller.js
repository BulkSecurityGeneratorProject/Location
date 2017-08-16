(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationDialogController', LocationDialogController);

    LocationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Location', 'LocationFacility', 'LocationActivity', 'LocationOcassion', 'LocationAttraction', 'LocationRelationship', 'Label', 'LocationType', 'Coordinate'];

    function LocationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Location, LocationFacility, LocationActivity, LocationOcassion, LocationAttraction, LocationRelationship, Label, LocationType, Coordinate) {
        var vm = this;

        vm.location = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locationfacilities = LocationFacility.query();
        vm.locationactivities = LocationActivity.query();
        vm.locationocassions = LocationOcassion.query();
        vm.locationattractions = LocationAttraction.query();
        vm.locationrelationships = LocationRelationship.query();
        vm.labels = Label.query();
        vm.locationtypes = LocationType.query();
        vm.coordinates = Coordinate.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.location.id !== null) {
                Location.update(vm.location, onSaveSuccess, onSaveError);
            } else {
                Location.save(vm.location, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
