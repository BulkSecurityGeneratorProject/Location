(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationActivityDialogController', LocationActivityDialogController);

    LocationActivityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LocationActivity', 'Location', 'Activity'];

    function LocationActivityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LocationActivity, Location, Activity) {
        var vm = this;

        vm.locationActivity = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query();
        vm.activities = Activity.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.locationActivity.id !== null) {
                LocationActivity.update(vm.locationActivity, onSaveSuccess, onSaveError);
            } else {
                LocationActivity.save(vm.locationActivity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('location2App:locationActivityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
