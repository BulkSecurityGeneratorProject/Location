(function() {
    'use strict';

    angular
        .module('location2App')
        .controller('LocationActivityController', LocationActivityController);

    LocationActivityController.$inject = ['LocationActivity'];

    function LocationActivityController(LocationActivity) {

        var vm = this;

        vm.locationActivities = [];

        loadAll();

        function loadAll() {
            LocationActivity.query(function(result) {
                vm.locationActivities = result;
                vm.searchQuery = null;
            });
        }
    }
})();
